"use strict";
/**
  Title: index.js
  Author: Jeremy Lates
  Original Author: Professor Krasso
  Date: 10/07/2023
  Description:  This code has been adapted from code Professor Krasso provided.


 */

//  Hook up express
const express = require("express");

//Will use this for our path
const path = require("path");

//create the app
const app = express();

//Wire up views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

//Route to index page
app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello Index View",
    message: "Welcome to Pets-R-Us Application",
  });
});

//Route to grooming page
app.get("/grooming", (req, res) => {
  res.render("grooming", {
    title: "Hello Routes: grooming",
    message: "Welcome to the grooming page",
  });
});

//Route to boarding page
app.get("/boarding", (req, res) => {
  res.render("boarding", {
    title: "Hello Routes: boarding",
    message: "Welcome to the boarding page",
  });
});

//Route to boarding page
app.get("/training", (req, res) => {
  res.render("training", {
    title: "Hello Routes: training",
    message: "Welcome to the training page",
  });
});

app.listen(PORT, () => {
  console.log("Application started and listening on PORT " + PORT);
});
