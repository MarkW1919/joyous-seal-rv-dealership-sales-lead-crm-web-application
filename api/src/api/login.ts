import FusionAuthClient from "@fusionauth/typescript-client";
import { Static, Type } from "@sinclair/typebox";
import type { FastifyInstance } from "fastify";

const LoginBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

type LoginBodyType = Static<typeof LoginBodySchema>;

const LoginResponseSchema = {
  200: Type.Object({
    accessToken: Type.String(),
  }),
  "4xx": Type.Object({
    error: Type.String(),
  }),
};

const LoginResponseObject = Type.Object(LoginResponseSchema);
type LoginResponseType = Static<typeof LoginResponseObject>;

export default async function login(server: FastifyInstance) {
  server.post<{
    Body: LoginBodyType;
    Reply: LoginResponseType;
  }>(
    "/login",
    {
      schema: {
        body: LoginBodySchema,
        response: LoginResponseSchema,
      },
    },
    async (request, reply) => {
      try {
        if (
          !process.env.FUSION_AUTH_URL ||
          !process.env.FUSION_AUTH_TENANT_API_KEY ||
          !process.env.FUSION_AUTH_APPLICATION_ID
        ) {
          throw new Error("Missing authentication configuration.");
        }

        const client = new FusionAuthClient(
          process.env.FUSION_AUTH_TENANT_API_KEY,
          process.env.FUSION_AUTH_URL
        );

        const response = await client.login({
          loginId: request.body.email,
          password: request.body.password,
          applicationId: process.env.FUSION_AUTH_APPLICATION_ID,
        });

        if (!response.response.token) {
          throw new Error("Unable to login");
        }

        return reply.code(200).send({
          accessToken: response.response.token,
        });
      } catch (e) {
        console.error(e);
        return reply.code(400).send({
          error: "Unable to login",
        });
      }
    }
  );
}
