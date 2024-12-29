import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./assets/Components/LoginPage";
import RegisterPage from "./assets/Components/RegistrationPage";
import HomePage from "./assets/Components/HomePage";
import DataEntry from "./assets/Components/DataEntry";
import DataView from "./assets/Components/DataView";
import Overview from "./assets/Components/Overview";
import PredictionPage from "./assets/Components/PredictionPage"; // Import PredictionPage
import { auth } from "./firebase";

function App() {
  const [user, setUser] = React.useState(null);

  // Listen for authentication changes
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-entry"
          element={
            <ProtectedRoute>
              <DataEntry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-view"
          element={
            <ProtectedRoute>
              <DataView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prediction"
          element={
            <ProtectedRoute>
              <PredictionPage /> {/* Add PredictionPage route */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
