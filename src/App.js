import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar"; // Adjusted path for Navbar
import EmailDash from "./EmailDash"; // EmailDash as the primary dashboard
import Dashboard from "./Dashboard"; // Secondary Dashboard
import PetTab from "./PetTab";
import Honeypots from "./Honeypots";
import PetInfo from "./PetInfo";
import Login from "./Login";
import Settings from "./Settings";
import AIChatPet from "./AIChatPet";
import QuizRPG from "./assets/QuizRPG";
import { PetProvider } from "./PetContext"; // Context for pet data
import { AuthProvider, useAuth } from "./assets/AuthContext"; // Centralized authentication
import PhishingAlert from "./PhishingAlert"; // Import PhishingAlert component
import { emailData } from "./emails"; // Email data source
import CoinTracker from './utils/CoinTracker'; // Import the new CoinTracker component
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider> {/* Wrap your app with ThemeProvider for theme control */}
      <AuthProvider>
        <PetProvider>
          <Router>
            <AppRoutes />
          </Router>
        </PetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Component for Routes
function AppRoutes() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  // Persist authentication state in local storage
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  // Return routes based on authentication status
  return isAuthenticated ? (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        {/* EmailDash Route */}
        <Route path="/emaildash" element={<EmailDash />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Phishing Alerts Page */}
        <Route
          path="/phishing-alerts"
          element={
            <div style={{ padding: "20px", background: "#121212", color: "#fff" }}>
              <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Phishing Alerts</h1>
              {emailData.map((email) => (
                <PhishingAlert key={email.id} email={email} />
              ))}
            </div>
          }
        />

        {/* Other Routes */}
        <Route path="/pet" element={<PetTab />} />
        <Route path="/honeypots" element={<Honeypots />} />
        <Route path="/petinfo" element={<PetInfo />} />
        <Route path="/combat" element={<QuizRPG />} />
        <Route path="/coin-tracker" element={<CoinTracker />} /> {/* Add the Coin Tracker route */}
        <Route path="/settings" element={<Settings />} />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/emaildash" />} />
      </Routes>
      <AIChatPet />
    </div>
  ) : (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
