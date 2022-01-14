const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mockDatabase = new MongoMemoryServer();