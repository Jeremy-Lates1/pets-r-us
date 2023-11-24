"use strict";
/**
  Title: index.js
  Author: Jeremy Lates
  Original Author: Professor Krasso
  Date: 10/07/2023
  Description:  This code has been adapted from code Professor Krasso provided.

    1. Code has been adapted from Professor Krasso : https://github.com/buwebdev/web-340/blob/master/week-6/fms/index.js
    2. Code had been adapted from Professor Krasso : https://github.com/buwebdev/web-340/blob/master/week-6/mongoose-model/index.js
    3. Code had been adapted from geeksforgeeks.com : https://www.geeksforgeeks.org/express-js-res-render-function/
    
 */

//create express variable
const express = require("express");

//create mongoose variable
const mongoose = require("mongoose");

//Get customer schema
const Customer = require("./models/customer");

//Will use this for our path
const path = require("path");

//create the app
const app = express();

//create mongoose connections string
const CONN =
  "mongodb+srv://web340_admin:Thunder1970@bellevueuniversity.gxluysn.mongodb.net/web340DB?retryWrites=true&w=majority";

//Wire up views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true })); //Why do I need this line of code.  When I added it it made the parameters work in my post
app.use(express.json()); //Why do I need this line of code.  When I added it it made the parameters work in my post

const PORT = process.env.PORT || 3000;

//Connect to the MongoDB database
mongoose
  .connect(CONN)
  .then(() => {
    console.log(
      "Connection to MongoDB database was successful\n  If you see this message it means you were able to connect to your MongoDB Atlas cluster"
    );
  })
  .catch((err) => {
    console.log("MongoDB Error: " + err.message);
  });

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

//Route to registration page
app.get("/registration", (req, res) => {
  res.render("register", {
    title: "Hello Routes: register",
    message: "Welcome to the registration page",
  });
});

//Handle post to registration page page
app.post("/register", (req, res, next) => {
  console.log("register");

  const newCustomer = new Customer({
    customerId: req.body.customerId,
    email: req.body.email,
  });

  console.log(newCustomer);

  Customer.create(newCustomer)
    .then((result) => {
      console.log(result);
      res.render("index");
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
});

app.listen(PORT, () => {
  console.log("Application started and listening on PORT " + PORT);
});
