/**
 * Fix Script: Clean up all orphaned records
 * 
 * This script removes orphaned records that reference non-existent inquiries:
 * - activity_log records
 * - inquiry_notes records
 * - calendar_event records
 * - proposal records
 * 
 * Run: node src/migrations/fixOrphanedActivityLogs.js
 */

import { db } from "../db/index.js";
import { sql } from "drizzle-orm";

const fixOrphanedRecords = async () => {
  console.log("=".repeat(60));
  console.log("Cleaning up orphaned records...");
  console.log("=".repeat(60));

  try {
    let totalCleaned = 0;

    // 1. Fix orphaned activity_log records
    console.log("\n1. Checking activity_log records...");
    const orphanedActivityLogs = await db.execute(sql`
      SELECT al.id, al.inquiry_id, al.entity_type, al.action
      FROM activity_log al
      WHERE al.inquiry_id IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM inquiry i WHERE i.id = al.inquiry_id
        );
    `);

    console.log(`   Found ${orphanedActivityLogs.length} orphaned activity_log records`);

    if (orphanedActivityLogs.length > 0) {
      orphanedActivityLogs.forEach((record, index) => {
        console.log(`   - ${index + 1}. Inquiry ID: ${record.inquiry_id}, Action: ${record.action}`);
      });

      await db.execute(sql`
        DELETE FROM activity_log
        WHERE inquiry_id IS NOT NULL
          AND NOT EXISTS (
            SELECT 1 FROM inquiry i WHERE i.id = activity_log.inquiry_id
          );
      `);

      console.log(`   ✓ Deleted ${orphanedActivityLogs.length} orphaned activity_log records`);
      totalCleaned += orphanedActivityLogs.length;
    } else {
      console.log("   ✓ No orphaned activity_log records found");
    }

    // 2. Fix orphaned inquiry_notes records
    console.log("\n2. Checking inquiry_notes records...");
    const orphanedNotes = await db.execute(sql`
      SELECT n.id, n.inquiry_id, n.content
      FROM inquiry_notes n
      WHERE NOT EXISTS (
        SELECT 1 FROM inquiry i WHERE i.id = n.inquiry_id
      );
    `);

    console.log(`   Found ${orphanedNotes.length} orphaned inquiry_notes records`);

    if (orphanedNotes.length > 0) {
      orphanedNotes.forEach((record, index) => {
        const preview = record.content.substring(0, 50);
        console.log(`   - ${index + 1}. Inquiry ID: ${record.inquiry_id}, Content: "${preview}..."`);
      });

      await db.execute(sql`
        DELETE FROM inquiry_notes
        WHERE NOT EXISTS (
          SELECT 1 FROM inquiry i WHERE i.id = inquiry_notes.inquiry_id
        );
      `);

      console.log(`   ✓ Deleted ${orphanedNotes.length} orphaned inquiry_notes records`);
      totalCleaned += orphanedNotes.length;
    } else {
      console.log("   ✓ No orphaned inquiry_notes records found");
    }

    // 3. Fix orphaned calendar_event records
    console.log("\n3. Checking calendar_event records...");
    const orphanedEvents = await db.execute(sql`
      SELECT ce.id, ce.inquiry_id, ce.title
      FROM calendar_event ce
      WHERE ce.inquiry_id IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM inquiry i WHERE i.id = ce.inquiry_id
        );
    `);

    console.log(`   Found ${orphanedEvents.length} orphaned calendar_event records`);

    if (orphanedEvents.length > 0) {
      orphanedEvents.forEach((record, index) => {
        console.log(`   - ${index + 1}. Inquiry ID: ${record.inquiry_id}, Title: "${record.title}"`);
      });

      // Set inquiry_id to NULL instead of deleting (events can exist without inquiry)
      await db.execute(sql`
        UPDATE calendar_event
        SET inquiry_id = NULL
        WHERE inquiry_id IS NOT NULL
          AND NOT EXISTS (
            SELECT 1 FROM inquiry i WHERE i.id = calendar_event.inquiry_id
          );
      `);

      console.log(`   ✓ Cleaned ${orphanedEvents.length} orphaned calendar_event records (set inquiry_id to NULL)`);
      totalCleaned += orphanedEvents.length;
    } else {
      console.log("   ✓ No orphaned calendar_event records found");
    }

    // 4. Fix orphaned contracts records (referencing deleted proposals)
    console.log("\n4. Checking contracts records...");
    const orphanedContracts = await db.execute(sql`
      SELECT c.id, c.proposal_id
      FROM contracts c
      WHERE NOT EXISTS (
        SELECT 1 FROM proposal p WHERE p.id = c.proposal_id
      );
    `);

    console.log(`   Found ${orphanedContracts.length} orphaned contracts records`);

    if (orphanedContracts.length > 0) {
      orphanedContracts.forEach((record, index) => {
        console.log(`   - ${index + 1}. Contract ID: ${record.id}, Proposal ID: ${record.proposal_id}`);
      });

      await db.execute(sql`
        DELETE FROM contracts
        WHERE NOT EXISTS (
          SELECT 1 FROM proposal p WHERE p.id = contracts.proposal_id
        );
      `);

      console.log(`   ✓ Deleted ${orphanedContracts.length} orphaned contracts records`);
      totalCleaned += orphanedContracts.length;
    } else {
      console.log("   ✓ No orphaned contracts records found");
    }

    // 5. Check for orphaned proposal records (referencing deleted inquiries)
    console.log("\n5. Checking proposal records...");
    const orphanedProposals = await db.execute(sql`
      SELECT p.id, p.inquiry_id
      FROM proposal p
      WHERE NOT EXISTS (
        SELECT 1 FROM inquiry i WHERE i.id = p.inquiry_id
      );
    `);

    console.log(`   Found ${orphanedProposals.length} orphaned proposal records`);

    if (orphanedProposals.length > 0) {
      orphanedProposals.forEach((record, index) => {
        console.log(`   - ${index + 1}. Proposal ID: ${record.id}, Inquiry ID: ${record.inquiry_id}`);
      });

      // Delete orphaned proposals (and cascade will delete related contracts)
      await db.execute(sql`
        DELETE FROM proposal
        WHERE NOT EXISTS (
          SELECT 1 FROM inquiry i WHERE i.id = proposal.inquiry_id
        );
      `);

      console.log(`   ✓ Deleted ${orphanedProposals.length} orphaned proposal records`);
      totalCleaned += orphanedProposals.length;
    } else {
      console.log("   ✓ No orphaned proposal records found");
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("Cleanup Summary:");
    console.log("=".repeat(60));
    console.log(`Total records cleaned: ${totalCleaned}`);
    console.log("=".repeat(60));
    console.log("\n✓ Cleanup completed successfully!");
    console.log("\nYou can now run: npm run db:push");

    process.exit(0);
  } catch (error) {
    console.error("\n✗ Cleanup failed:");
    console.error(error);
    process.exit(1);
  }
};

// Run the fix
fixOrphanedRecords();
