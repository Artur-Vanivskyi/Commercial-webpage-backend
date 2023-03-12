const express = require("express");
const app = express();

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const clientsRouter = require("./clients/clients.router");

app.use(cors());
app.use(express.json());

app.use("/clients", clientsRouter);

//Error handlers

app.use(notFound);
app.use(errorHandler);

module.exports = app;
