import { FastifyInstance } from "fastify";
import { getDbClient } from "../db";

export default async function removeApiIntegration(server: FastifyInstance) {
  server.delete(
    "/api/integrations/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as any;
      const db = await getDbClient();

      try {
        await db.execute("DELETE FROM api_integrations WHERE id = ?", [id]);
        return reply.status(204).send();
      } catch (err) {
        return reply.status(500).send({ error: err.message });
      }
    }
  );
}
