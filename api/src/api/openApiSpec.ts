import type { FastifyInstance } from "fastify";

export default async function openApiSpec(server: FastifyInstance) {
  server.get("/api/openapi.json", {}, async (_request, reply) => {
    const openApiDocument = {
      openapi: "3.0.3",
      info: {
        title: "Interactive API",
        version: "0.1.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
        schemas: {},
      },
      paths: {
        "/api/api-key": {
          get: {
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        apiKey: {
                          type: "string",
                        },
                      },
                      required: ["apiKey"],
                    },
                  },
                },
              },
              "4XX": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        error: {
                          type: "string",
                        },
                      },
                      required: ["error"],
                    },
                  },
                },
              },
            },
          },
        },
        "/api/healthcheck": {
          get: {
            responses: {
              "200": {
                description: "Default Response",
              },
            },
          },
        },
        "/api/leads": {
          post: {
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      ContactName: {
                        type: "string",
                      },
                      Email: {
                        type: "string",
                      },
                      PhoneNumber: {
                        type: "string",
                      },
                      InventoryID: {
                        type: "string",
                      },
                      LeadSource: {
                        type: "string",
                      },
                      InterestLevel: {
                        type: "integer",
                      },
                      PreviousVisits: {
                        type: "boolean",
                        default: false,
                      },
                    },
                    required: ["ContactName", "Email", "PhoneNumber", "InventoryID", "LeadSource", "InterestLevel"],
                  },
                },
              },
            },
            responses: {
              "201": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        id: {
                          type: "number",
                        },
                      },
                    },
                  },
                },
              },
              "500": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        error: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/api/admin/users": {
          get: {
            // Define the response schema for this endpoint
            responses: {
              "200": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          email: { type: "string" },
                          role: { type: "string" },
                          // Add more user fields as needed
                        },
                      },
                    },
                  },
                },
              },
              "500": {
                description: "Default Response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        error: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        // Add other API paths and methods accordingly...
      },
      servers: [
        {
          url: "https://backengine-d4x1.fly.dev",
        },
      ],
      security: [
        {
          bearerAuth: [],
        },
      ],
    };

    return reply.send(openApiDocument);
  });
}
