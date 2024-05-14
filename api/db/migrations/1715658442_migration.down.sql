ALTER TABLE leads RENAME TO temp_leads;
CREATE TABLE leads (id INTEGER PRIMARY KEY AUTOINCREMENT, ContactName TEXT NOT NULL, Email TEXT NOT NULL, PhoneNumber TEXT NOT NULL, InventoryID INTEGER NOT NULL, LeadSource TEXT NOT NULL, InterestLevel INTEGER NOT NULL, PreviousVisits BOOLEAN NOT NULL, FOREIGN KEY(InventoryID) REFERENCES inventory(id));
INSERT INTO leads (id, ContactName, Email, PhoneNumber, InventoryID, LeadSource, InterestLevel, PreviousVisits) SELECT id, ContactName, Email, PhoneNumber, CAST(InventoryID AS INTEGER), LeadSource, InterestLevel, PreviousVisits FROM temp_leads;
DROP TABLE temp_leads;