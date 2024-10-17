// firebaseConfig.js (Client-Side)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Storage
const auth = getAuth(app); // Initialize Firebase Auth
const storage = getStorage(app); // Initialize Firebase Storage

// Export the initialized Firebase services
export { app, auth, storage };
