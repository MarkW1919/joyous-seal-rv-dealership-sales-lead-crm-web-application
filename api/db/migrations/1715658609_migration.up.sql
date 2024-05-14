CREATE TABLE new_inventory (
  id TEXT PRIMARY KEY NOT NULL CHECK(id GLOB '[0-9a-zA-Z]{6}'),
  STK TEXT NOT NULL,
  Manufacture TEXT NOT NULL,
  Make TEXT NOT NULL,
  Year INTEGER NOT NULL,
  Model TEXT NOT NULL,
  Type TEXT CHECK(Type IN ('Fifth Wheel', 'Travel Trailer')) NOT NULL,
  ListPrice FLOAT NOT NULL,
  SalePrice FLOAT NOT NULL,
  TOL INTEGER NOT NULL,
  VIN TEXT UNIQUE NOT NULL,
  New BOOLEAN NOT NULL DEFAULT TRUE,
  No BOOLEAN NOT NULL DEFAULT FALSE
);
INSERT INTO new_inventory (id, STK, Manufacture, Make, Year, Model, Type, ListPrice, SalePrice, TOL, VIN, New, No)
SELECT id, STK, Manufacture, Make, Year, Model, Type, ListPrice, SalePrice, TOL, VIN, New, No FROM inventory;
DROP TABLE inventory;
ALTER TABLE new_inventory RENAME TO inventory;