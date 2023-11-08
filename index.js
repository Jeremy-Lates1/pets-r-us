/**
  Title: index.js
  Author: Jeremy Lates
  Date: 10/07/2023
  Description:


 */
"use strict";
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

app.listen(PORT, () => {
  console.log("Application started and listening on PORT " + PORT);
});
