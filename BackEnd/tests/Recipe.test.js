const {
  ConnectToDatabase,
  CloseConnection,
} = require("../services/MongoDB.services");

const RecipeServices = require("../services/Recipe.services");

beforeAll(() => {
  ConnectToDatabase();
});

describe("GET /recipe", () => {
  test("Should respond with the requested recipe by its recipe id", async () => {
    // Arrange
    const recipeId = "629d7b1ae28ebd6a638bba2a";

    // Act
    const response = await RecipeServices.GetRecipe(recipeId);

    // Assert
    expect(response._id).not.toBe(undefined);
  });
});

describe("POST /recipe", () => {
  test("Should respond with the created new recipe", async () => {
    // Arrange
    const recipe = {
      title: "My new recipe",
      description: "This is my awesome new recipe created from my tests",
      ingredients: ["Sugar", "Spice", "And everything nice", "chemical X"],
      steps: ["first step", "second step", "third step"],
      difficulty: 5,
      fromUser: "629d13180f6bc3fc2e385174",
    };

    // Act
    const response = await RecipeServices.CreateRecipe(recipe);

    // Assert
    expect(response._id).toBeDefined();
    expect(response.title).toBe(recipe.title);
    expect(response.description).toBe(recipe.description);
    expect(response.ingredients).toEqual(recipe.ingredients);
    expect(response.steps).toEqual(recipe.steps);
    expect(response.difficulty).toBe(recipe.difficulty);
  });
});

describe("PATCH /recipe", () => {
  test("Should respond with the actualized recipe", async () => {
    // Arrange
    const recipeId = "629d7b1ae28ebd6a638bba2a";

    const recipe = {
      title: "My new recipe",
      description: "This is my awesome new recipe created from my tests",
      ingredients: ["Sugar", "Spice", "And everything nice", "chemical X"],
      steps: ["first step", "second step", "third step"],
      difficulty: 5,
      fromUser: "629d13180f6bc3fc2e385174",
    };

    const fieldsToUpdate = {
      title: "Updated recipe",
      description: "I just updated my recipe",
    };

    // Act
    const response = await RecipeServices.UpdateRecipe(
      recipeId,
      fieldsToUpdate
    );

    // Assert
    expect(response.modifiedCount).toBeDefined();
  });
});

describe("DELETE /recipe", () => {
  test("Should respond a 200 status code", async () => {
    // Arrange
    const recipeId = "62a03650efc98cb1e2ed1f8a";

    // Act
    const response = await RecipeServices.DeleteRecipe(recipeId);

    // Assert
    expect(response.deletedCount).toBeDefined();
  });
});

describe("POST /recipe/home", () => {
  test("Should respond a 200 status code withg the recipes of the provided user", async () => {
    // Arrange
    const userId = "629d13180f6bc3fc2e385174";

    // Act
    const response = await RecipeServices.GetByUserId(userId);

    // Assert
    expect(response.length).toBeGreaterThan(0);
  });
});

afterAll(() => {
  CloseConnection();
});
