// server.js
const express = require('express');
const cors = require('cors');
const { db } = require('./firebaseAdmin'); // Use firebaseAdmin for server-side Firestore

const app = express();
app.use(cors());
app.use(express.json());

// API routes

// Add new employee
app.post('/employees', async (req, res) => {
  try {
    const employeeData = req.body;
    await db.collection('employees').add(employeeData);
    res.status(200).send('Employee added successfully');
  } catch (error) {
    res.status(500).send('Error adding employee');
  }
});

// Get all employees
app.get('/employees', async (req, res) => {
  try {
    const snapshot = await db.collection('employees').get();
    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send('Error fetching employees');
  }
});

// Update an employee
app.put('/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedData = req.body;
    await db.collection('employees').doc(employeeId).update(updatedData);
    res.status(200).send('Employee updated successfully');
  } catch (error) {
    res.status(500).send('Error updating employee');
  }
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    await db.collection('employees').doc(employeeId).delete();
    res.status(200).send('Employee deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting employee');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
