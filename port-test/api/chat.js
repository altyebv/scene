// /api/chat.js
export default async function handler(req, res) {
    console.log("📩 Incoming request:", {
        method: req.method,
        headers: req.headers,
        body: req.body,
    });

    if (req.method !== "POST") {
        console.warn("⚠️ Method not allowed:", req.method);
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body || {};
        console.log("💬 Extracted message from body:", message);

        if (!message) {
            console.error("❌ No message provided in body");
            return res.status(400).json({ error: "Message is required" });
        }

        console.log("🚀 Sending request to AI API...");
        const aiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: message }],
            }),
        });

        console.log("📡 AI API response status:", aiResponse.status);

        if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            console.error("❌ AI API returned error:", errorText);
            return res.status(aiResponse.status).json({ error: errorText });
        }

        const data = await aiResponse.json();
        console.log("✅ Parsed AI API response:", data);

        const reply = data.choices?.[0]?.message?.content || "(No response from AI)";
        console.log("💡 Extracted reply:", reply);

        res.status(200).json({ reply });
    } catch (err) {
        console.error("💥 Serverless function error:", err);
        res.status(500).json({ error: err.message });
    }
}
