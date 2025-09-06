# 🤖 AI Chatbot (React + Tailwind + Google Gemini)

This is a simple **AI Chatbot** project built with **React (frontend)** and **Express (backend)**.  
It connects to **Google Gemini API** (`gemini-1.5-flash`) to generate real-time responses.  


## 🚀 Features
- 💬 Chat with AI (powered by Google Gemini)  
- 🎨 Clean and responsive UI (Tailwind CSS)  
- 🧭 Auto-scroll chat area  
- 📋 Copy messages with one click  
- 🔄 Clear chat history button  
- 🔒 Secure API key handling with `.env`  


## 📂 Project Structure
```

project-root/
├── client/                # React frontend
│   └── src/
│       ├── components/
│       │   ├── Avatar.jsx
│       │   ├── Chat.jsx
│       │   ├── CopyButton.jsx
│       │   ├── Icons.jsx
│       │   └── MessageBubble.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       └── main.jsx
├── server/                # Express backend
│   ├── server.js
│   └── .env
└── README.md

````

---

## ⚡ Setup & Installation

1. **Clone this repo**
    ```bash
    git clone https://github.com/your-username/ai-chatbot.git
    cd ai-chatbot
    ```

2. **Install dependencies**

   * Frontend:

     ```bash
     cd client
     npm install
     ```
   * Backend:

     ```bash
     cd ../server
     npm install
     ```

3. **Set up environment variables**
   Create a `.env` file inside the **server** folder:

   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3001
   ```

   👉 Get your free API key from [Google AI Studio](https://aistudio.google.com/).

4. **Run the project**

   * Start backend (server):

     ```bash
     cd server
     node server.js
     ```
   * Start frontend (client):

     ```bash
     cd client
     npm run dev
     ```

---

## 🎯 Usage

* Open browser at: `http://localhost:5173` (Vite default port)
* Type your question in the chatbox
* Press **Enter** or click **Send**
* The bot will reply instantly using Gemini
* Switch models (`gemini-1.5-flash` / `gemini-1.5-pro`) from the dropdown


## 🛠 Tech Stack

* **React** (Frontend)
* **Tailwind CSS** (Styling)
* **Express** (Backend API)
* **Google Gemini API** (AI responses)

✨Thank you 
---
