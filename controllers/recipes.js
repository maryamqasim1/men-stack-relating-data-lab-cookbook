const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const session = require('express-session');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find()
    res.render('recipes/index.ejs', { recipes });
});

router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')
})

router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        res.render('recipes/show.ejs', { recipe });
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        newRecipe.owner = req.session.user._id
        await newRecipe.save();

        await Recipe.create(newRecipe);
        res.redirect('/recipes');
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:recipeId/edit', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.render('recipes/edit.ejs', { recipe })
});

router.put('/:recipeId', async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
    res.redirect(`/recipes/${req.params.recipeId}`)
});

router.delete('/:recipeId', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.recipeId);
        res.redirect('/recipes');
    } catch (error) {
        console.log(error);
        res.redirect('/recipes'); // Redirect in case of error
    }
});

module.exports = router;