import { FastifyInstance } from "fastify";
import { getDbClient } from "../db";

export default async function listApiIntegrations(server: FastifyInstance) {
  server.get("/api/integrations", async (_request, reply) => {
    const db = await getDbClient();

    try {
      const result = await db.execute("SELECT * FROM api_integrations");
      return reply.status(200).send(result.rows);
    } catch (err) {
      return reply.status(500).send({ error: err.message });
    }
  });
}
