const express = require("express");
const app = express();
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // set in Render dashboard

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            }
        );

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        res.json({ reply });

    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.get("/", (req, res) => res.send("Roblox AI Server is running!"));

app.listen(3000, () => console.log("Server running on port 3000"));

