import { getDbClient } from './db';
import bcrypt from 'bcrypt';

async function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
}

async function createAdminUser() {
  const email = 'mark.williamson119@gmail.com';
  const password = '123456';
  const hashedPassword = await hashPassword(password);

  const db = await getDbClient();
  try {
    await db.execute(
      'INSERT INTO users (email, password, sub) VALUES (?, ?, ?)',
      [email, hashedPassword, email]
    );
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
}

createAdminUser();