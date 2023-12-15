"use strict";
/**
  Title: index.js
  Author: Jeremy Lates
  Original Author: Professor Krasso's class code examples are adapted to work with this page
  Date: 10/07/2023
  Description:  This code has been adapted from code Professor Krasso provided.

    1. Code has been adapted from Professor Krasso : https://github.com/buwebdev/web-340/blob/master/week-6/fms/index.js
    2. Code had been adapted from Professor Krasso : https://github.com/buwebdev/web-340/blob/master/week-6/mongoose-model/index.js
    3. Code had been adapted from geeksforgeeks.com : https://www.geeksforgeeks.org/express-js-res-render-function/
    4. Code had been adapated from https://www.geeksforgeeks.org/mongoose-findone-function/
 */

//create express variable
const express = require("express");

//create mongoose variable
const mongoose = require("mongoose");

const fs = require("fs");

//Get customer schema
const Customer = require("./models/customer");

//Get appointment schema
const Appointment = require("./models/appointment");

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

/* Create with promise  */
//Handle post to registration page page
// app.post("/register", (req, res, next) => {
//   console.log("register");

//   const newCustomer = new Customer({
//     customerId: req.body.customerId,
//     email: req.body.email,
//   });

//   console.log(newCustomer);

//   Customer.create(newCustomer)
//     .then((result) => {
//       console.log(result);
//       res.render("index");
//     })
//     .catch((err) => {
//       console.log("Error : " + err);
//     });
// });

/* Create without promise  */
app.post("/register", (req, res, next) => {
  const newCustomer = new Customer({
    customerId: req.body.customerId,
    email: req.body.email,
  });

  console.log(newCustomer);

  Customer.create(newCustomer, function (err, customer) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("index");
    }
  });
});

/* FInd with promise  */
// Route to customers page
// app.get("/customers", (req, res) => {
//   //console.log("Customers Page");

//   Customer.find({})
//     .then((docs) => {
//       //console.log(`Customers : ${docs}`);
//       res.render("customer-list", {
//         title: "Customer List",
//         pageTitle: "Pets-R-Us",
//         customersList: docs,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

/* Find without promise  */
app.get("/customers", (req, res) => {
  Customer.find({}, function (err, customers) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("customer-list", {
        title: "Customer List",
        pageTitle: "Pets-R-Us",
        customersList: customers,
      });
    }
  });
});

//Route to registration page
app.get("/appointment", (req, res) => {
  let jsonFile = fs.readFileSync("./public/data/services.json");
  let services = JSON.parse(jsonFile);

  res.render("appointment", {
    services: services,
    title: "Hello Appointment: appointment",
    message: "Welcome to the Appointment page",
  });
});

//Book an appointment
app.post("/appointment", (req, res, next) => {
  const newAppointment = new Appointment({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    service: req.body.service,
  });

  console.log(`newAppointment : ${newAppointment}`);

  Appointment.create(newAppointment, function (err, appointment) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("index");
    }
  });
});

//Route to my appointments page
app.get("/my-appointments", (req, res) => {
  res.render("my-appointments");
});

//Fetch appointments by email address
app.get("/api/appointments/:email", async (req, res, next) => {
  console.log("Made it to API");
  console.log(req.params.email);
  Appointment.find({ email: req.params.email }, function (err, appointments) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(appointments);
      console.log(`my data : ${appointments}`);
      res.json(appointments);
    }
  });
});

app.listen(PORT, () => {
  console.log("Application started and listening on PORT " + PORT);
});
