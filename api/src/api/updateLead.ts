import type { FastifyInstance } from "fastify";
import { getDbClient } from "../db";

export default async function updateLead(server: FastifyInstance) {
  server.put(
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
        body: {
          type: "object",
          properties: {
            ContactName: { type: "string" },
            Email: { type: "string" },
            PhoneNumber: { type: "string" },
            InventoryID: { type: "string" },
            LeadSource: { type: "string" },
            InterestLevel: { type: "integer" },
            PreviousVisits: { type: "boolean" }
          },
          required: ["ContactName", "Email", "PhoneNumber", "InventoryID", "LeadSource", "InterestLevel"]
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
      const requestBody = request.body as any;
      const db = await getDbClient();
      try {
        const result = await db.execute({
          sql: "UPDATE leads SET ContactName = ?, Email = ?, PhoneNumber = ?, InventoryID = ?, LeadSource = ?, InterestLevel = ?, PreviousVisits = ? WHERE id = ?",
          args: [requestBody.ContactName, requestBody.Email, requestBody.PhoneNumber, requestBody.InventoryID, requestBody.LeadSource, requestBody.InterestLevel, requestBody.PreviousVisits, params.id]
        });
        if (result.rowsAffected === 0) {
          return reply.status(404).send({ error: "Lead not found" });
        }
        return reply.status(200).send({
          id: params.id,
          ContactName: requestBody.ContactName,
          Email: requestBody.Email,
          PhoneNumber: requestBody.PhoneNumber,
          InventoryID: requestBody.InventoryID,
          LeadSource: requestBody.LeadSource,
          InterestLevel: requestBody.InterestLevel,
          PreviousVisits: requestBody.PreviousVisits
        });
      } catch (err) {
        reply.status(500).send({ error: err.message });
      }
    }
  );
}