import fs from "fs";
import path from "path";

import auth from "./auth";
import openApiSpec from "./api/openApiSpec"; // Import the new route

export async function loadRoutes() {
  const routes = [auth];

  // Assuming all route files are .ts files
  const apiDir = path.join(__dirname, "./api");
  if (!fs.existsSync(apiDir)) {
    return routes;
  }

  const routeFiles = fs
    .readdirSync(apiDir)
    .filter((file) => file.endsWith(".ts"));

  for (const file of routeFiles) {
    const routeModule = await import(`./api/${file}`);
    if (routeModule.default && typeof routeModule.default === "function") {
      if (routeModule.default.constructor.name === "AsyncFunction") {
        routes.push(routeModule.default);
      } else {
        console.warn(
          `Module ${file} does not export an async function as default.`
        );
      }
    } else {
      console.warn(
        `Module ${file} does not have a default export or is not a function.`
      );
    }
  }

  // Ensure openApiSpec route is only added once
  if (!routes.includes(openApiSpec)) {
    routes.push(openApiSpec);
  }

  return routes;
}
