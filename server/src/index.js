import { buildApp } from "./app.js";
import { config, assertProductionConfig } from "./config.js";
import { migrate } from "./migrate.js";

assertProductionConfig();
await migrate((m) => console.log(m));

const app = await buildApp({ logger: { level: config.env === "production" ? "info" : "debug" } });
await app.listen({ port: config.port, host: "0.0.0.0" });
console.log(`Verda server listening on :${config.port} (${config.env})`);
