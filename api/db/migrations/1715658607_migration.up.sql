CREATE TABLE new_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ContactName TEXT NOT NULL,
  Email TEXT NOT NULL,
  PhoneNumber TEXT NOT NULL,
  InventoryID TEXT NOT NULL CHECK(InventoryID GLOB '[0-9a-zA-Z]{6}') REFERENCES inventory(id),
  LeadSource TEXT NOT NULL,
  InterestLevel INTEGER NOT NULL,
  PreviousVisits BOOLEAN NOT NULL
);
INSERT INTO new_leads (id, ContactName, Email, PhoneNumber, InventoryID, LeadSource, InterestLevel, PreviousVisits)
SELECT id, ContactName, Email, PhoneNumber, InventoryID, LeadSource, InterestLevel, PreviousVisits FROM leads;
DROP TABLE leads;
ALTER TABLE new_leads RENAME TO leads;