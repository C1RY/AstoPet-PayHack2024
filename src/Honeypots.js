import React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import Globe from "react-globe.gl";
import AIChatPet from "./AIChatPet"; // Ensure this is correctly imported
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useTheme } from "./context/ThemeContext"; // Import the custom hook

// Explicitly register required Chart.js components
ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip);

const Honeypots = () => {
  const { darkTheme } = useTheme(); // Use the custom hook to get the theme value

  const honeypotStats = [
    { label: "Phishing Attempts Captured", value: 356 },
    { label: "Fraudulent IPs Flagged", value: 78 },
    { label: "Alerts Triggered", value: 24 },
  ];

  const phishingDataOverTime = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Phishing Attempts",
        data: [20, 50, 80, 120, 150, 200],
        borderColor: "#ff5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#ff5722",
      },
      {
        label: "Fraudulent Activities",
        data: [15, 40, 70, 100, 140, 190],
        borderColor: "#00d9ff",
        backgroundColor: "rgba(0, 217, 255, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#00d9ff",
      },
    ],
  };

  const fraudulentDomains = [
    { domain: "fraudulent-site.com", attempts: 67, origin: "Russia" },
    { domain: "phishing-link.net", attempts: 48, origin: "China" },
    { domain: "malicious-site.org", attempts: 34, origin: "United States" },
    { domain: "fake-email-service.io", attempts: 22, origin: "India" },
  ];

  const globePoints = [
    { lat: 55.7558, lng: 37.6173, size: 2, color: "red", name: "Russia" },
    { lat: 39.9042, lng: 116.4074, size: 3, color: "blue", name: "China" },
    { lat: 37.7749, lng: -122.4194, size: 2, color: "green", name: "United States" },
    { lat: 28.6139, lng: 77.209, size: 3, color: "orange", name: "India" },
  ];

  return (
    <Box
      sx={{
        padding: "40px",
        minHeight: "100vh",
        background: darkTheme ? "#121212" : "#f4f4f4", // Adjust background based on the theme
        position: "relative",
      }}
    >
      {/* Title Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#ff5722",
          textAlign: "center",
          marginBottom: "30px",
          textShadow: "0px 0px 10px rgba(255, 87, 34, 0.8)",
        }}
      >
        Honeypots Dashboard
      </Typography>

      {/* Honeypot Metrics */}
      <Grid container spacing={4}>
        {honeypotStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                borderRadius: "12px",
                background: darkTheme ? "#1e1e1e" : "#fff", // Change card background based on theme
                boxShadow: "0px 0px 15px rgba(255, 87, 34, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: index === 0
                    ? "0px 0px 20px rgba(255, 87, 34, 0.8)"
                    : "0px 0px 20px rgba(128, 198, 255, 0.8)",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: index === 0 ? "#ff5722" : "#00d9ff",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  textShadow: index === 0
                    ? "0px 0px 10px rgba(255, 87, 34, 0.8)"
                    : "0px 0px 10px rgba(128, 198, 255, 0.8)",
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: darkTheme ? "#cccccc" : "#333333", fontSize: "16px" }}
              >
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Interactive Globe Section */}
      <Box
        sx={{
          marginTop: "50px",
          padding: "20px",
          background: darkTheme ? "#1a1a1a" : "#fff", // Adjust background based on theme
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0px 0px 15px rgba(255, 87, 34, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#ff5722",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            textShadow: "0px 0px 10px rgba(255, 87, 34, 0.8)",
          }}
        >
          Phishing Threats Origins
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundColor="#000000"
            pointsData={globePoints}
            pointAltitude="size"
            pointColor="color"
            onPointClick={(point) => alert(`Location: ${point.name}`)}
            height="100%"
            width="100%"
          />
        </Box>
      </Box>

      {/* Phishing Threats Over Time */}
      <Box
        sx={{
          marginTop: "50px",
          background: darkTheme ? "#1e1e1e" : "#f4f4f4", // Adjust background color based on theme
          borderRadius: "12px",
          boxShadow: "0px 0px 15px rgba(255, 87, 34, 0.2)",
          padding: "20px",
          color: darkTheme ? "#ffffff" : "#333333", // Adjust text color based on theme
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#ff5722", fontWeight: "bold", marginBottom: "20px" }}
        >
          Phishing Attempts and Fraudulent Activities
        </Typography>
        <Line data={phishingDataOverTime} />
      </Box>

      {/* Top Fraudulent Domains */}
      <Box
        sx={{
          marginTop: "50px",
          background: darkTheme ? "#1e1e1e" : "#f4f4f4", // Adjust background color based on theme
          borderRadius: "12px",
          boxShadow: "0px 0px 15px rgba(255, 87, 34, 0.2)",
          padding: "20px",
          color: darkTheme ? "#ffffff" : "#333333", // Adjust text color based on theme
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#ff5722", fontWeight: "bold", marginBottom: "20px" }}
        >
          Top Fraudulent Domains
        </Typography>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell>Attempts</TableCell>
              <TableCell>Origin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fraudulentDomains.map((domain, index) => (
              <TableRow key={index}>
                <TableCell>{domain.domain}</TableCell>
                <TableCell>{domain.attempts}</TableCell>
                <TableCell>{domain.origin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* AI Chat Bot Component */}
      <AIChatPet />
    </Box>
  );
};

export default Honeypots;
