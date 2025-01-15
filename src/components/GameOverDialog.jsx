import React from 'react';
import { Dialog, DialogActions, DialogContent, Typography, Button } from '@mui/material';

/**
 * GameOverDialog component displays a dialog when the game is over.
 * 
 * Props:
 * - open: Boolean that controls the visibility of the dialog.
 * - gameResult: String, either 'won' or 'lost', based on the outcome.
 * - onRestart: Function to restart the game when the user clicks the "Restart" button.
 */
const GameOverDialog = ({ open, gameResult, onRestart }) => {
  const getMessage = () => {
    if (gameResult === 'won') {
      return 'You defeated the enemy and won the battle!';
    }
    return 'You were defeated! Better luck next time!';
  };

  return (
    <Dialog open={open} onClose={onRestart}>
      <DialogContent sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h4" sx={{ color: gameResult === 'won' ? '#00ff00' : '#ff0000', fontWeight: 'bold' }}>
          {gameResult === 'won' ? 'Victory!' : 'Game Over'}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          {getMessage()}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onRestart}
          variant="outlined"
          sx={{
            color: '#00d9ff',
            borderColor: '#00d9ff',
            marginBottom: '10px',
            fontWeight: 'bold',
          }}
        >
          Restart Game
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameOverDialog;
