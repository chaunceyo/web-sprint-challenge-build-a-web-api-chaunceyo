const express = require('express');
const actionRouter = require("../api/actions/actions-router")
const projectRouter = require("../api/projects/projects-router")
const server = express();


// Configure your server here
server.use(express.json())
// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", actionRouter)
// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", projectRouter)
// Do NOT `server.listen()` inside this file!

module.exports = server;
