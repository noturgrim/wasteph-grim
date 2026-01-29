-- Add is_information_complete column to inquiry table
-- This tracks whether an inquiry (especially from lead pool) has complete information
-- before allowing proposal creation

ALTER TABLE inquiry 
ADD COLUMN IF NOT EXISTS is_information_complete BOOLEAN NOT NULL DEFAULT true;

-- Set existing inquiries as complete (backwards compatibility)
-- Only new inquiries from claimed leads will be marked as incomplete
UPDATE inquiry 
SET is_information_complete = true 
WHERE is_information_complete IS NULL;

-- Add comment
COMMENT ON COLUMN inquiry.is_information_complete IS 'Indicates if all required information has been gathered (site visit/contact completed)';
