"use strict";
/**
  Title: appointment.js
  Author: Jeremy Lates
  Original Author: Professor Krasso's class code examples are adapted from https://github.com/buwebdev/web-340/blob/master/week-8/fms/models/order.js
  Date: 12/05/2023
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
