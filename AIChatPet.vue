 
<template>
  <div class="chat-widget">
    <div class="toggle-button" @click="toggleChat">
      <span v-if="isOpen">✕</span>
      <span v-else>💬</span>
    </div>

    <transition name="slide-up">
      <div class="chat-container" v-if="isOpen">
        <!-- Header -->
        <div class="chat-header">
          <div class="pet-avatar">
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_tfb3estd.json"
              background="transparent"
              speed="1"
              style="width: 50px; height: 50px;"
              loop
              autoplay
            ></lottie-player>
          </div>
          <h2>AstoPet1</h2>
        </div>

        <!-- Messages -->
        <div class="chat-messages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.sender === 'pet' ? 'from-pet' : 'from-user']"
          >
            {{ msg.text }}
          </div>
        </div>

        <!-- Input Box -->
        <div class="chat-input">
          <input
            v-model="userInput"
            @keypress.enter="sendMessage"
            type="text"
            placeholder="Ask me anything..."
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      messages: [
        { text: "Hi! I'm AstoPet1, your AI security assistant.", sender: 'pet' },
      ],
      userInput: '',
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    sendMessage() {
      if (this.userInput.trim()) {
        this.messages.push({ text: this.userInput, sender: 'user' });
        this.userInput = '';
        this.simulateResponse();
      }
    },
    simulateResponse() {
      setTimeout(() => {
        this.messages.push({
          text: "That's a great question! Let me analyze that for you.",
          sender: 'pet',
        });
      }, 1500);
    },
  },
};
</script>

<style scoped>
/* Main Chat Widget */
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* Toggle Button */
.toggle-button {
  background: linear-gradient(135deg, #3f51b5, #5c6bc0);
  color: white;
  font-size: 24px;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.toggle-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

/* Chat Container */
.chat-container {
  width: 350px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.5s ease;
}

/* Chat Header */
.chat-header {
  background: linear-gradient(135deg, #3f51b5, #5c6bc0);
  padding: 15px;
  display: flex;
  align-items: center;
  color: white;
}

.chat-header .pet-avatar {
  margin-right: 10px;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f9f9f9;
}

.message {
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  max-width: 70%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.from-pet {
  background: #e3f2fd;
  align-self: flex-start;
}

.from-user {
  background: #c8e6c9;
  align-self: flex-end;
}

/* Chat Input */
.chat-input {
  display: flex;
  padding: 10px;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-input button {
  background: linear-gradient(135deg, #3f51b5, #5c6bc0);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.chat-input button:hover {
  background: linear-gradient(135deg, #303f9f, #3f51b5);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up-enter-active {
  animation: fadeIn 0.5s ease;
}
</style>
