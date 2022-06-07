const express = require("express");
const router = express.Router();

const RecipeServices = require("../services/Recipe.services");
const UserServices = require("../services/User.services");

// Response models

router.get("/", UserServices.CheckAuthenticated, async (req, res) => {
  try {
    const recipe = await RecipeServices.GetRecipe(req.headers.recipeid);

    if (recipe === null || recipe.message !== undefined)
      return res.status(400).send(recipe);

    return res.status(200).send(recipe);
  } catch (error) {
    return res
      .status(500)
      .send({ fault: error.stringValue, message: error.message })
      .end();
  }
});

router.post("/", UserServices.CheckAuthenticated, async (req, res) => {
  try {
    const recipe = {
      title: req.body.title,
      description: req.body.description,
      ingredients: JSON.parse(req.body.ingredients),
      steps: JSON.parse(req.body.steps),
      difficulty: req.body.difficulty,
      fromUser: req.body.fromUser,
    };

    const newRecipe = await RecipeServices.CreateRecipe({ ...recipe });

    return res.status(201).send(newRecipe).end();
  } catch (error) {
    return res
      .status(500)
      .send({ fault: error.stringValue, message: error.message })
      .end();
  }
});

router.patch("/", UserServices.CheckAuthenticated, async (req, res) => {
  try {
    const recipe = {
      title: req.body.title,
      description: req.body.description,
      ingredients: JSON.parse(req.body.ingredients),
      steps: JSON.parse(req.body.steps),
      difficulty: req.body.difficulty,
      fromUser: req.body.fromUser,
    };

    const updatedRecipe = await RecipeServices.UpdateRecipe(
      req.headers.recipeid,
      recipe
    );

    return res.sendStatus(200).send(updatedRecipe);
  } catch (error) {
    return res
      .status(500)
      .send({ fault: error.stringValue, message: error.message })
      .end();
  }
});

router.delete("/", UserServices.CheckAuthenticated, async (req, res) => {
  try {
    const responseDelete = await RecipeServices.DeleteRecipe(
      req.headers.recipeid
    );

    if (responseDelete.message !== undefined)
      return res.status(400).send(responseDelete.message);

    return res.status(200).send(responseDelete);
  } catch (error) {
    return res
      .status(500)
      .send({ fault: error.stringValue, message: error.message })
      .end();
  }
});

router.post("/home", UserServices.CheckAuthenticated, async (req, res) => {
  try {
    const recipes = await RecipeServices.GetByUserId(req.headers.userid);

    if (recipes.fault === undefined) return res.status(400).send(recipes).end();

    return res.status(200).send(recipes).end();
  } catch (error) {
    return res
      .status(500)
      .send({ fault: error.stringValue, message: error.message })
      .end();
  }
});

module.exports = router;
