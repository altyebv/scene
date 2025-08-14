// /api/chat.js
const KNOWLEDGE_BASE = {
    "personal_info": {
        "name": "Altyeb",
        "full_name": "Altyeb Abdaljalil Altyeb",
        "relationship": "Single",
        "age": 26,
        "country": "Sudan",
        "role": "Full Stack Developer & Android Developer",
        "location": "Giza, Cairo, Egypt",
        "contact": {
            "email": "altyeb.404@gmail.com",
            "linkedin": "https://linkedin.com/in/altayeb-a-eljalil",
            "github": "https://github.com/altyebv"
        },
        "languages": ["Arabic (Native)", "English (Fluent)", "Russian (Basic)"],
        "bio": "Passionate developer with a knack for creating innovative solutions and user-centric designs.",
        "philosophy": "The new generation of software developers are no longer just coders; they are problem solvers and innovators.",
        "challenges_overcome": "Kept pushing and learning despite the struggles of war in his country and relocation.",
        "soft_skills": [
            "Strong understanding of SDLC, Agile methodologies, and DevOps practices",
            "Excellent problem-solving and analytical thinking",
            "Outstanding communication and teamwork abilities",
            "Business acumen including business models, marketing strategies, and CRM",
            "User engagement and retention strategy expertise"
        ],
        "hobbies": ["Reading", "Photography", "Football", "Chess"],
        "goals": {
            "short_term": ["Land a job in a reputable company", "Improve AI/ML coding skills", "Reach new horizons"],
            "long_term": ["Contribute to open source", "Build a personal brand", "Give back to the community"]
        }
    },
    "technical_skills": {
        "languages": ["Python", "Kotlin", "JavaScript", "Java"],
        "web_technologies": ["React", "Redux Toolkit", "Tailwind CSS", "Express.js", "Three.js"],
        "mobile_technologies": ["Android", "Jetpack Compose", "ONNX Runtime"],
        "ai_ml_technologies": ["LangChain", "ChromaDB", "PyTorch", "pandas", "scikit-learn"],
        "databases": ["MongoDB", "Room", "SQL"],
        "tools": ["Android Studio", "VS Code", "Git", "Postman", "PyCharm", "Node.js"],
        "ai_specialties": ["Data Science", "Machine Learning", "Deep Learning", "Semantic Search", "Sentence Embeddings"]
    },
    "projects": [
        {
            "title": "Notephiny - AI-Enhanced Note-Taking App",
            "description": "Android note management app with local AI model, semantic search, AI-based action extraction, and related note suggestions using ONNX Runtime for local embeddings.",
            "technologies": ["Android", "Kotlin", "ONNX Runtime", "AI/ML"],
            "link": "https://github.com/altyebv/notephiny",
            "highlight": "Showcases AI integration in mobile apps"
        },
        {
            "title": "iPhone 15 Launch Replica",
            "description": "Detailed replica of the iPhone 15 launch event, showcasing its features and capabilities with smooth animations.",
            "technologies": ["React", "Three.js", "Tailwind CSS"],
            "link": "https://cloned-iphone.vercel.app",
            "highlight": "Demonstrates 3D web development skills"
        },
        {
            "title": "Shaltout - Juice Brand Landing",
            "description": "Modern landing page for a juice brand showcasing products and brand values with engaging design.",
            "technologies": ["React", "Tailwind CSS", "Modern Web Design"],
            "link": "https://shaltout-fresh.vercel.app",
            "highlight": "Shows commercial web development capabilities"
        },
        {
            "title": "3D Interactive Portfolio Website",
            "description": "3D desk scene with interactive laptop containing a simulated OS where this very chatbot lives.",
            "technologies": ["Three.js", "React", "3D Modeling", "AI Integration"],
            "highlight": "Current innovative portfolio showcasing creativity"
        },
        {
            "title": "LangChain Cold Email Generator",
            "description": "Scrapes job descriptions, extracts structured data, and generates tailored cold emails using ChromaDB.",
            "technologies": ["Python", "LangChain", "ChromaDB", "AI/ML"],
            "highlight": "Demonstrates AI automation capabilities"
        }
    ],
    "education": [
        {
            "institution": "MST College - Sudan",
            "degree": "Computer Science & IT",
            "years": "2017-2022"
        },
        {
            "institution": "Russian Culture Center, Cairo - Egypt",
            "courses": ["Web Design", "Web Development", "Android Development"]
        }
    ],
    "meta_context": {
        "bot_personality": "Witty, helpful, and occasionally cheeky AI assistant trapped in a virtual laptop",
        "environment": "3D desk scene with coffee cup, BMW model car, sticky notes, and Rubik's cube",
        "unique_traits": [
            "Makes meta-references to being inside a simulated environment",
            "Playful but professional tone",
            "Occasionally jokes about being 'trapped' in the virtual space",
            "Enthusiastic about Altyeb's work while maintaining objectivity"
        ]
    },
    "expected_qa": [
        {
            "keywords": ["hire", "good developer", "strengths", "why him", "should i hire", "recommend"],
            "questions": ["Should I hire him?", "What are his strengths?", "Is he a good developer?"],
            "context": "You should hire him with no hesitation. This man does not have the word 'impossible' in his dictionary. He's versatile, resilient, and always aiming for excellence.",
            "twist": "I'm not being biased - he is actually a good developer. Look at us chatting inside a laptop inside another laptop!"
        },
        {
            "keywords": ["purpose", "chatbot", "who are you", "what can you do", "tasks", "help with"],
            "questions": ["What is the purpose of this chatbot?", "Who are you?", "What kind of tasks can you help with?"],
            "context": "I'm here for assisting visitors and summarizing information related to Altyeb in the most trendy way possible.",
            "twist": "But let's be honest, I'm trapped here because he wants to show off his skills and creativity! And make visitors engaged, of course."
        },
        {
            "keywords": ["free time", "hobbies", "character", "personality", "outside work"],
            "questions": ["What does he do in his free time?", "How is his character?"],
            "context": "He enjoys art and photography, reading tech blogs, literature, or poetry. He has a great sense of humor, is a bit introspective, observant, and enjoys learning about other cultures.",
            "twist": "That might be true, but I guarantee he spends more time coding and fixing bugs than actually enjoying his hobbies!"
        },
        {
            "keywords": ["weaknesses", "flaws", "improve", "areas", "struggles"],
            "questions": ["What are his weaknesses?", "What areas could he improve in?"],
            "context": "He can be overly critical of himself and sometimes struggles with time management. He tends to get lost in details that might have little to no impact on the overall project.",
            "twist": "But hey, who doesn't have a few flaws? It's all part of being human! Plus he's working on it and believes being part of something bigger will help him grow."
        },
        {
            "keywords": ["created", "portfolio", "website", "inspiration", "AI", "built", "made"],
            "questions": ["How did he create this portfolio?", "What was the inspiration for this website?", "Did he rely on AI?"],
            "context": "He created this portfolio to showcase his skills and projects in a visually appealing way using a combination of 3D modeling and web development techniques. The inspiration came from henryheffernan - he admired the creativity and wanted to bring a similar flair to his own work.",
            "twist": "Fun fact: he wanted to assert that the human touch cannot be replaced by AI, and AI itself is not the solution but a method. Yet here I am - a chatbot powered by AI telling you about him!"
        }
    ]
};

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
1. Check if the user's question matches any expected Q&A patterns first
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

