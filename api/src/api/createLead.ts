import type { FastifyInstance } from "fastify";
import { getDbClient } from "../db";

export default async function createLead(server: FastifyInstance) {
  server.post(
    "/leads",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            ContactName: { type: "string" },
            Email: { type: "string" },
            PhoneNumber: { type: "string" },
            InventoryID: { type: "string" },
            LeadSource: { type: "string" },
            InterestLevel: { type: "integer" },
            PreviousVisits: { type: "boolean", default: false }
          },
          required: ["ContactName", "Email", "PhoneNumber", "InventoryID", "LeadSource", "InterestLevel"]
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" }
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
      const db = await getDbClient();
      const requestBody = request.body as any;
      try {
        const result = await db.execute({
          sql: "INSERT INTO leads (ContactName, Email, PhoneNumber, InventoryID, LeadSource, InterestLevel, PreviousVisits) VALUES (?, ?, ?, ?, ?, ?, ?);",
          args: [requestBody.ContactName, requestBody.Email, requestBody.PhoneNumber, requestBody.InventoryID, requestBody.LeadSource, requestBody.InterestLevel, requestBody.PreviousVisits]
        });
        return reply.status(201).send({ id: result.lastRowId });
      } catch (err) {
        reply.status(500).send({ error: err.message });
      }
    }
  );
}