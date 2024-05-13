import axios from "axios";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import JsonWebToken, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { logger } from "./app";
import { getDbClient } from "./db";
import { PUBLIC_ENDPOINTS } from "./publicEndpointsConfig";
import { createUser } from "./users";

let cachedJwksClient: jwksClient.JwksClient;

declare module "fastify" {
  interface FastifyRequest {
    currentUserJwtClaims: JwtPayload;
  }
}

const authenticate: FastifyPluginAsync = async (server, opts) => {
  server.decorateRequest("currentUserJwtClaims", null);
  server.addHook("preHandler", async (req, reply) => {
    // Skip authentication for some public endpoints
    const allowedUrls = [
      "/api/healthcheck",
      "/api/login",
      "/api/signup",
      "/api/docs",
    ];
    const docsRegex = /^\/api\/docs\/.*/;

    const allAllowedUrls = allowedUrls.concat(PUBLIC_ENDPOINTS);

    if (
      allAllowedUrls.includes(req.raw.url as string) ||
      docsRegex.test(req.raw.url as string)
    ) {
      return;
    }

    if (!req.headers.authorization) {
      return reply.code(401).send({
        error: "Missing authorization header",
      });
    }

    // return early if there is no token
    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) {
      return reply.code(401).send({
        error: "Missing bearer token",
      });
    }

    const db = await getDbClient();

    // check if the token is an API key - this will only exist after first login
    const userForApiKey = await db.execute({
      sql: "SELECT * FROM users WHERE api_key = ?",
      args: [accessToken],
    });
    if (userForApiKey.rows.length !== 0) {
      req.currentUserJwtClaims = {
        sub: userForApiKey.rows[0].sub,
      } as JwtPayload;

      return;
    }

    if (!cachedJwksClient) {
      if (!process.env.OPENID_CONFIG_URL) {
        return reply.code(500).send({
          error: "Missing OPENID_CONFIG_URL",
        });
      }

      let openidConfigResponse;
      try {
        openidConfigResponse = await axios.get(process.env.OPENID_CONFIG_URL);
      } catch (err) {
        logger.error(err);
        return reply.code(500).send({
          error: "Unable to fetch openid config",
        });
      }

      const jwksUri = openidConfigResponse.data.jwks_uri;

      if (!jwksUri) {
        return reply.code(500).send({
          error: "Missing jwks_uri in openid config",
        });
      }

      cachedJwksClient = jwksClient({
        jwksUri: jwksUri,
      });
    }

    const kid = JsonWebToken.decode(accessToken, { complete: true })?.header
      ?.kid;

    if (!kid) {
      return reply.code(401).send({
        error: "Invalid token",
      });
    }

    const key = await cachedJwksClient.getSigningKey(kid);
    const signingKey = key.getPublicKey();

    // TODO: authorization
    let sub: string;
    try {
      const payload = JsonWebToken.verify(accessToken, signingKey, {
        algorithms: ["RS256"],
      });

      // check if payload is a string and error out
      if (typeof payload === "string") {
        return reply.code(401).send({
          error: "Invalid token",
        });
      }

      req.currentUserJwtClaims = payload;
      sub = payload.sub as string;
    } catch (err) {
      return reply.code(401).send({
        error: "Invalid token",
      });
    }

    const user = await db.execute({
      sql: "SELECT * FROM users WHERE sub = ?",
      args: [sub],
    });

    if (user.rows.length === 0) {
      await createUser(req.currentUserJwtClaims);
    }
  });
};

export default fp(authenticate);
