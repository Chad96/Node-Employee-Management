import React, { useState, useEffect } from 'react';

const AddEmployeeForm = ({ addEmployee, updateEmployee, editingEmployee, setEditingEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    startDate: '',
    idNumber: '',
    image: null, // For storing the image file
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    }
  }, [editingEmployee]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData);
      setEditingEmployee(null);
    } else {
      addEmployee(formData);
    }
    // Reset form
    setFormData({
      name: '',
      surname: '',
      email: '',
      position: '',
      department: '',
      phone: '',
      startDate: '',
      idNumber: '',
      image: null, // Reset image field
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Surname"
        value={formData.surname}
        onChange={e => setFormData({ ...formData, surname: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={formData.position}
        onChange={e => setFormData({ ...formData, position: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={e => setFormData({ ...formData, department: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={e => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="date"
        placeholder="Start Date"
        value={formData.startDate}
        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="ID Number"
        value={formData.idNumber}
        onChange={e => setFormData({ ...formData, idNumber: e.target.value })}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        required={!editingEmployee} // Require image only if adding a new employee
      />
      <button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  );
};

export default AddEmployeeForm;
