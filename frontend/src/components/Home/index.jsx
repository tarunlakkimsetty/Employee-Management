import React, { Component } from "react";
import {
  HomeWrapper,
  ModalOverlay,
  ModalCard
} from "./styledComponents";

class Home extends Component {
  state = {
    employees: [],
    showModal: false,
    editIndex: null,
    id: "",
    name: "",
    job: "",
    age: "",
    email: ""
  };

  openModal = () => {
    this.setState({
      showModal: true,
      editIndex: null,
      id: "",
      name: "",
      job: "",
      age: "",
      email: ""
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddOrUpdate = () => {
    const { id, name, job, age, email, employees, editIndex } = this.state;

    const newEmployee = { id, name, job, age, email };

    if (editIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = newEmployee;
      this.setState({ employees: updatedEmployees });
    } else {
      this.setState({ employees: [...employees, newEmployee] });
    }

    this.closeModal();
  };

  handleEdit = (index) => {
    const emp = this.state.employees[index];

    this.setState({
      id: emp.id,
      name: emp.name,
      job: emp.job,
      age: emp.age,
      email: emp.email,
      editIndex: index,
      showModal: true
    });
  };

  handleDelete = (index) => {
    const filtered = this.state.employees.filter((_, i) => i !== index);
    this.setState({ employees: filtered });
  };

  handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  render() {
    const {
      employees,
      showModal,
      id,
      name,
      job,
      age,
      email,
      editIndex
    } = this.state;

    return (
      <HomeWrapper className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary">Employee Management</h3>
          <div>
            <button className="btn btn-primary me-2" onClick={this.openModal}>
              Add Employee
            </button>
            <button className="btn btn-outline-danger" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Empty State */}
        {employees.length === 0 ? (
          <div className="text-center mt-5">
            <h5 className="text-muted">No Data Added yet!</h5>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th width="160px" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.job}</td>
                    <td>{emp.age}</td>
                    <td>{emp.email}</td>
                    <td className="text-center">

                      {/* EDIT BUTTON */}
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => this.handleEdit(index)}
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Edit
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => this.handleDelete(index)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CENTERED MODAL */}
        {showModal && (
          <ModalOverlay>
            <ModalCard>

              <h5 className="mb-3 text-primary fw-bold">
                {editIndex !== null ? "Edit Employee" : "Add Employee"}
              </h5>

              <input
                name="id"
                value={id}
                onChange={this.handleChange}
                placeholder="Employee ID"
                className="form-control mb-2"
              />

              <input
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Employee Name"
                className="form-control mb-2"
              />

              <input
                name="job"
                value={job}
                onChange={this.handleChange}
                placeholder="Job Role"
                className="form-control mb-2"
              />

              <input
                name="age"
                value={age}
                onChange={this.handleChange}
                placeholder="Age"
                className="form-control mb-2"
              />

              <input
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
                className="form-control mb-3"
              />

              <div className="text-end">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={this.closeModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.handleAddOrUpdate}
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>

            </ModalCard>
          </ModalOverlay>
        )}

      </HomeWrapper>
    );
  }
}

export default Home;