CREATE TABLE api_integrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, openapi_url TEXT NOT NULL, added_at DATETIME DEFAULT CURRENT_TIMESTAMP);