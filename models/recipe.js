const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: true,
    ref: 'User'
  },
  ingredients: {
    type: String,
    required: false,
    ref: 'Ingredient'
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
