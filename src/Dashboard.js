import React, { useRef, useState } from "react";
import { Grid, Box, Typography, Card, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import Globe from "react-globe.gl";
import { useTheme } from "./context/ThemeContext"; 

import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
} from "chart.js";

// Explicitly register components
ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip);

const Dashboard = () => {
  const globeRef = useRef();
  const { darkTheme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedArc, setSelectedArc] = useState(null);

  const stats = [
    { label: "Phishing Emails Blocked", value: 152 },
    { label: "Honeypots Triggered", value: 18 },
    { label: "Fraudulent Transactions Stopped", value: 78 },
  ];

  const pointsData = [
    { lat: 40.7128, lng: -74.0060, size: 2, color: "red", name: "New York", ip: "192.168.1.1" },
    { lat: 48.8566, lng: 2.3522, size: 3, color: "blue", name: "Paris", ip: "192.168.1.2" },
    { lat: 35.6895, lng: 139.6917, size: 2.5, color: "green", name: "Tokyo", ip: "192.168.1.3" },
  ];

  const connections = [
    { 
      start: { lat: 40.7128, lng: -74.0060, ip: "192.168.1.1" }, 
      end: { lat: 48.8566, lng: 2.3522, ip: "192.168.1.2" },
      direction: "New York to Paris"
    },
    { 
      start: { lat: 48.8566, lng: 2.3522, ip: "192.168.1.2" }, 
      end: { lat: 35.6895, lng: 139.6917, ip: "192.168.1.3" },
      direction: "Paris to Tokyo"
    },
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Fraud Alerts",
        data: [15, 30, 45, 60, 75, 90],
        borderColor: "#80c6ff",
        backgroundColor: "rgba(128, 198, 255, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#ff5252",
        pointBorderWidth: 2,
      },
    ],
  };

  const handlePointClick = (point) => {
    setSelectedLocation({
      name: point.name || "Unknown Location",
      ip: point.ip || "Not Available",
      city: point.city || "Unknown City",
      lat: point.lat,
      lng: point.lng,
    });
  
    globeRef.current.pointOfView(
      { lat: point.lat, lng: point.lng, altitude: 0.8 },
      2000 // Animation duration in ms
    );
  };

  // Handle Arc (Line) click - capturing the IP and direction of arcs
  const handleArcClick = (arc) => {
    const { start, end, direction } = arc;

    setSelectedArc({
      startLat: start.lat,
      startLng: start.lng,
      startIp: start.ip,
      endLat: end.lat,
      endLng: end.lng,
      endIp: end.ip,
      direction: direction,
    });
  };

  return (
    <Box sx={{ padding: "40px", minHeight: "100vh", background: darkTheme ? "#121212" : "#f4f4f4" }}>
      {/* Title Section */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#80c6ff",
          textAlign: "center",
          marginBottom: "30px",
          textShadow: darkTheme ? "0px 0px 10px rgba(128, 198, 255, 0.8)" : "none",
          fontSize: "3rem",
          letterSpacing: "2px",
        }}
      >
        Fraud Detection Dashboard
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                borderRadius: "12px",
                background: darkTheme ? "#1e1e1e" : "#fff",
                boxShadow: "0px 0px 25px rgba(128, 198, 255, 0.3)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: darkTheme
                    ? "0px 0px 30px rgba(128, 198, 255, 0.5)"
                    : "0px 0px 30px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#80c6ff",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  textShadow: darkTheme ? "0px 0px 8px rgba(128, 198, 255, 0.8)" : "none",
                  fontSize: "2.5rem",
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

      {/* Globe Section */}
      <Box
        sx={{
          marginTop: "50px",
          padding: "20px",
          background: darkTheme ? "#1a1a1a" : "#fff",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0px 0px 25px rgba(128, 198, 255, 0.3)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#80c6ff",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Live Threat Detection
        </Typography>
        {/* Location Details */}
        {selectedLocation && (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h6">Selected Location: {selectedLocation.name}</Typography>
            <Typography variant="body1">IP Address: {selectedLocation.ip}</Typography>
          </Box>
        )}
        {/* Arc Details */}
        {selectedArc && (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h6">Direction: {selectedArc.direction}</Typography>
            <Typography variant="body1">Start IP: {selectedArc.startIp}</Typography>
            <Typography variant="body1">End IP: {selectedArc.endIp}</Typography>
          </Box>
        )}
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
            ref={globeRef}
            globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor={darkTheme ? "#000000" : "#f4f4f4"}
            pointsData={pointsData}
            pointAltitude={(point) => point.size || 1}
            pointColor={(point) => point.color || "#ffffff"}
            onPointClick={handlePointClick}
            arcsData={connections}
            arcColor={() => ["#ff5252", "#80c6ff"]}
            arcDashLength={0.6}
            arcDashGap={0.2}
            arcDashInitialGap={() => Math.random()}
            arcDashAnimateTime={1500}
            arcStroke={2}
            onArcClick={handleArcClick} // Handle arc click
          />
        </Box>
      </Box>

      {/* Chart Section */}
      <Box
        sx={{
          marginTop: "50px",
          background: darkTheme ? "#1e1e1e" : "#f4f4f4",
          borderRadius: "12px",
          boxShadow: "0px 0px 25px rgba(128, 198, 255, 0.3)",
          padding: "20px",
          color: darkTheme ? "#ffffff" : "#333333",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#80c6ff",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Fraud Alerts Over Time
        </Typography>
        <Line data={chartData} />
      </Box>
    </Box>
  );
};

export default Dashboard;
