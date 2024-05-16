import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getDbClient } from '../db';
// Dummy hashPassword Implementation
async function hashPassword(password: string): Promise<string> {
  // Dummy implementation (replace with actual hashing logic)
  return password + "_hashed"; 
}

interface SignUpBody {
  email: string;
  password: string;
}

export default async function signup(server: FastifyInstance) {
  server.post<{ Body: SignUpBody }>(
    '/signup',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' }
          },
          required: ['email', 'password']
        },
        response: {
          201: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          },
          500: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const db = await getDbClient();

      try {
        const hashedPassword = await hashPassword(password);

        await db.execute(
          'INSERT INTO users (email, password, sub) VALUES (?, ?, ?)',
          [email, hashedPassword, email]
        );

        return reply.status(201).send({ message: 'User created successfully' });
      } catch (err) {
        request.log.error(err);
        if (err.code === 'SQLITE_CONSTRAINT') {
          return reply.status(400).send({ message: 'User already exists' });
        }
        return reply.status(500).send({ error: err.message });
      }
    }
  );
}
