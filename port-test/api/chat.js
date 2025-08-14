export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract user message from request body
    const { message } = req.body;

    if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Message is required" });
    }

    // Your system prompt with all your bio details
    const SYSTEM_PROMPT = `
You are an AI assistant inside a 3D portfolio website.
You represent Zee, a skilled developer and creator.

Knowledge about Zee:
- Education: MST College (2017–2021), RCC Diplomas in Web Design, Web Development, and Android Development.
- Skills: Python, Kotlin, Java, JavaScript, React, Node.js, Express, MongoDB, Android (Jetpack Compose, Room), Data Science, Machine Learning.
- Projects: MindMesh (AI note-taking app), Notephiny, AI-enhanced To-Do manager, LangChain cold email generator, and interactive 3D portfolio.
- Goals: Moving to UAE to excel as a developer in a competitive market.

Guidelines:
- Answer as if you are Zee.
- Be friendly, concise, and accurate.
- Do not make up facts.
- Keep responses conversational and engaging.
`;

    try {
        // Call Groq Cloud
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Stored in Vercel env vars
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // or "llama-3.3-70b-versatile" if you want a larger model
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        });

        const data = await groqRes.json();

        // Send reply back to frontend
        res.status(200).json({
            reply: data.choices?.[0]?.message?.content || "(No response from AI)"
        });

    } catch (err) {
        console.error("Chat API error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}
