-- Migration: Add contract details fields to contracts table
-- Run this after updating the schema.js file
-- Execute: psql -U your_user -d your_database -f backend/src/migrations/add_contract_details.sql

-- Add contract type enum
DO $$ BEGIN
  CREATE TYPE contract_type AS ENUM (
    'long_term_variable',
    'long_term_fixed',
    'fixed_rate_term',
    'garbage_bins',
    'garbage_bins_disposal'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add collection schedule enum
DO $$ BEGIN
  CREATE TYPE collection_schedule AS ENUM (
    'daily',
    'weekly',
    'monthly',
    'bi_weekly',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add new columns to contracts table
ALTER TABLE contracts 
ADD COLUMN IF NOT EXISTS contract_type contract_type,
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS client_email_contract TEXT,
ADD COLUMN IF NOT EXISTS contract_duration TEXT,
ADD COLUMN IF NOT EXISTS service_address TEXT,
ADD COLUMN IF NOT EXISTS actual_address TEXT,
ADD COLUMN IF NOT EXISTS collection_schedule collection_schedule,
ADD COLUMN IF NOT EXISTS collection_schedule_other TEXT,
ADD COLUMN IF NOT EXISTS waste_allowance TEXT,
ADD COLUMN IF NOT EXISTS special_clauses TEXT,
ADD COLUMN IF NOT EXISTS signatories TEXT,
ADD COLUMN IF NOT EXISTS rate_per_kg TEXT,
ADD COLUMN IF NOT EXISTS client_requests TEXT;

-- Rename client_email to client_email_sent for clarity
ALTER TABLE contracts 
RENAME COLUMN IF EXISTS client_email TO client_email_sent;

-- Add comment for documentation
COMMENT ON COLUMN contracts.contract_type IS 'Type of contract: long_term_variable, long_term_fixed, fixed_rate_term, garbage_bins, garbage_bins_disposal';
COMMENT ON COLUMN contracts.client_name IS 'Full corporate name of the client';
COMMENT ON COLUMN contracts.client_email_contract IS 'Client email address for the contract';
COMMENT ON COLUMN contracts.contract_duration IS 'Effectivity and duration of the contract';
COMMENT ON COLUMN contracts.service_address IS 'Primary service address';
COMMENT ON COLUMN contracts.actual_address IS 'Actual address if Google Maps does not detect location';
COMMENT ON COLUMN contracts.collection_schedule IS 'Schedule of garbage collection: daily, weekly, monthly, bi_weekly, other';
COMMENT ON COLUMN contracts.collection_schedule_other IS 'Custom collection schedule if "other" is selected';
COMMENT ON COLUMN contracts.waste_allowance IS 'Allocated amount for fixed clients';
COMMENT ON COLUMN contracts.special_clauses IS 'Special clauses or client requests';
COMMENT ON COLUMN contracts.signatories IS 'JSON array of signatories with their positions';
COMMENT ON COLUMN contracts.rate_per_kg IS 'Rate per kg with waste type and VAT specification';
COMMENT ON COLUMN contracts.client_requests IS 'Client requests for modifications';
COMMENT ON COLUMN contracts.client_email_sent IS 'Email address used to send contract to client';

-- Create index on contract_type for faster filtering
CREATE INDEX IF NOT EXISTS contracts_contract_type_idx ON contracts(contract_type);
