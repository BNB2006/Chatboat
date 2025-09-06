import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/chat", async (req, res) => {
  try {
    const { model = "gpt-4.1-mini", messages = [] } = req.body || {};
    console.log("Incomming request:", {model, messages})

    const response = await client.chat.completions.create({
      model,
      messages,
    });

    console.log("OpenAI response:", response)

    const text = response.choices[0]?.message?.content || "(no response)";
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err?.message || "Unknown error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
    console.log(`✅ API running at http://localhost:${PORT}`)
);