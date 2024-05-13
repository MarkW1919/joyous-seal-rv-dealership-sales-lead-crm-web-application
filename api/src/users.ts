import crypto from "crypto";
import { FastifyRequest } from "fastify";
import { JwtPayload } from "jsonwebtoken";
import { getDbClient } from "./db";

export async function createUser(jwtPayload: JwtPayload) {
  const db = await getDbClient();
  const apiKey = crypto.randomBytes(16).toString("hex");
  await db.execute({
    sql: "INSERT INTO users (sub, api_key) VALUES (?, ?)",
    args: [jwtPayload.sub, apiKey],
  });
}

export async function getUserIdFromRequest(
  request: FastifyRequest
): Promise<string | null> {
  const db = await getDbClient();
  const result = await db.execute({
    sql: "SELECT id FROM users WHERE sub = ?",
    args: [request.currentUserJwtClaims.sub],
  });
  if (result.rows.length === 0) {
    return null;
  } else {
    return result.rows[0]["id"];
  }
}
