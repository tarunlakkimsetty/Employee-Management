const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");


// 🔹 ADD EMPLOYEE
router.post("/add", async (req, res) => {
  try {
    const { id, name, job, age, email } = req.body;

    const newEmployee = new Employee({
      id,
      name,
      job,
      age,
      email
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee Added Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Adding Employee" });
  }
});


// 🔹 GET ALL EMPLOYEES
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Employees" });
  }
});


// 🔹 DELETE EMPLOYEE
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete Failed" });
  }
});

module.exports = router;