import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Logs = () => {
  const logs = [
    { id: 1, event: 'Suspicious login from unknown IP.', time: '1 hour ago' },
    { id: 2, event: 'Honeypot accessed by attacker.', time: '2 hours ago' },
    { id: 3, event: 'Blocked phishing site interaction.', time: '3 hours ago' },
  ];

  return (
    <List>
      {logs.map((log) => (
        <ListItem key={log.id} style={{ borderBottom: '1px solid #ccc' }}>
          <ListItemText primary={log.event} secondary={log.time} />
        </ListItem>
      ))}
    </List>
  );
};

export default Logs;