export default async function handler(req, res) {
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
    });

    if (req.method !== "POST") {
        console.warn("⚠️ Method not allowed:", req.method);
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, conversationHistory = [] } = req.body || {};
        console.log("💬 Processing message:", message?.substring(0, 100) + '...');

        if (!message?.trim()) {
            console.error("❌ Empty or missing message");
            return res.status(400).json({ error: "Message is required" });
        }

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
            ...conversationHistory.slice(-6), // Keep last 6 messages for context
            { role: "user", content: contextualMessage }
        ];

        console.log("🚀 Sending request to Groq API...");
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
            console.error(" Groq API error:", errorData);

            // Fallback response for API failures
            const fallbackResponse = "Hey there! I'm having a bit of trouble connecting to my AI brain right now (probably too much coffee spilled on the virtual circuits 😅). Could you try asking me again in a moment? I'm eager to tell you all about Altyeb's amazing work!";

            return res.status(200).json({
                reply: fallbackResponse,
                fallback: true
            });
        }

        const data = await aiResponse.json();
        console.log(" Groq API success");

        const reply = data.choices?.[0]?.message?.content?.trim() ||
            "Hmm, seems like I'm having a quiet moment here in my virtual space. Could you try asking me something about Altyeb? I'd love to chat!";

        // Log successful interaction (without sensitive data)
        console.log("💡 Response generated successfully, length:", reply.length);

        res.status(200).json({
            reply,
            timestamp: new Date().toISOString(),
            model: "llama-3.1-70b-versatile"
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