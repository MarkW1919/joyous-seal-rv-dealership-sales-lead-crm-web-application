CREATE TABLE old_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ContactName TEXT NOT NULL,
  Email TEXT NOT NULL,
  PhoneNumber TEXT NOT NULL,
  InventoryID INTEGER NOT NULL REFERENCES inventory(id),
  LeadSource TEXT NOT NULL,
  InterestLevel INTEGER NOT NULL,
  PreviousVisits BOOLEAN NOT NULL
);
INSERT INTO old_leads (id, ContactName, Email, PhoneNumber, InventoryID, LeadSource, InterestLevel, PreviousVisits)
SELECT id, ContactName, Email, PhoneNumber, InventoryID, LeadSource, InterestLevel, PreviousVisits FROM leads;
DROP TABLE leads;
ALTER TABLE old_leads RENAME TO leads;