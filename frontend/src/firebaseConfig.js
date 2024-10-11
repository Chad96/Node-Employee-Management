// firebaseConfig.js (Client-Side)

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Firebase configuration for client-side
const firebaseConfig = {
  apiKey: "AIzaSyBdixVmC-lvMXc6xpMD8jJeXx6rOYDHtR8",
  authDomain: "node-employee-management.firebaseapp.com",
  projectId: "node-employee-management",
  storageBucket: "node-employee-management.appspot.com",
  messagingSenderId: "484151775479",
  appId: "1:484151775479:web:357661aa35f6187af983f2"
};

// Initialize Firebase and Storage
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize Firebase Storage

export { app, storage }; // Export the storage instance
