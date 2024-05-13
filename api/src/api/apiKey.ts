import type { FastifyInstance } from "fastify";
import { type Static, Type } from "@sinclair/typebox";
import { getDbClient } from "../db";

const ApiKeyResponseSchema = {
  200: Type.Object({
    apiKey: Type.String(),
  }),
  "4xx": Type.Object({
    error: Type.String(),
  }),
};

const ApiKeyResponse = Type.Object(ApiKeyResponseSchema);
type ApiKeyResponse = Static<typeof ApiKeyResponse>;

export default async function apiKey(server: FastifyInstance) {
  server.get<{
    Reply: ApiKeyResponse;
  }>(
    "/api-key",
    {
      schema: {
        response: ApiKeyResponseSchema,
      },
    },
    async (request, reply) => {
      const db = await getDbClient();
      const apiKey = await db.execute({
        sql: "SELECT api_key FROM users WHERE sub = ?",
        args: [request.currentUserJwtClaims.sub],
      });
      if (apiKey.rows.length === 0) {
        return reply.code(404).send({
          error: "API key not found",
        });
      } else {
        return reply.code(200).send({
          apiKey: apiKey.rows[0].api_key,
        });
      }
    }
  );
}
