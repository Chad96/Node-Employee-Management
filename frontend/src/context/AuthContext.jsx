import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app"; 
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdixVmC-lvMXc6xpMD8jJeXx6rOYDHtR8",
  authDomain: "node-employee-management.firebaseapp.com",
  projectId: "node-employee-management",
  storageBucket: "node-employee-management.appspot.com",
  messagingSenderId: "484151775479",
  appId: "1:484151775479:web:357661aa35f6187af983f2"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const SESSION_DURATION = 2 * 60 * 1000; // 2 minutes session duration

    // Function to check for session timeout
    const checkSessionTimeout = () => {
        const sessionStartTime = localStorage.getItem('sessionStartTime');
        if (sessionStartTime) {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - sessionStartTime;

            if (elapsedTime > SESSION_DURATION) {
                logout(); // Call logout if session expired
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                localStorage.setItem('sessionStartTime', new Date().getTime()); // Start session on login
            }
            setLoading(false);
        });

        // Check session timeout every minute
        const interval = setInterval(checkSessionTimeout, 60 * 1000); // Check every minute

        return () => {
            unsubscribe();
            clearInterval(interval); // Clear interval when component unmounts
        };
    }, [auth]);

    const login = async (email, password) => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);

        const token = await userCredential.user.getIdToken();
        localStorage.setItem('token', token);
        localStorage.setItem('sessionStartTime', new Date().getTime()); // Store session start time

        setCurrentUser(userCredential.user);
    };

    const logout = async () => {
        await auth.signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('sessionStartTime'); // Remove session start time on logout
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
