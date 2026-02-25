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


router.put("/update/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: Number(req.params.id) },  // 🔥 search using custom id
      req.body,
      { returnDocument: "after" }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee Not Found ❌" });
    }

    res.json({
      message: "Employee Updated Successfully ✅",
      updatedEmployee
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Updating Employee ❌" });
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
    const { id } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ id });
    // const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    res.json({ message: "Employee Deleted Successfully ✅" });

  } catch (err) {
    res.status(500).json({ message: "Error Deleting Employee ❌" });
    console.log(err)
  }
  
});

module.exports = router;