"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true
});

// Register the CORS plugin
// You can pass configuration options to the plugin, for example:
app.register(fastifyCors, {
  // Configure CORS options here
  // For example, allowing requests from any origin:
  origin: "*"
});

// Register your application as a normal plugin.
app.register(import("../src/app.js"));

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
