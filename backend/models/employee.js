const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    id: String,     // Employee ID from frontend
    name: String,
    job: String,
    age: String,
    email: String
  },
  {
    collection: "employee"   // 👈 FORCE collection name
  }
);

module.exports = mongoose.model("Employee", employeeSchema);