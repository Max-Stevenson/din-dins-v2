const request = require("supertest");
const app = require("../src/app");
const { sampleRcipe, sampleRcipeTwo } = require("./utils/testData");

it("returns 201 status when create recipe request is valid", (done) => {
  request(app).post("/api/v1/recipes").send(sampleRcipe).expect(201, done);
});
