#!/usr/bin/env node

const create = require("../lib/create");

const dev = require("../lib/dev");

const args = process.argv.slice(2);

if (args[0] === "create") {
  create(args[1] || "server-app");
}
else if (args[0] === "dev") {
  dev()
} else {
  console.log("Usage:");
  console.log("server-up-ndot create <project-name>");
}
