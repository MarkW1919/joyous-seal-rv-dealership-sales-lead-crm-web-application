import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default async function healthcheck(server: FastifyInstance) {
  server.get('/api/healthcheck', async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ status: 'ok' });
  });
}