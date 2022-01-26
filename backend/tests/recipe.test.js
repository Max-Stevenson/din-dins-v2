/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const { expect } = require("chai");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Recipe = require("../src/models/recipe");
const app = require("../src/app");

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  mongoose.connect(mongoUri);
  Recipe.deleteMany({});
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

describe("GET/:id", () => {
  it("should return a recipe if valid id is passed", async () => {
    const recipe = await new Recipe(testData).save();
    const res = await request(app).get(`/api/v1/recipes/${recipe._id}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name", recipe.name);
  });
});

describe("POST /", () => {
  it("should create a recipe with valid inputs", async () => {
    const res = await request(app).post("/api/v1/recipes/").send(testData);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name", testData.name);
  });
});

describe("PUT/:id", () => {
  it("should modify a recipe with valid input", async () => {
    const recipe = await new Recipe(testData).save();
    const alteredTestData = testData;
    alteredTestData.name = "Changed";
    const res = await request(app).put(`/api/v1/recipes/${recipe._id}`).send(alteredTestData);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name", "Changed");
  });
});
