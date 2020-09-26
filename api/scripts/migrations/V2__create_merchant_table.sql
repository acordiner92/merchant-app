CREATE TYPE ACTIVITY_STATUS
AS ENUM ('ACTIVE', 'INACTIVE');

CREATE TABLE MERCHANT(
   id UUID PRIMARY KEY,
   status ACTIVITY_STATUS NOT NULL,
   currency TEXT NOT NULL,
   website_url TEXT NOT NULL,
   country TEXT NOT NULL,
   discount_percentage FLOAT NOT NULL, 
   created_at TIMESTAMP NOT NULL DEFAULT timezone('utc', NOW()),
   updated_at TIMESTAMP NOT NULL DEFAULT timezone('utc', NOW())
);

CREATE TRIGGER set_insert_timestamp
BEFORE INSERT ON MERCHANT
FOR EACH ROW
EXECUTE PROCEDURE trigger_insert_timestamp();

CREATE TRIGGER set_update_timestamp
BEFORE UPDATE ON MERCHANT
FOR EACH ROW
EXECUTE PROCEDURE trigger_update_timestamp();