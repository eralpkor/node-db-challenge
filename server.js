const express = require('express');
const helmet = require('helmet');

const RecipeRouter = require('./recipes/recipe-router');
const IngredientRouter = require('./ingredients/ingredient-router');

const server = express();

server.use(helmet());
server.use(express.json());


server.use('/api/ingredients', IngredientRouter);

server.use('/api/recipes', RecipeRouter);

server.get('/', (req, res) => {
  res.send('<h1>Sprint Challenge</h1>');
});

module.exports = server;