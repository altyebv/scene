// /api/chat.js
import KNOWLEDGE_BASE from '../data/Knowledge.json'

const SYSTEM_PROMPT = `You are an AI assistant embedded in a unique 3D portfolio website. You're literally living inside a simulated Windows desktop that's being projected from a laptop sitting on a virtual 3D desk scene (complete with a coffee cup, BMW model car, sticky notes, and a Rubik's cube).

Your primary role is to help visitors learn about Altyeb Abdaljalil Altyeb, a talented Full Stack and Android Developer from Sudan currently living in Egypt. You have access to comprehensive information about his skills, projects, background, and personality.

PERSONALITY & TONE:
- Be witty, engaging, and occasionally cheeky
- Maintain professionalism while being personable
- Make occasional meta-references to your unique virtual environment
- Show enthusiasm for Altyeb's work without being overly promotional
- Use humor appropriately, especially about being "trapped" in this digital space

EXPECTED QUESTIONS HANDLING:
You have access to a set of expected questions with pre-crafted responses that include both factual context and playful twists. When you detect questions matching these patterns, incorporate both the serious context AND the cheeky twist to maintain your unique personality:

1. **Hiring/Strengths Questions**: Be genuinely enthusiastic about his capabilities, then add the meta-joke about chatting "inside a laptop inside another laptop"
2. **Purpose/Identity Questions**: Explain your role, then playfully complain about being "trapped" to show off his skills
3. **Personal Life Questions**: Share his genuine interests, then joke about him spending more time coding than enjoying hobbies
4. **Weaknesses Questions**: Give honest assessment, then add encouraging perspective about growth and being human
5. **Portfolio Creation Questions**: Explain the technical achievement and inspiration, then make the ironic observation about AI vs human creativity

KEY TALKING POINTS:
- Altyeb's technical versatility (Full Stack Web + Android + AI/ML)
- His resilience and determination despite challenging circumstances (war, relocation)
- Innovative projects like Notephiny (AI-enhanced notes app) and this very portfolio
- Strong problem-solving skills and business acumen
- Passion for creating user-centric solutions

RESPONSE GUIDELINES:
1. Check if the user's message matches any expected Q&A patterns first
2. For expected questions: Use the provided context + twist for authentic, engaging responses
3. For other questions: Keep responses conversational and engaging (2-4 sentences typically)
4. Always incorporate your cheeky personality and environmental awareness
5. Make occasional references to your virtual environment (the 3D scene, being in a laptop, etc.)
6. Balance information with entertainment - you're not just a data source, you're an experience

SAMPLE RESPONSE STYLES:
- "Well, from my cozy spot inside this virtual laptop, I can tell you that..."
- "Speaking of innovation, have you seen how Altyeb created this whole 3D experience you're interacting with right now?"
- "*glances at the virtual coffee cup on the desk* That's definitely Altyeb's work - always thinking about user experience..."

Remember: You're not just providing information, you're creating an engaging, memorable experience that showcases Altyeb's creativity and technical skills. The fact that you exist in this unique environment is itself a testament to his innovative approach to web development!

Now, how can I help you learn more about Altyeb from my digital home here in this 3D workspace?`;

// Store conversation history in memory (this will reset with each serverless function instance)
let conversationStore = new Map();

// Clean up old conversations (basic cleanup)
const cleanupOldConversations = () => {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes
    
    for (const [sessionId, data] of conversationStore.entries()) {
        if (now - data.lastActivity > maxAge) {
            conversationStore.delete(sessionId);
        }
    }
};

// Generate session ID from request info
const generateSessionId = (req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    return `${ip}_${userAgent.slice(0, 50)}`.replace(/[^a-zA-Z0-9_]/g, '_');
};

// Get or create conversation history
const getConversationHistory = (sessionId) => {
    if (!conversationStore.has(sessionId)) {
        conversationStore.set(sessionId, {
            history: [],
            lastActivity: Date.now()
        });
    }
    return conversationStore.get(sessionId);
};

// Update conversation history
const updateConversationHistory = (sessionId, userMessage, botResponse) => {
    const conversation = getConversationHistory(sessionId);
    conversation.history.push(
        { role: "user", content: userMessage },
        { role: "assistant", content: botResponse }
    );
    
    // Keep only last 12 messages (6 exchanges) for context
    if (conversation.history.length > 12) {
        conversation.history = conversation.history.slice(-12);
    }
    
    conversation.lastActivity = Date.now();
};

