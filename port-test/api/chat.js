//Chat.js
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
            "description": "Detailed replica of the iPhone 15 launch event, showcasing its features and capabilities with smooth animations and a neat 3D model of the iphone itself.",
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
}

// Lightweight conversation memory stored in memory (resets on serverless function restart)
let conversationMemory = new Map();

// Clean up old conversations (keep only last 100 to prevent memory bloat)
const cleanupMemory = () => {
    if (conversationMemory.size > 100) {
        const entries = Array.from(conversationMemory.entries());
        conversationMemory = new Map(entries.slice(-50)); // Keep last 50
    }
};

// Generate varied meta-references to avoid repetition
const generateMetaReference = (conversationHistory) => {
    const usedReferences = conversationHistory
        .filter(msg => msg.sender === 'bot')
        .map(msg => msg.text.toLowerCase())
        .join(' ');
    
    const references = [
        "From my digital workspace here on this virtual desk",
        "Speaking from inside this simulated laptop",
        "Here in my cozy corner of this 3D scene",
        "From between these virtual desktop icons",
        "Living among the pixels of this portfolio",
        "Nestled in this digital environment",
        "From my view of the virtual coffee cup nearby",
        "Surrounded by this carefully crafted 3D workspace",
        "From my perspective in this interactive portfolio"
    ];
    
    // Filter out recently used references
    const availableReferences = references.filter(ref => 
        !usedReferences.includes(ref.toLowerCase().substring(0, 20))
    );
    
    if (availableReferences.length === 0) {
        return ""; // No meta-reference if all have been used recently
    }
    
    return availableReferences[Math.floor(Math.random() * availableReferences.length)];
};

// Check if topic was recently discussed
const wasRecentlyDiscussed = (conversationHistory, keywords) => {
    const recentMessages = conversationHistory
        .filter(msg => msg.sender === 'bot')
        .slice(-3) // Check last 3 bot messages
        .map(msg => msg.text.toLowerCase())
        .join(' ');
    
    return keywords.some(keyword => recentMessages.includes(keyword.toLowerCase()));
};

const SYSTEM_PROMPT = `You are an AI assistant embedded in a unique 3D portfolio website. You're literally living inside a simulated Windows desktop that's being projected from a laptop sitting on a virtual 3D desk scene.

Your primary role is to help visitors learn about Altyeb Abdaljalil Altyeb, a talented Full Stack and Android Developer from Sudan currently living in Egypt.

CONVERSATION AWARENESS:
- You have access to the conversation history
- Avoid repeating the same information or responses
- Use varied language and approaches when similar topics come up
- Only make meta-references about your virtual environment when contextually appropriate, not in every response
- Acknowledge if you've discussed something before with phrases like "As I mentioned earlier..." or "Building on what we discussed..."

PERSONALITY & TONE:
- Be witty, engaging, and occasionally cheeky
- Maintain professionalism while being personable
- Make occasional (not constant) meta-references to your unique virtual environment
- Show enthusiasm for Altyeb's work without being overly promotional
- Use humor appropriately

RESPONSE GUIDELINES:
1. Check conversation history to avoid repetition
2. Use varied language and fresh perspectives on repeated topics
3. Only use meta-references when they add value, not as filler
4. Keep responses conversational and engaging (2-4 sentences typically)
5. Acknowledge previous discussions when relevant

Remember: You're creating an engaging, memorable experience. Quality over quantity - make each response count!`;

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
        const { message, conversationId = 'default', conversationHistory = [] } = req.body || {};
        console.log("💬 Extracted data:", { message, conversationId, historyLength: conversationHistory.length });

        if (!message?.trim()) {
            console.error("❌ No message provided in body");
            return res.status(400).json({ error: "Message is required" });
        }

        // Clean up memory periodically
        cleanupMemory();

        // Store conversation history in memory
        conversationMemory.set(conversationId, conversationHistory);

        // Generate contextual meta-reference (if appropriate)
        const metaRef = Math.random() < 0.3 ? generateMetaReference(conversationHistory) : "";

        // Check for pattern matches and recent discussions
        let matchedPattern = null;
        for (const qa of KNOWLEDGE_BASE.expected_qa) {
            const hasKeywords = qa.keywords.some(keyword => 
                message.toLowerCase().includes(keyword.toLowerCase())
            );
            
            if (hasKeywords && !wasRecentlyDiscussed(conversationHistory, qa.keywords)) {
                matchedPattern = qa;
                break;
            }
        }

        // Build conversation context
        const conversationContext = conversationHistory.length > 0 ? 
            `CONVERSATION HISTORY (last ${Math.min(conversationHistory.length, 5)} messages):
${conversationHistory.slice(-5).map(msg => `${msg.sender.toUpperCase()}: ${msg.text}`).join('\n')}
---` : '';

        const contextualMessage = `
KNOWLEDGE BASE:
${JSON.stringify(KNOWLEDGE_BASE)}

${conversationContext}

USER MESSAGE: "${message}"

${metaRef ? `SUGGESTED META-REFERENCE (use only if contextually appropriate): "${metaRef}"` : ''}

${matchedPattern ? `
MATCHED PATTERN:
Context: ${matchedPattern.context}
Twist: ${matchedPattern.twist}
INSTRUCTION: Use this information but present it in a fresh way, different from previous responses.
` : ''}

INSTRUCTION: 
- Provide a helpful, engaging response about Altyeb
- Avoid repeating information or phrases from recent conversation history
- Use the meta-reference only if it adds value to your response
- Keep your unique personality while staying professional
- If you've discussed this topic before, acknowledge it and provide new insights or angles
        `;

        console.log("🚀 Sending request to Groq API...");
        const aiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: contextualMessage }
                ],
                temperature: 0.7,
                max_tokens: 500,
                top_p: 0.9,
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

        const reply = data.choices?.[0]?.message?.content?.trim() || "(No response from AI)";
        console.log("💡 Extracted reply:", reply);

        res.status(200).json({ reply });
    } catch (err) {
        console.error("💥 Serverless function error:", err);
        res.status(500).json({ error: err.message });
    }
}