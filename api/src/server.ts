import cors from "@fastify/cors";
import fastifySwagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import app from "./app";
import { loadRoutes } from "./routes";

const port = parseInt(process.env.PORT || "10000");
const host = "::";

const apiUrl = process.env.API_URL!;

const swaggerOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: "Interactive API",
      version: "0.1.0",
    },
    servers: [
      {
        url: apiUrl,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
};
const swaggerUiOptions = {
  routePrefix: "/api/docs",
  exposeRoute: true,
};

async function setupAndRun() {
  app.register(fastifySwagger, swaggerOptions);
  app.register(fastifySwaggerUi, swaggerUiOptions);

  app.register(cors, {
    origin: [
      // TODO: Uncomment when we know GPTEngineer's calling domain
      // "http://localhost:3000",
      // "https://app.backengine.dev",
      // "https://staging.backengine.dev",
      // /\.vercel\.app$/,
      "*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  const routes = await loadRoutes();
  for (const route of routes) {
    app.register(route, { prefix: "/api" });
  }

  app.listen({ host: host, port: port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

setupAndRun();
