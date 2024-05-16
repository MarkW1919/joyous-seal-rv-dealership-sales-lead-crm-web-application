CREATE TABLE new_users (id INTEGER PRIMARY KEY AUTOINCREMENT, sub TEXT UNIQUE, email TEXT, password TEXT);
INSERT INTO new_users (id, sub) SELECT id, sub FROM users_backup;
DROP TABLE users;
ALTER TABLE new_users RENAME TO users;