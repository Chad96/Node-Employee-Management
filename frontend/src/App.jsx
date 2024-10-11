import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import AddEmployeeForm from './components/AddEmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filter, setFilter] = useState({
    name: '',
    id: '',
    email: '',
    position: '',
    phone: '',
  });

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:5000/employees');
    setEmployees(response.data);
  };

  const addEmployee = async (employee) => {
    await axios.post('http://localhost:5000/employees', employee);
    fetchEmployees();
  };

  const updateEmployee = async (id, updatedEmployee) => {
    await axios.put(`http://localhost:5000/employees/${id}`, updatedEmployee);
    fetchEmployees();
    setEditingEmployee(null); // Clear editing state after updating
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on filter criteria
  const filteredEmployees = employees.filter(employee => {
    return (
      (employee.name.toLowerCase().includes(filter.name.toLowerCase()) || 
      employee.surname.toLowerCase().includes(filter.name.toLowerCase())) &&
      employee.id.toString().includes(filter.id) &&
      employee.email.toLowerCase().includes(filter.email.toLowerCase()) &&
      employee.position.toLowerCase().includes(filter.position.toLowerCase()) &&
      employee.phone.includes(filter.phone)
    );
  });

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddEmployeeForm 
                    addEmployee={addEmployee} 
                    updateEmployee={updateEmployee} 
                    editingEmployee={editingEmployee} 
                    setEditingEmployee={setEditingEmployee} 
                  />
                  <EmployeeList 
                    employees={filteredEmployees} // Use filtered employees
                    deleteEmployee={deleteEmployee} 
                    setEditingEmployee={setEditingEmployee} 
                  />
                </>
              }
            />
            <Route
              path="/employees"
              element={
                <>
                  <div className="filter-form">
                    <h3>Filter Employees</h3>
                    <input
                      type="text"
                      placeholder="Name or Surname"
                      value={filter.name}
                      onChange={e => setFilter({ ...filter, name: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="ID Number"
                      value={filter.id}
                      onChange={e => setFilter({ ...filter, id: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={filter.email}
                      onChange={e => setFilter({ ...filter, email: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={filter.position}
                      onChange={e => setFilter({ ...filter, position: e.target.value })}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={filter.phone}
                      onChange={e => setFilter({ ...filter, phone: e.target.value })}
                    />
                  </div>
                  <EmployeeList 
                    employees={filteredEmployees} // Use filtered employees
                    deleteEmployee={deleteEmployee} 
                    setEditingEmployee={setEditingEmployee} 
                  />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
