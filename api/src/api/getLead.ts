import type { FastifyInstance } from "fastify";
import { getDbClient } from "../db";

export default async function getLead(server: FastifyInstance) {
  server.get(
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
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              ContactName: { type: "string" },
              Email: { type: "string" },
              PhoneNumber: { type: "string" },
              InventoryID: { type: "string" },
              LeadSource: { type: "string" },
              InterestLevel: { type: "integer" },
              PreviousVisits: { type: "boolean" }
            }
          },
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
          sql: "SELECT * FROM leads WHERE id = ?",
          args: [params.id]
        });
        if (result.rows.length === 0) {
          return reply.status(404).send({ error: "Lead not found" });
        }
        return reply.status(200).send(result.rows[0]);
      } catch (err) {
        reply.status(500).send({ error: err.message });
      }
    }
  );
}