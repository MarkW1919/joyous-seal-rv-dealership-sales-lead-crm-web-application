import FusionAuthClient, {
  RegistrationRequest,
} from "@fusionauth/typescript-client";
import { Static, Type } from "@sinclair/typebox";
import type { FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";

const SignupBody = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

type SignupBody = Static<typeof SignupBody>;

const SignupResponse = {
  204: Type.Object({}),
  "4xx": Type.Object({
    error: Type.String(),
  }),
};

const SignupResponseObject = Type.Object(SignupResponse);
type SignupResponse = Static<typeof SignupResponseObject>;

export default async function signup(server: FastifyInstance) {
  server.post<{
    Body: SignupBody;
    Reply: SignupResponse;
  }>(
    "/signup",
    {
      schema: {
        body: SignupBody,
        response: SignupResponse,
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

        const uuid = uuidv4();
        const registrationRequest: RegistrationRequest = {
          registration: {
            applicationId: process.env.FUSION_AUTH_APPLICATION_ID,
          },
          user: {
            email: request.body.email,
            password: request.body.password,
          },
        };

        await client.register(uuid, registrationRequest);

        return reply.code(204).send({});
      } catch (e) {
        console.error(e);
        return reply.code(400).send({
          error: "Unable to initiate signup process. Please try again later.",
        });
      }
    }
  );
}
