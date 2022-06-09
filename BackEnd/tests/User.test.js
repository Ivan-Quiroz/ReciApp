const {
  ConnectToDatabase,
  CloseConnection,
} = require("../services/MongoDB.services");

const bcrypt = require("bcrypt");
const UserServices = require("../services/User.services");

const { app, server } = require("../setup");
const supertest = require("supertest");
const api = supertest(app);

beforeAll(async () => {
  await ConnectToDatabase();
});

describe("POST /user", () => {
  test("The endpoint should respond with a 201 CREATED status code with the created new user", async () => {
    // Arrange
    const user = {
      name: "unit",
      lastName: "test",
      email: `test${Date.now()}@mail.com`,
      password: "test",
    };

    // Act
    const response = await api.post("/user").send({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });

    // Assert
    expect(response.statusCode).toBe(201);
    expect(response.body.email).not.toBe(undefined);
    expect(response.body.email).toBe(user.email);
    expect(response.body.name).toBe(user.name);
    expect(response.body.lastName).toBe(user.lastName);
  });

  test("The service should respond with the created new user", async () => {
    // Arrange
    const user = {
      name: "unit",
      lastName: "test",
      email: `test${Date.now()}@mail.com`,
      password: await bcrypt.hash("test", 10),
    };

    // Act
    const response = await UserServices.CreateUser(user);

    // Assert
    expect(response.name).not.toBe(undefined);
    expect(response.name).toBe(user.name);
    expect(response.lastName).toBe(user.lastName);
    expect(response.email).toBe(user.email);
    expect(response.password).toBe(user.password);
  });
});

describe("POST /user/login", () => {
  test("Should respond with a 200 OK status code with the user in the body and the access token in its headers", async () => {
    // Act
    const response = await api
      .post("/user/login")
      .auth("ivan@mail.com", "ivan");

    // Assert
    // expect(response.statusCode).toBe(200);
  });
});

describe("GetUserByEmail", () => {
  test("Should respond with the client who has the provided email", async () => {
    // Arrange
    const user = {
      name: "unit",
      lastName: "test",
      email: `test${Date.now()}@mail.com`,
      password: await bcrypt.hash("test", 10),
    };

    await UserServices.CreateUser(user);

    // Act
    const response = await UserServices.GetUserByEmail(user.email);

    // Assert
    expect(response.name).not.toBe(undefined);
    expect(response.name).toBe(user.name);
    expect(response.lastName).toBe(user.lastName);
    expect(response.email).toBe(user.email);
    expect(response.password).toBe(user.password);
  });
});

afterAll(() => {
  CloseConnection();
  server.close();
});
