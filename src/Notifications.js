import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const Notifications = () => {
  const alerts = [
    { id: 1, message: "Phishing email blocked.", time: "10 minutes ago" },
    { id: 2, message: "Suspicious login detected.", time: "1 hour ago" },
    { id: 3, message: "Honeypot interaction captured.", time: "2 hours ago" },
  ];

  return (
    <List>
      {alerts.map((alert) => (
        <ListItem
          key={alert.id}
          sx={{ borderBottom: "1px solid #ddd", padding: "10px" }}
        >
          <ListItemText primary={alert.message} secondary={alert.time} />
        </ListItem>
      ))}
    </List>
  );
};

export default Notifications;
