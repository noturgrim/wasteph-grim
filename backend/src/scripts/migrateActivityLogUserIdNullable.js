import { db } from "../db/index.js";
import { sql } from "drizzle-orm";

/**
 * Migration: Make userId in activity_log nullable
 * This allows logging of public/system actions that don't have an associated user
 */
async function migrateActivityLogUserId() {
  console.log("Starting migration: Make activity_log.user_id nullable...");

  try {
    // Make user_id nullable
    await db.execute(sql`
      ALTER TABLE activity_log
      ALTER COLUMN user_id DROP NOT NULL;
    `);

    console.log("✓ Successfully made activity_log.user_id nullable");
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run migration
migrateActivityLogUserId()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });
