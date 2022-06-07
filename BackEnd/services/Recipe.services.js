const Recipe = require("../models/Recipe.model");
const ObjectId = require("mongoose").Types.ObjectId;

// Response models

async function GetRecipe(recipeId) {
  try {
    return await Recipe.findById(recipeId).exec();
  } catch (error) {
    return { fault: error.stringValue, message: error.message };
  }
}

async function CreateRecipe(recipe) {
  try {
    return await Recipe.create({ ...recipe });
  } catch (error) {
    return { fault: error.stringValue, message: error.message };
  }
}

async function UpdateRecipe(recipeId, recipe) {
  try {
    return await Recipe.updateOne({ _id: recipeId }, { $set: { ...recipe } });
  } catch (error) {
    return { fault: error.stringValue, message: error.message };
  }
}

async function GetByUserId(userId) {
  try {
    return await Recipe.find({
      fromUser: new ObjectId(userId),
    }).exec();
  } catch (error) {
    return { fault: error.stringValue, message: error.message };
  }
}

async function DeleteRecipe(recipeId) {
  try {
    return await Recipe.deleteOne({ _id: recipeId }).exec();
  } catch (error) {
    return { fault: error.stringValue, message: error.message };
  }
}

module.exports = {
  CreateRecipe,
  GetByUserId,
  GetRecipe,
  DeleteRecipe,
  UpdateRecipe,
};
