export const stages = [
    {
      name: "Stage Phishing",
      enemy: {
        name: "Phishing Duck",
        health: 100,
        maxHealth: 100,
        attack: 10,
        defense: 5,
        animation: require("../assets/ENEMY1.json"), // Phishing Duck Animation
      },
      questions: [
        {
            question: "Which of the following is an example of phishing?",
            answers: ["Sending spam emails", "Fraudulent email asking for your password", "Posting on social media", "Browsing a website"],
            correctAnswer: "Fraudulent email asking for your password",
          },
          {
            question: "What is a common characteristic of a phishing email?",
            answers: ["A trustworthy email address", "Generic greeting like 'Dear User'", "Proper grammar and spelling", "High-quality attachments"],
            correctAnswer: "Generic greeting like 'Dear User'",
          },
          {
            question: "How can you recognize a phishing website?",
            answers: ["It always starts with 'https://'", "It mimics a legitimate website with small differences in the URL", "It requires no login", "It contains government seals"],
            correctAnswer: "It mimics a legitimate website with small differences in the URL",
          },
          {
            question: "What is the primary goal of phishing?",
            answers: ["To advertise a product", "To steal sensitive information", "To block access to websites", "To crash a computer"],
            correctAnswer: "To steal sensitive information",
          },
          {
            question: "Which action is recommended when you suspect phishing?",
            answers: ["Open the email attachment", "Ignore it and continue working", "Report it to your IT department", "Forward it to friends"],
            correctAnswer: "Report it to your IT department",
          },
          {
            question: "What is 'spear phishing'?",
            answers: ["Phishing that targets a group of people", "Phishing attempts focused on a specific individual or organization", "Phishing via social media platforms", "A phishing scam that uses malware"],
            correctAnswer: "Phishing attempts focused on a specific individual or organization",
          },
          {
            question: "How can you protect yourself from phishing emails?",
            answers: ["Use strong passwords", "Never click on links from unknown sources", "Disable your firewall", "Avoid updating your software"],
            correctAnswer: "Never click on links from unknown sources",
          },
          {
            question: "What is a 'pharming' attack?",
            answers: ["A phishing email disguised as a farmer’s ad", "Redirecting users to a fake website without their knowledge", "Malware that infects agricultural databases", "Installing spyware on a victim's computer"],
            correctAnswer: "Redirecting users to a fake website without their knowledge",
          },
          {
            question: "What type of organization is most often impersonated in phishing emails?",
            answers: ["Social media platforms", "Banks and financial institutions", "Gaming websites", "Movie streaming platforms"],
            correctAnswer: "Banks and financial institutions",
          },
          {
            question: "What is the first step you should take after receiving a phishing email?",
            answers: ["Delete the email immediately", "Click on the links to investigate further", "Respond to the sender for clarification", "Report it to your email provider or IT support"],
            correctAnswer: "Report it to your email provider or IT support",
          },
        ],
      },
    {
      name: "Stage Malware",
      enemy: {
        name: "Malware",
        health: 150,
        maxHealth: 150,
        attack: 20,
        defense: 10,
        animation: require("../assets/ENEMY2.json"), // Malware Animation
      },
      questions: [
        {
            question: "What does malware stand for?",
            answers: ["Malfunctioning software", "Malicious software", "Manual software updates", "Management software"],
            correctAnswer: "Malicious software",
          },
          {
            question: "Which is NOT an example of malware?",
            answers: ["Trojan horse", "Ransomware", "Firewall", "Spyware"],
            correctAnswer: "Firewall",
          },
          {
            question: "What does ransomware do?",
            answers: ["Steals personal information", "Encrypts files and demands payment for their release", "Tracks user activity on a website", "Deletes random files on your computer"],
            correctAnswer: "Encrypts files and demands payment for their release",
          },
          {
            question: "What is a keylogger?",
            answers: ["A tool to track software usage", "Malware that records keyboard inputs to steal sensitive information", "A program to log system updates", "A type of antivirus software"],
            correctAnswer: "Malware that records keyboard inputs to steal sensitive information",
          },
          {
            question: "What is the primary purpose of spyware?",
            answers: ["To destroy files on a system", "To secretly gather information about a user", "To shut down computers remotely", "To disable antivirus software"],
            correctAnswer: "To secretly gather information about a user",
          },
          {
            question: "What is a common sign of malware infection?",
            answers: ["Faster computer performance", "Increased pop-ups and ads", "Improved internet speed", "Fewer system updates"],
            correctAnswer: "Increased pop-ups and ads",
          },
          {
            question: "Which type of malware replicates itself and spreads to other computers?",
            answers: ["Virus", "Worm", "Adware", "Trojan"],
            correctAnswer: "Worm",
          },
          {
            question: "What should you do if you suspect your device is infected with malware?",
            answers: ["Disconnect from the internet and run a malware scanner", "Turn off your antivirus software", "Restart the computer multiple times", "Disable all system updates"],
            correctAnswer: "Disconnect from the internet and run a malware scanner",
          },
          {
            question: "Which of these is a primary way malware spreads?",
            answers: ["Through official app stores", "Via email attachments or malicious links", "By running software updates", "Through secured connections"],
            correctAnswer: "Via email attachments or malicious links",
          },
          {
            question: "What is the purpose of a Trojan horse in malware attacks?",
            answers: ["To protect a computer from viruses", "To disguise itself as legitimate software to infect systems", "To directly replicate itself", "To shut down networks permanently"],
            correctAnswer: "To disguise itself as legitimate software to infect systems",
          },
        ],
      },
    ];
  
  