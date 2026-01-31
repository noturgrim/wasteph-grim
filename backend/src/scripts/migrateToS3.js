import postgres from "postgres";
import { readdirSync, readFileSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = postgres(process.env.DATABASE_URL);

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.S3_BUCKET_NAME;

/**
 * Upload a single file to S3
 */
async function uploadToS3(key, buffer, contentType) {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );
}

/**
 * Derive a YYYY-MM-DD date string from a file's mtime
 */
function dateFolderFromMtime(filePath) {
  const stats = statSync(filePath);
  return stats.mtime.toISOString().split("T")[0];
}

/**
 * Guess MIME type from file extension
 */
function mimeFromExt(filename) {
  if (filename.endsWith(".pdf")) return "application/pdf";
  if (filename.endsWith(".docx"))
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (filename.endsWith(".doc")) return "application/msword";
  return "application/octet-stream";
}

// ---------------------------------------------------------------------------
// Pass 1: Proposals  (./storage/proposals/ → proposals/{date}/{filename})
// DB: proposal.pdf_url  ./storage/proposals/X.pdf  →  proposals/{date}/X.pdf
// ---------------------------------------------------------------------------
async function migrateProposals() {
  const dir = join(__dirname, "../../storage/proposals");
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".pdf"));
  } catch {
    console.log("⚠️  storage/proposals/ not found — skipping proposal migration");
    return;
  }

  console.log(`\n📂 Migrating ${files.length} proposal PDF(s)...`);

  // Build a map: filename → S3 key (using mtime for date folder)
  const fileMap = new Map();
  for (const filename of files) {
    const fullPath = join(dir, filename);
    const dateFolder = dateFolderFromMtime(fullPath);
    const key = `proposals/${dateFolder}/${filename}`;
    const buffer = readFileSync(fullPath);

    await uploadToS3(key, buffer, "application/pdf");
    fileMap.set(filename, key);
    console.log(`  ✅ Uploaded: ${key}`);
  }

  // Update DB: pdf_url column stores raw local paths like ./storage/proposals/{id}.pdf
  // We need to find each row and map it to the new key
  const rows = await sql`
    SELECT id, pdf_url FROM proposal WHERE pdf_url IS NOT NULL
  `;

  let updated = 0;
  for (const row of rows) {
    // Extract filename from the stored path (last segment)
    const filename = row.pdf_url.split("/").pop();
    const newKey = fileMap.get(filename);
    if (newKey) {
      await sql`UPDATE proposal SET pdf_url = ${newKey} WHERE id = ${row.id}`;
      updated++;
      console.log(`  📝 Updated proposal ${row.id}: ${row.pdf_url} → ${newKey}`);
    } else {
      console.log(`  ⚠️  No uploaded file found for proposal ${row.id} (path: ${row.pdf_url})`);
    }
  }
  console.log(`  💾 Updated ${updated} proposal row(s)`);
}

// ---------------------------------------------------------------------------
// Pass 2: Contract PDFs  (./uploads/contracts/ → contracts/{date}/{filename})
// DB: contracts.contract_pdf_url  /uploads/contracts/X.pdf  →  contracts/{date}/X.pdf
// ---------------------------------------------------------------------------
async function migrateContractPdfs() {
  const dir = join(__dirname, "../../uploads/contracts");
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".pdf"));
  } catch {
    console.log("⚠️  uploads/contracts/ not found — skipping contract PDF migration");
    return;
  }

  console.log(`\n📂 Migrating ${files.length} contract PDF(s)...`);

  const fileMap = new Map();
  for (const filename of files) {
    const fullPath = join(dir, filename);
    const dateFolder = dateFolderFromMtime(fullPath);
    const key = `contracts/${dateFolder}/${filename}`;
    const buffer = readFileSync(fullPath);

    await uploadToS3(key, buffer, "application/pdf");
    fileMap.set(filename, key);
    console.log(`  ✅ Uploaded: ${key}`);
  }

  // DB stores paths like /uploads/contracts/{filename}
  const rows = await sql`
    SELECT id, contract_pdf_url FROM contracts WHERE contract_pdf_url IS NOT NULL
  `;

  let updated = 0;
  for (const row of rows) {
    const filename = row.contract_pdf_url.split("/").pop();
    const newKey = fileMap.get(filename);
    if (newKey) {
      await sql`UPDATE contracts SET contract_pdf_url = ${newKey} WHERE id = ${row.id}`;
      updated++;
      console.log(`  📝 Updated contract ${row.id}: ${row.contract_pdf_url} → ${newKey}`);
    } else {
      console.log(`  ⚠️  No uploaded file found for contract ${row.id} (path: ${row.contract_pdf_url})`);
    }
  }
  console.log(`  💾 Updated ${updated} contract PDF row(s)`);
}

// ---------------------------------------------------------------------------
// Pass 3: Custom Templates  (./uploads/contract-templates/ → contract-templates/{date}/{filename})
// DB: contracts.custom_template_url  /uploads/contract-templates/X.ext  →  contract-templates/{date}/X.ext
// ---------------------------------------------------------------------------
async function migrateCustomTemplates() {
  const dir = join(__dirname, "../../uploads/contract-templates");
  let files;
  try {
    files = readdirSync(dir).filter(
      (f) => f.endsWith(".pdf") || f.endsWith(".docx") || f.endsWith(".doc")
    );
  } catch {
    console.log("⚠️  uploads/contract-templates/ not found — skipping custom template migration");
    return;
  }

  console.log(`\n📂 Migrating ${files.length} custom template(s)...`);

  const fileMap = new Map();
  for (const filename of files) {
    const fullPath = join(dir, filename);
    const dateFolder = dateFolderFromMtime(fullPath);
    const key = `contract-templates/${dateFolder}/${filename}`;
    const buffer = readFileSync(fullPath);
    const contentType = mimeFromExt(filename);

    await uploadToS3(key, buffer, contentType);
    fileMap.set(filename, key);
    console.log(`  ✅ Uploaded: ${key}`);
  }

  // DB stores paths like /uploads/contract-templates/{filename}
  const rows = await sql`
    SELECT id, custom_template_url FROM contracts WHERE custom_template_url IS NOT NULL
  `;

  let updated = 0;
  for (const row of rows) {
    const filename = row.custom_template_url.split("/").pop();
    const newKey = fileMap.get(filename);
    if (newKey) {
      await sql`UPDATE contracts SET custom_template_url = ${newKey} WHERE id = ${row.id}`;
      updated++;
      console.log(`  📝 Updated contract ${row.id}: ${row.custom_template_url} → ${newKey}`);
    } else {
      console.log(`  ⚠️  No uploaded file found for contract ${row.id} (path: ${row.custom_template_url})`);
    }
  }
  console.log(`  💾 Updated ${updated} custom template row(s)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("🚀 Starting S3 migration...");
  console.log(`   Bucket: ${BUCKET}`);
  console.log(`   Region: ${process.env.AWS_REGION}\n`);

  try {
    await migrateProposals();
    await migrateContractPdfs();
    await migrateCustomTemplates();

    console.log("\n✅ S3 migration complete.");
    console.log("   All files uploaded and DB paths updated.");
    console.log("   Verify downloads before deleting local storage/ and uploads/ directories.");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    throw error;
  } finally {
    await sql.end();
  }
}

main();
