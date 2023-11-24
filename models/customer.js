"use strict";
/**
  Title: customer.js
  Author: Jeremy Lates
  Original Author: Professor Krasso
  Date: 11/21/2023
  Description:  This code has been adapted from code Professor Krasso provided.
  https://github.com/buwebdev/web-340/blob/master/week-6/mongoose-model/models/fruit.js

 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let customerSchema = new Schema({
  customerId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Customer", customerSchema);
