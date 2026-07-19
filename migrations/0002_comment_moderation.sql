-- New comments default to unapproved and only appear publicly once
-- approved from /write, see app/entries/db.ts getComments/getPendingComments.
ALTER TABLE comments ADD COLUMN approved INTEGER NOT NULL DEFAULT 0;
