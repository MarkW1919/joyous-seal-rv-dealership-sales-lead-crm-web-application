let db: any;

// TODO: add db to fastify instance (llm seems to expect this)

export async function getDbClient() {
  if (!db) {
    const { createClient } = await import("@libsql/client");
    const config = {
      url: `${process.env.DATABASE_URL!}?authToken=${
        process.env.DATABASE_AUTH_TOKEN
      }`,
    };
    db = createClient(config);
  }

  return db;
}
