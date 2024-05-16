import { FastifyInstance } from "fastify";
import { getDbClient } from "../db";

export default async function addApiIntegration(server: FastifyInstance) {
  server.post(
    "/api/integrations",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            openapi_url: { type: "string", format: "uri" },
          },
          required: ["name", "openapi_url"],
        },
      },
    },
    async (request, reply) => {
      const { name, openapi_url } = request.body as any;
      const db = await getDbClient();

      try {
        await db.execute("INSERT INTO api_integrations (name, openapi_url) VALUES (?, ?)", [
          name,
          openapi_url,
        ]);
        return reply.status(201).send({ message: "API integration added successfully." });
      } catch (err) {
        return reply.status(500).send({ error: err.message });
      }
    }
  );
}
