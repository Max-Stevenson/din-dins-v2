/* eslint-disable no-undef */
const mongoose = require("mongoose");
const expect = require("chai").expect;
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Recipe = require("../src/models/recipe");
const app = require("../src/app");

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(mongoUri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const testData = {
  name: "Test",
  servings: 2,
  cookingTime: 75,
  isVegetarian: false,
  ingredients: [
    { quantity: 2, measure: "spoons", ingredient: "joy" },
    { quantity: 2, measure: "cups", ingredient: "sorrow" },
  ],
  method: ["heat oven", "mix stuff", "cook"],
  tags: ["summertime", "cosy"],
};

describe("GET /", () => {
  it("should return all recipes", async () => {
    await new Recipe(testData).save();
    const res = await request(app).get("/api/v1/recipes/");
    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
  });
});
