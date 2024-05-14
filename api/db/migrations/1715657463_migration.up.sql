ALTER TABLE leads RENAME TO _leads_old_;
CREATE TABLE leads (id INTEGER PRIMARY KEY AUTOINCREMENT, ContactName TEXT NOT NULL, Email TEXT NOT NULL, PhoneNumber TEXT NOT NULL, InventoryID TEXT NOT NULL, LeadSource TEXT NOT NULL, InterestLevel INTEGER NOT NULL, PreviousVisits BOOLEAN NOT NULL DEFAULT FALSE);
INSERT INTO leads (id, ContactName, Email, PhoneNumber, InventoryID, LeadSource, PreviousVisits) SELECT id, ContactName, Email, PhoneNumber, InventoryID, LeadSource, PreviousVisits FROM _leads_old_;
DROP TABLE _leads_old_;