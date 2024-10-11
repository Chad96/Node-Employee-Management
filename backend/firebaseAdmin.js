// firebaseAdmin.js (Server-Side)
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); 

// Initialize the Admin SDK with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-employee-management.firebaseio.com" // Correct Firestore URL
});

const db = admin.firestore(); // Firestore database instance

module.exports = { db };
