const express = require('express');
const bodyParser = require('body-parser');

const movieRoutes = require("./routes/movie");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use("/movie", movieRoutes);

app.listen(8000);