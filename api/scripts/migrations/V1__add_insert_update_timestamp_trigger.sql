-- Insert trigger
CREATE OR REPLACE FUNCTION trigger_insert_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = timezone('utc', NOW());
  NEW.updated_at = timezone('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update trigger
CREATE OR REPLACE FUNCTION trigger_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;