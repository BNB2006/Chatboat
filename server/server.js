import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/chat", async (req, res) => {
  try {
    const { model = "gemini-4.1-mini", messages = [] } = req.body || {};

    const conversation = messages.map(m => `${m.role}:${m.content}`).join("\n");

    const modelClient = genAI.getGenerativeModel({ model });
    const result = await modelClient.generateContent(conversation);

    const text = result.response.text() || "(no response)";
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err?.message || "Unknown error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
    console.log(`✅ Gemini API running at http://localhost:${PORT}`)
);