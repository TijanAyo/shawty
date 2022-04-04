require("dotenv").config();

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const internalErrorHandler = require("./middlewares/internal-error-handler");
const ConnectDB = require("./config/db");
const shortenUrl = require("./controllers/shorten-url");
const getAllUsersUrl = require("./controllers/get-all-users-url");
const mapUrlToId = require("./controllers/map-url-to-id");

const app = express();
ConnectDB();

//view engine & Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// static files path
app.use(express.static(__dirname + "/public"));

app.get("/", getAllUsersUrl);

app.post("/shorten_url", shortenUrl);

app.get("/:id", mapUrlToId);

app.use(internalErrorHandler);

module.exports = app;
