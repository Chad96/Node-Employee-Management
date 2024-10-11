import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeList = ({ employees, deleteEmployee, setEditingEmployee }) => {
  return (
    <div className="employee-list">
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} className="employee-item">
            {/* Display employee's picture */}
            <img 
              src={employee.image}  // Assuming each employee has an 'image' property
              alt={`${employee.name} ${employee.surname}`} 
              className="employee-image"
            />
            <span>{employee.name} {employee.surname} - {employee.position}</span>
            <button onClick={() => setEditingEmployee(employee)} title="Edit Employee">
              <FaEdit />
            </button>
            <button onClick={() => deleteEmployee(employee.id)} title="Delete Employee">
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
