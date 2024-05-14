import type { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { getDbClient } from "../db";
// Ensure you have JWT_SECRET in your environment variables. This is for demonstration.
// In production, the secret should be securely managed.
const secret = process.env.JWT_SECRET || 'your-very-secure-secret';

export default async function resetPassword(server: FastifyInstance) {
  server.post('/api/reset-password', {}, async (request, reply) => {
    const { email } = request.body as { email: string; };

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return reply.status(400).send({ error: 'Invalid email format' });
    }

    const db = await getDbClient();
    // Check if the email exists in the database
    const user = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    if (user.rows.length === 0) {
      return reply.status(404).send({ error: 'Email not found' });
    }

    // Generate a password reset token
    const token = sign({ userId: user.rows[0].id }, secret, { expiresIn: '1h' });

    // Ideally, send the token to the user's email. For now, we'll just return it.
    // This token should be used in a frontend form where the user can enter a new password
    return reply.send({ token });
  });
}