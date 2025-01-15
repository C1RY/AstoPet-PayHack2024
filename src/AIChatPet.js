import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Avatar,
  Paper,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"; // Icon for minimized state
import CloseIcon from "@mui/icons-material/Close"; // Close icon for minimized button
import Lottie from "lottie-react";
import { usePet } from "./PetContext";

import catAnimation from "./pet-animation.json";
import dogAnimation from "./DOG.json";
import pigeonAnimation from "./PIGEON.json";
import bearAnimation from "./BEAR.json";
import squirtleAnimation from "./SQUIRTLE.json";
import koalaAnimation from "./KOALA.json";
import eggAnimation from "./EGG.json"; // Fallback animation

const petAnimations = {
  Cat: catAnimation,
  Dog: dogAnimation,
  Pigeon: pigeonAnimation,
  Bear: bearAnimation,
  Squirtle: squirtleAnimation,
  Koala: koalaAnimation,
};

const AIChatPet = () => {
  const { currentStage, selectedPet } = usePet(); // Access pet details from context
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false); // Minimized state

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages([
        ...messages,
        { sender: "You", text: userInput, type: "user" },
      ]);
      setUserInput("");

      try {
        const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();

        if (data.message) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: selectedPet, text: data.message, type: "pet" },
          ]);
        } else {
          console.error("Error from backend:", data.error);
        }
      } catch (error) {
        console.error("Error sending message to backend:", error);
      }
    }
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Minimized State */}
      {isMinimized ? (
        <Tooltip title="Click to Expand" placement="left">
          <IconButton
            onClick={toggleMinimized}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
              color: "#ffffff",
              boxShadow: "0px 0px 15px rgba(0, 217, 255, 0.7)",
              "&:hover": {
                background: "linear-gradient(90deg, #00d9ff, #3f51b5)",
              },
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <ChatBubbleIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Paper
          elevation={20}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: "450px",
            maxHeight: "650px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "30px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #1e1e1e, #121212)",
            boxShadow:
              "0 0 40px rgba(0, 217, 255, 0.7), 0 0 80px rgba(0, 255, 255, 0.5)",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px",
              background: "linear-gradient(90deg, #111, #1a1a1a)",
              borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#00d9ff",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                textShadow: "0px 0px 10px rgba(0, 217, 255, 0.8)",
              }}
            >
              Chat with {selectedPet || "Pet"}
            </Typography>
            <IconButton onClick={toggleMinimized} sx={{ color: "#00d9ff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Pet Animation */}
          <Box
            sx={{
              alignSelf: "center",
              padding: "15px",
              background: "linear-gradient(145deg, #1a1a1a, #101010)",
              borderRadius: "50%",
              marginTop: "15px",
              boxShadow: "0px 0px 20px rgba(0, 217, 255, 0.6)",
            }}
          >
            <Lottie
              animationData={currentStage?.animation || eggAnimation}
              style={{ height: "120px" }}
            />
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
              background: "linear-gradient(145deg, #1a1a1a, #101010)",
              color: "#ffffff",
            }}
          >
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: msg.type === "user" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    marginBottom: "15px",
                  }}
                >
                  {msg.type === "pet" && (
                    <Avatar
                      sx={{
                        marginRight: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
                      }}
                      src={`/images/${
                        selectedPet?.toLowerCase() || "default"
                      }.png`}
                    />
                  )}
                  <Box
                    sx={{
                      background:
                        msg.type === "user"
                          ? "linear-gradient(90deg, #00d9ff, #0077cc)"
                          : "linear-gradient(90deg, #333, #444)",
                      color: msg.type === "user" ? "#ffffff" : "#cccccc",
                      borderRadius: "15px",
                      padding: "10px 15px",
                      maxWidth: "70%",
                      boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {msg.text}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Input Field */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              background: "rgba(0, 0, 0, 0.8)",
              borderTop: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Say something..."
              sx={{
                background: "rgba(30, 30, 30, 0.8)",
                borderRadius: "20px",
                color: "#ffffff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              inputProps={{ style: { color: "#ffffff" } }}
            />
            <IconButton
              onClick={handleSendMessage}
              sx={{
                marginLeft: "10px",
                background: "linear-gradient(90deg, #3f51b5, #00d9ff)",
                boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.6)",
                color: "#ffffff",
                "&:hover": {
                  background: "linear-gradient(90deg, #00d9ff, #3f51b5)",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default AIChatPet;