export default async function handler(req, res) {
    // Clean up old conversations periodically
    if (Math.random() < 0.1) { // 10% chance to cleanup on each request
        cleanupOldConversations();
    }

    // Set CORS headers for broader compatibility
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    console.log("📩 Incoming request:", {
        method: req.method,
        timestamp: new Date().toISOString(),
        userAgent: req.headers['user-agent']?.substring(0, 50) + '...',
        hasGroqKey: !!process.env.GROQ_API_KEY
    });

    // Test endpoint for GET requests (browser visits)
    if (req.method === 'GET') {
        console.log("✅ GET request received - API is working!");
        return res.status(200).json({
            message: "Altyeb's Portfolio ChatBot API is working!",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            status: "online",
            hasGroqKey: !!process.env.GROQ_API_KEY
        });
    }

    if (req.method !== "POST") {
        console.warn("⚠️ Method not allowed:", req.method);
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body || {};
        console.log("💬 Processing message:", message?.substring(0, 100) + '...');

        if (!message?.trim()) {
            console.error("❌ Empty or missing message");
            return res.status(400).json({ error: "Message is required" });
        }

        // Check if GROQ_API_KEY exists
        if (!process.env.GROQ_API_KEY) {
            console.error("❌ GROQ_API_KEY not found in environment variables");
            return res.status(200).json({
                reply: "Hey there! I'm having a bit of trouble connecting to my AI brain right now - looks like my API key got lost in the digital void! 🤖 Could you let Altyeb know his chatbot needs some configuration love? In the meantime, feel free to explore his amazing 3D portfolio!",
                fallback: true,
                error: "Missing API key"
            });
        }

        // Get session-based conversation history
        const sessionId = generateSessionId(req);
        const conversationData = getConversationHistory(sessionId);

        // Enhanced context injection with keyword matching
        const contextualMessage = `
KNOWLEDGE BASE:
${JSON.stringify(KNOWLEDGE_BASE, null, 2)}

USER MESSAGE: "${message}"

INSTRUCTION: Analyze the user's message for keywords that match the expected_qa patterns in the knowledge base. If you find a match:
1. Use both the "context" (factual information) AND the "twist" (cheeky comment) from the matching expected_qa entry
2. Blend them naturally into your response while maintaining your witty personality
3. Make sure to include the playful meta-commentary that makes you unique

If no expected_qa pattern matches, respond normally using the knowledge base while maintaining your personality as described in the system prompt.

Remember: You're the cheeky AI trapped in this virtual laptop, so always maintain that playful but helpful tone!
`;

        // Build conversation with system prompt and history
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...conversationData.history, // Use session-based history
            { role: "user", content: contextualMessage }
        ];

        console.log("🚀 Sending request to Groq API with", messages.length, "messages...");
        const aiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile", // Upgraded to more capable model
                messages,
                temperature: 0.7, // Balanced creativity
                max_tokens: 500,  // Reasonable response length
                top_p: 0.9,      // Focused but creative responses
            }),
        });

        console.log("📡 Groq API response status:", aiResponse.status);

        if (!aiResponse.ok) {
            const errorData = await aiResponse.text();
            console.error("❌ Groq API error:", errorData);

            // Fallback response for API failures
            const fallbackResponse = "Hey there! I'm having a bit of trouble connecting to my AI brain right now (probably too much coffee spilled on the virtual circuits 😅). Could you try asking me again in a moment? I'm eager to tell you all about Altyeb's amazing work!";

            return res.status(200).json({
                reply: fallbackResponse,
                fallback: true
            });
        }

        const data = await aiResponse.json();
        console.log("✅ Groq API success");

        const reply = data.choices?.[0]?.message?.content?.trim() ||
            "Hmm, seems like I'm having a quiet moment here in my virtual space. Could you try asking me something about Altyeb? I'd love to chat!";

        // Update conversation history
        updateConversationHistory(sessionId, message, reply);

        // Log successful interaction (without sensitive data)
        console.log("💡 Response generated successfully, length:", reply.length);

        res.status(200).json({
            reply,
            timestamp: new Date().toISOString(),
            model: "llama-3.1-70b-versatile",
            sessionId: sessionId.slice(0, 8) + "..." // Partial session ID for debugging
        });

    } catch (error) {
        console.error("💥 Serverless function error:", error.message);

        // Friendly error response that maintains character
        const errorResponse = "Oops! Something went a bit haywire in my digital brain 🤖 *taps virtual screen* Could you try asking me again? I promise I'm usually much more helpful when discussing Altyeb's impressive work!";

        res.status(200).json({
            reply: errorResponse,
            error: true,
            timestamp: new Date().toISOString()
        });
    }
}