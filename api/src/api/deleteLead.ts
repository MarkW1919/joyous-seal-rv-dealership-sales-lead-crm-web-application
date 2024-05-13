import type { FastifyInstance } from "fastify";
import { getDbClient } from "../db";

export default async function deleteLead(server: FastifyInstance) {
  server.delete(
    "/leads/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" }
          },
          required: ["id"]
        },
        response: {
          204: { type: "null" },
          404: {
            type: "object",
            properties: {
              error: { type: "string" }
            }
          },
          500: {
            type: "object",
            properties: {
              error: { type: "string" }
            }
          }
        }
      }
    },
    async (request, reply) => {
      const params = request.params as any;
      const db = await getDbClient();
      try {
        const result = await db.execute({
          sql: "DELETE FROM leads WHERE id = ?",
          args: [params.id]
        });
        if (result.rowsAffected === 0) {
          return reply.status(404).send({ error: "Lead not found" });
        }
        return reply.status(204).send();
      } catch (err) {
        reply.status(500).send({ error: err.message });
      }
    }
  );
}