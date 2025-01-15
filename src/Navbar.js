import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Switch, Badge } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { usePet } from "./PetContext"; // Access the selected pet context
import { useTheme } from "./context/ThemeContext"; // Use the global theme context
import { useAuth } from "./assets/AuthContext"; // Import the authentication context

const Navbar = () => {
  const { darkTheme, toggleTheme } = useTheme(); // Get theme state and toggle function from context
  const { selectedPet } = usePet(); // Access the selected pet from context
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // Get the current route path
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Access authentication state

  // Handle logout
  const handleLogout = () => {
    alert("You have been logged out!");
    localStorage.removeItem("isAuthenticated"); // Clear the authentication flag
    setIsAuthenticated(false); // Update the context
    navigate("/login"); // Redirect to the login page
  };

  // Navigation links (keep these for your other pages)
  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Honeypots", path: "/honeypots" },
    { name: "PetTab", path: "/pet" },
    { name: "Pet Info", path: "/petinfo" },
    { name: "RPG Combat", path: "/combat" },
    { name: "Coin Tracker", path: "/coin-tracker" },
    { name: "Settings", path: "/settings" },
  ];

  // Force re-render when darkTheme changes (this will be automatically managed via Context)
  useEffect(() => {}, [darkTheme]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: darkTheme
          ? "linear-gradient(135deg, #141414, #232323)"
          : "linear-gradient(135deg, #ffffff, #e0e0e0)",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
        transition: "background 0.3s ease-in-out",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 30px" }}>
        {/* Logo (AstoPet) - Clickable to navigate to /emaildash */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            background: darkTheme
              ? "linear-gradient(90deg, #3f51b5, #00d9ff)"
              : "linear-gradient(90deg, #00d9ff, #3f51b5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => navigate("/emaildash")} // Clicking the logo redirects to /emaildash
        >
          AstoPet
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {navLinks.map((link, index) => (
            <Button
              key={index}
              component={Link}
              to={link.path}
              sx={{
                fontWeight: "bold",
                color: location.pathname === link.path ? "#00d9ff" : darkTheme ? "#ffffff" : "#333333",
                textTransform: "capitalize",
                padding: "8px 12px",
                transition: "all 0.3s ease", // Smooth transition for hover effects
                "&:hover": {
                  backgroundColor: darkTheme ? "#333333" : "#333", // Light theme: dark gray hover background
                  color: darkTheme ? "#00d9ff" : "#ffffff", // Darker text for dark theme on hover
                  borderRadius: "5px", // Rounded corners for the hover effect
                  transform: "scale(1.05)", // Slight zoom effect on hover
                },
                borderBottom:
                  location.pathname === link.path
                    ? "2px solid #00d9ff" // Active page underline
                    : "none", // Remove border if not active
                "&:focus, &:active": {
                  backgroundColor: darkTheme ? "#333333" : "#333", // Keep the background color consistent for the current page
                  color: darkTheme ? "#00d9ff" : "#ffffff", // Keep text color on focus/active
                },
              }}
            >
              {link.name}
            </Button>
          ))}
        </Box>

        {/* Right-Side Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Notifications with Badge */}
          <Badge
            badgeContent={4} // Example notification count
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#f50057",
                color: "#ffffff",
                fontSize: "12px",
              },
            }}
          >
            <NotificationsIcon
              sx={{
                color: darkTheme ? "#ffffff" : "#333333",
                cursor: "pointer",
                "&:hover": { color: "#00d9ff" },
              }}
            />
          </Badge>

          {/* Display Selected Pet */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: darkTheme ? "#ffffff" : "#333333",
                fontSize: "14px",
              }}
            >
              Pet: {selectedPet}
            </Typography>
            <Avatar
              sx={{
                background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
                width: 32,
                height: 32,
              }}
            >
              {selectedPet.charAt(0)} {/* Display first letter of the pet */}
            </Avatar>
          </Box>

          {/* Logout Button */}
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              sx={{
                fontWeight: "bold",
                color: "#ffffff",
                background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
                textTransform: "none",
                padding: "5px 15px",
                borderRadius: "20px",
                "&:hover": { background: "linear-gradient(90deg, #00d9ff, #3f51b5)" },
              }}
            >
              Logout
            </Button>
          )}

          {/* Theme Toggle Switch */}
          <Switch
            checked={darkTheme}
            onChange={toggleTheme} // Use the global toggleTheme function
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: darkTheme ? "#444" : "#bbb",
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: darkTheme ? "#00d9ff" : "#3f51b5",
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
