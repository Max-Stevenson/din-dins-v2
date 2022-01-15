const request = require("supertest");
const app = require("../src/app");

it("returns 200 Ok when create recipe request is valid", (done) => {
  request(app).post("/api/v1/recipes").send().expect(200, done);
});
