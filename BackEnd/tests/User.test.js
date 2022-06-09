const supertest = require("supertest");
const { app, server } = require("../setup");
const api = supertest(app);

const UserServices = require("../services/User.services");

// describe("POST /user/login", () => {
//   test("should respond with a 200 status code", async () => {
//     const response = await api
//       .post("/user/login")
//       .type("form")
//       .send({ email: "ivan@mail.com", password: "ivan" });

//     console.log(response);
//   });
// });

// describe("POST /user", () => {
//   test("should respond with a 201 status code and a Content-Type 'application/json'", async () => {
//     await api
//       .post("/user")
//       .expect(201)
//       .expect("Content-Type", /application\/json/);
//   });
// });

afterAll(() => {
  server.close();
});
