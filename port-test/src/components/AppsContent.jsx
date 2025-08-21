import React, { useEffect, useRef, useState } from "react";
import profile from '../assets/altyeb.jpg'
import { icons } from '../assets/icons';
import { AppsIC } from '../assets/icons';




export const VsCode = () => {
    const [activeTab, setActiveTab] = useState('App.jsx');

    const files = {
        'App.jsx': {
            content: `import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectCard from './components/ProjectCard';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch portfolio projects
    fetchProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="app">
      <header className="hero-section">
        <h1>Altyeb Abdaljalil</h1>
        <p>Full Stack & AI Developer</p>
        <div className="tech-stack">
          <span>React</span>
          <span>Python</span>
          <span>Kotlin</span>
          <span>AI/ML</span>
        </div>
      </header>
      
      <main className="projects-section">
        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : (
          <div className="project-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;`,
            modified: true,
            color: 'text-yellow-400'
        },
        'ProjectCard.jsx': {
            content: `import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card" onClick={() => window.open(project.link)}>
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.github}>GitHub</a>
          <a href={project.live}>Live Demo</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;`,
            modified: false,
            color: 'text-blue-400'
        },
        'App.css': {
            content: `.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.tech-stack {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.tech-stack span {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
}

.project-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
}`,
            modified: false,
            color: 'text-purple-400'
        }
    };

    const renderCodeWithSyntax = (code) => {
        return code.split('\n').map((line, index) => (
            <div key={index} className="flex">
                <span className="text-gray-500 text-xs w-8 text-right mr-4">{index + 1}</span>
                <span className="flex-1" dangerouslySetInnerHTML={{
                    __html: line
                        .replace(/import|export|from|default|const|let|var|function|return|if|else/g, '<span class="text-purple-400">$&</span>')
                        .replace(/'[^']*'/g, '<span class="text-green-400">$&</span>')
                        .replace(/\/\/.*$/g, '<span class="text-gray-500">$&</span>')
                        .replace(/useState|useEffect|React/g, '<span class="text-blue-400">$&</span>')
                        .replace(/className|src|alt|key|onClick/g, '<span class="text-yellow-400">$&</span>')
                        .replace(/<[^>]*>/g, '<span class="text-red-400">$&</span>')
                }} />
            </div>
        ));
    };

    return (
        <div className="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700 flex flex-col text-sm text-gray-300 font-mono">
            {/* Title bar */}
            <div className="h-8 flex items-center bg-[#333] text-gray-200 px-3 justify-center">
                <span className="text-xs">{activeTab} — Portfolio Project</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#252526] p-2 overflow-auto">
                    <div className="text-gray-400 text-xs mb-2 uppercase tracking-wide">Explorer</div>
                    <ul className="space-y-1">
                        <li className="text-gray-300">📂 portfolio-website</li>
                        <li className="ml-4 text-gray-300">📂 src</li>
                        <li
                            className={`ml-8 cursor-pointer hover:bg-gray-700 px-1 rounded ${activeTab === 'App.jsx' ? 'bg-[#1e1e1e] text-white' : files['App.jsx'].color}`}
                            onClick={() => setActiveTab('App.jsx')}
                        >
                            📄 App.jsx {files['App.jsx'].modified && <span className="text-orange-400">●</span>}
                        </li>
                        <li className="ml-8 text-gray-300">📂 components</li>
                        <li
                            className={`ml-12 cursor-pointer hover:bg-gray-700 px-1 rounded ${activeTab === 'ProjectCard.jsx' ? 'bg-[#1e1e1e] text-white' : files['ProjectCard.jsx'].color}`}
                            onClick={() => setActiveTab('ProjectCard.jsx')}
                        >
                            📄 ProjectCard.jsx
                        </li>
                        <li className="ml-8 text-gray-300">📂 styles</li>
                        <li
                            className={`ml-12 cursor-pointer hover:bg-gray-700 px-1 rounded ${activeTab === 'App.css' ? 'bg-[#1e1e1e] text-white' : files['App.css'].color}`}
                            onClick={() => setActiveTab('App.css')}
                        >
                            📄 App.css
                        </li>
                        <li className="ml-4 text-gray-300">📂 public</li>
                        <li className="ml-8 text-gray-400">📄 index.html</li>
                        <li className="text-gray-300">📄 package.json</li>
                        <li className="text-gray-300">📄 README.md</li>
                    </ul>
                </div>

                {/* Main editor */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] min-w-0">
                    {/* Open tabs */}
                    <div className="flex bg-[#252526] text-gray-200 border-b border-gray-700">
                        {Object.keys(files).map(filename => (
                            <div
                                key={filename}
                                className={`px-4 py-2 text-xs cursor-pointer border-r border-gray-700 ${activeTab === filename
                                    ? 'bg-[#1e1e1e] border-t-2 border-blue-500 text-white'
                                    : 'hover:bg-[#333]'
                                    }`}
                                onClick={() => setActiveTab(filename)}
                            >
                                {filename} {files[filename].modified && <span className="text-orange-400">●</span>}
                            </div>
                        ))}
                    </div>

                    {/* Code area */}
                    <div className="flex-1 p-4 leading-6 overflow-auto bg-[#1e1e1e]">
                        <div className="whitespace-pre font-mono text-sm">
                            {renderCodeWithSyntax(files[activeTab].content)}
                        </div>
                    </div>

                    {/* Terminal */}
                    <div className="h-24 bg-[#1e1e1e] border-t border-gray-700 p-2 text-xs overflow-auto">
                        <div className="text-blue-400">$ npm start</div>
                        <div className="text-gray-400">Starting development server...</div>
                        <div className="text-green-400">✓ Compiled successfully!</div>
                        <div className="text-gray-400">Local: http://localhost:3000</div>
                        <div className="text-yellow-400">webpack compiled with 1 warning</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ChromeContent = () => {
    const [activeTab, setActiveTab] = useState('linkedin');

    const tabs = [
        { id: 'linkedin', title: 'LinkedIn - Job Search', favicon: '💼' },
        { id: 'huggingface', title: 'Hugging Face - AI Models', favicon: '🤗' },
        { id: 'threejs', title: 'Three.js - 3D Graphics', favicon: '🎯' },
        { id: 'github', title: 'GitHub - Repositories', favicon: '🐙' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'linkedin':
                return (
                    <div className="flex-1 bg-white overflow-auto">
                        {/* LinkedIn Header */}
                        <div className="h-14 bg-[#0077b5] flex items-center px-6">
                            <div className="text-white font-bold text-xl">in</div>
                            <div className="flex-1 max-w-md mx-6">
                                <input
                                    type="text"
                                    placeholder="Search jobs, people, companies..."
                                    className="w-full h-8 px-3 rounded text-sm"
                                    readOnly
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="text-white text-sm">Home</div>
                                <div className="text-white text-sm">Jobs</div>
                                <div className="text-white text-sm">Network</div>
                            </div>
                        </div>

                        {/* Job Search Results */}
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Full Stack Developer Jobs</h2>
                            <div className="space-y-4">
                                {[
                                    { company: 'Tech Innovators LLC', role: 'Senior Full Stack Developer', location: 'Dubai, UAE', posted: '2 days ago' },
                                    { company: 'AI Solutions Inc', role: 'Full Stack Developer - AI Focus', location: 'Remote', posted: '1 week ago' },
                                    { company: 'Mobile First Co', role: 'Android + Backend Developer', location: 'Abu Dhabi, UAE', posted: '3 days ago' }
                                ].map((job, i) => (
                                    <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-lg text-blue-700">{job.role}</h3>
                                        <p className="text-gray-600">{job.company}</p>
                                        <p className="text-gray-500 text-sm">{job.location} • {job.posted}</p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">React</span>
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Python</span>
                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">AI/ML</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'huggingface':
                return (
                    <div className="flex-1 bg-gradient-to-br from-yellow-50 to-orange-50 overflow-auto">
                        <div className="h-16 bg-white border-b flex items-center px-6">
                            <div className="text-2xl">🤗</div>
                            <div className="ml-3 font-bold text-xl">Hugging Face</div>
                            <div className="flex-1 max-w-lg mx-6">
                                <input
                                    type="text"
                                    placeholder="Search models, datasets, spaces..."
                                    className="w-full h-10 px-4 border rounded-lg"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Popular Models for Developers</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: 'CodeLlama-7B', desc: 'Code generation and completion', downloads: '2.1M' },
                                    { name: 'BERT-base', desc: 'Text classification and NLP', downloads: '5.3M' },
                                    { name: 'Whisper-large', desc: 'Speech recognition model', downloads: '1.8M' },
                                    { name: 'GPT-2', desc: 'Text generation model', downloads: '3.2M' }
                                ].map((model, i) => (
                                    <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                                        <h3 className="font-semibold text-orange-600">{model.name}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{model.desc}</p>
                                        <p className="text-gray-500 text-xs mt-2">↓ {model.downloads} downloads</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'threejs':
                return (
                    <div className="flex-1 bg-black overflow-auto">
                        <div className="h-16 bg-gray-900 flex items-center px-6 border-b border-gray-700">
                            <div className="text-white font-bold text-xl">three.js</div>
                            <div className="ml-6 text-gray-300">JavaScript 3D Library</div>
                        </div>

                        <div className="p-6 text-white">
                            <h2 className="text-2xl font-bold mb-6 text-center">Featured Examples</h2>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { title: 'WebGL Earth', desc: '3D globe with realistic textures' },
                                    { title: 'Particle System', desc: 'Interactive particle animations' },
                                    { title: 'Physics Simulation', desc: 'Real-time physics engine demo' },
                                    { title: 'VR Experience', desc: 'Virtual reality web application' }
                                ].map((demo, i) => (
                                    <div key={i} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                                        <div className="w-full h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-3 flex items-center justify-center">
                                            <div className="text-white text-2xl">🎯</div>
                                        </div>
                                        <h3 className="font-semibold text-green-400">{demo.title}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{demo.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex-1 bg-gray-900 flex items-center justify-center text-white">
                        <div className="text-center">
                            <div className="text-4xl mb-4">🐙</div>
                            <h2 className="text-xl">GitHub</h2>
                            <p className="text-gray-400">Where developers collaborate</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-full bg-[#2b2f3a] flex flex-col">
            {/* Chrome Header */}
            <div className="h-12 bg-[#202124] flex items-center px-3 gap-3">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 text-white text-xs">←</div>
                </div>
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 text-white text-xs">→</div>
                </div>
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 text-white text-xs">↻</div>
                </div>
                <input
                    type="text"
                    value="https://linkedin.com/jobs/search"
                    readOnly
                    className="flex-1 h-8 bg-[#3c4043] text-gray-300 text-sm px-3 rounded-full outline-none"
                />
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    A
                </div>
            </div>

            {/* Tab Bar */}
            <div className="h-10 bg-[#323639] flex items-end">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`h-8 px-4 flex items-center gap-2 text-sm cursor-pointer transition-colors ${activeTab === tab.id
                            ? 'bg-white text-gray-800 rounded-t-lg'
                            : 'text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        <span className="text-xs">{tab.favicon}</span>
                        <span className="truncate max-w-32">{tab.title}</span>
                        {activeTab === tab.id && (
                            <div className="w-4 h-4 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded">
                                ×
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex-1" />
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
};


export const CVApp = () => {
    const [selectedSection, setSelectedSection] = useState('summary');

    const sections = [
        { id: 'summary', icon: AppsIC.info, label: 'Summary' },
        { id: 'experience', icon: AppsIC.exp, label: 'Experience' },
        { id: 'projects', icon: AppsIC.projects, label: 'Projects' },
        { id: 'skills', icon: AppsIC.skills, label: 'Skills' },
        { id: 'education', icon: AppsIC.edu, label: 'Education' }
    ];

    const renderSectionContent = () => {
        switch (selectedSection) {
            case 'summary':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>👤</span> Professional Summary
                        </h2>
                        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                            <p className="text-gray-700 leading-relaxed">
                                Full Stack & Android Developer with expertise in AI-enhanced applications, semantic search,
                                and modern UI/UX design. Passionate about creating intelligent, user-centric solutions that
                                bridge the gap between complex AI capabilities and intuitive user experiences.
                                Skilled at delivering scalable, maintainable solutions for mobile and web platforms.
                            </p>
                        </div>
                    </div>
                );

            case 'experience':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>💼</span> Professional Experience
                        </h2>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "MindMesh – AI-Enhanced Notes App",
                                    period: "2025 – Present",
                                    achievements: [
                                        "Implemented offline AI features with ONNX and Jetpack Compose",
                                        "Designed semantic linking, multi-select, and intelligent filtering features",
                                        "Achieved 40% improvement in user productivity through AI-powered insights"
                                    ]
                                },
                                {
                                    title: "Cold Email Generator – LangChain Project",
                                    period: "2024",
                                    achievements: [
                                        "Developed job description scraper with AI-powered tailored email generation",
                                        "Integrated ChromaDB for fast portfolio link retrieval",
                                        "Automated outreach process resulting in 60% higher response rates"
                                    ]
                                }
                            ].map((job, i) => (
                                <div key={i} className="border-l-4 border-green-500 pl-6 bg-green-50 p-4 rounded-r-lg">
                                    <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                                    <p className="text-green-600 font-medium mb-3">{job.period}</p>
                                    <ul className="space-y-2">
                                        {job.achievements.map((achievement, j) => (
                                            <li key={j} className="flex items-start gap-2 text-gray-700">
                                                <span className="text-green-500 font-bold">▸</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'projects':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>🚀</span> Featured Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: "Notephiny", desc: "Local AI-powered note app with semantic search", tech: ["Kotlin", "ONNX", "ML"] },
                                { name: "Todo AI", desc: "Intelligent task extraction from natural language", tech: ["Python", "NLP", "FastAPI"] },
                                { name: "3D Portfolio", desc: "Interactive showcase built with React Three Fiber", tech: ["React", "Three.js", "WebGL"] },
                                { name: "MindMesh", desc: "Cross-platform knowledge management system", tech: ["Compose", "AI", "Vector DB"] }
                            ].map((project, i) => (
                                <div key={i} className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-semibold text-purple-800">{project.name}</h3>
                                    <p className="text-gray-600 text-sm mt-2 mb-3">{project.desc}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tech.map((tech, j) => (
                                            <span key={j} className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'skills':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>⚡</span> Technical Skills
                        </h2>
                        <div className="space-y-6">
                            {[
                                { category: "Frontend", skills: ["React", "Jetpack Compose", "Three.js", "TypeScript", "Tailwind CSS"], color: "blue" },
                                { category: "Backend", skills: ["Python", "FastAPI", "Node.js", "MongoDB", "SQL", "Vector Databases"], color: "green" },
                                { category: "Mobile", skills: ["Android (Kotlin)", "Jetpack Compose", "ONNX Runtime", "Room DB"], color: "orange" },
                                { category: "AI/ML", skills: ["LangChain", "ChromaDB", "ONNX", "Transformers", "Semantic Search"], color: "purple" }
                            ].map((skillGroup, i) => (
                                <div key={i} className={`bg-${skillGroup.color}-50 p-4 rounded-lg border border-${skillGroup.color}-200`}>
                                    <h3 className={`text-lg font-semibold text-${skillGroup.color}-800 mb-3`}>{skillGroup.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.skills.map((skill, j) => (
                                            <span key={j} className={`bg-${skillGroup.color}-200 text-${skillGroup.color}-800 px-3 py-1 rounded-full text-sm`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'education':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>🎓</span> Education & Certifications
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                                <h3 className="text-xl font-semibold text-gray-800">MST College</h3>
                                <p className="text-yellow-600 font-medium">2017 – 2021</p>
                                <p className="text-gray-700 mt-2">
                                    Triple Diploma in Web Development, Web Design, and Android Development
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">Web Development</span>
                                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">UI/UX Design</span>
                                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">Android Development</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 mb-2">Continuous Learning</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• AI/ML Specialization - Self-directed</li>
                                    <li>• Advanced Android Development - Google</li>
                                    <li>• React Three Fiber - Self-directed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col font-sans text-gray-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center ">
                    <img className="rounded-full h-24 w-24" src={profile} alt="" />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">Altyeb Abdaljalil</h1>
                    <p className="text-blue-100 text-lg mt-1">Full Stack & Android Developer</p>
                    <div className="flex gap-6 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                            <span>📧</span> altyeb.404@gmail.com
                        </div>
                        <div className="flex items-center gap-1">
                            <span>📱</span> +971-XXX-XXXX
                        </div>
                        <div className="flex items-center gap-1">
                            <span>📍</span> Cairo, Egypt
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-64 bg-white border-r border-gray-200 overflow-auto">
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                            Resume Sections
                        </h3>
                        <nav className="space-y-2">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setSelectedSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${selectedSection === section.id
                                            ? 'bg-blue-100 text-blue-700 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="bg-zinc-700 rounded-lg p-2"><img className="w-6 h-6" src={section.icon} alt="" /></div>
                                    {section.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto p-8">
                    {renderSectionContent()}
                </div>
            </div>
        </div>
    );
};


export const PyCharmApp = () => (
    <div className="w-full h-full bg-[#1e1e1e] text-gray-200 font-mono text-sm flex rounded-lg overflow-hidden border border-gray-700">

        {/* Sidebar */}
        <div className="w-64 bg-[#252526] flex flex-col border-r border-[#333]">
            <div className="flex items-center px-4 py-3 border-b border-[#333] text-gray-400 text-xs">
                Project
            </div>
            <div className="flex-1 overflow-auto text-xs leading-relaxed">
                <ul className="px-4 py-2 space-y-1">
                    <li className="text-gray-300">📁 cold-email-generator</li>
                    <ul className="ml-4">
                        <li>📁 app</li>
                        <ul className="ml-4">
                            <li>📁 resource</li>
                            <ul className="ml-4">
                                <li>📄 chains.py</li>
                                <li>📄 main.py</li>
                                <li>📄 portfolio.py</li>
                                <li>📄 utils.py</li>
                            </ul>
                        </ul>
                        <li>📄 README.md</li>
                        <li>📄 requirements.txt</li>
                        <li>📄 tutorial_chromadb.ipynb</li>
                    </ul>
                </ul>
            </div>
        </div>

        {/* Main Code Editor */}
        <div className="flex-1 flex flex-col">
            {/* File Tabs */}
            <div className="bg-[#2d2d2d] flex items-center border-b border-[#333] text-xs">
                <div className="px-4 py-2 bg-[#1e1e1e] border-r border-[#333] text-gray-100">
                    chains.py
                </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 overflow-auto p-4">
                <pre className="text-[13px] leading-5 whitespace-pre overflow-auto">
                    <code>
                        {`import os
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
from dotenv import load_dotenv

load_dotenv()

class Chain:
    def __init__(self):
        self.llm = ChatGroq(temperature=0, groq_api_key=os.getenv("GROQ_API_KEY"), model_name="llama-3.1-70b-versatile")

    def extract_jobs(self, cleaned_text):
        prompt_extract = PromptTemplate.from_template(
            """
            ### SCRAPED TEXT FROM WEBSITE:
            {page_data}
            ### INSTRUCTION:
            The scraped text is from the career's page of a website.
            Your job is to extract the job postings and return them in JSON format 
            containing the following keys: 'role', 'experience', 'location'.
            Only return the valid JSON.
            ### VALID JSON (NO PREAMBLE):
            """
        )

        chain_extract = prompt_extract | self.llm
        res = chain_extract.invoke(input={"page_data": cleaned_text})
        try:
            json_parser = JsonOutputParser()
            res = json_parser.parse(res.content)
        except OutputParserException:
            raise OutputParserException("Context too big. Unable to parse jobs.")
        return res
`}
                    </code>
                </pre>
            </div>
        </div>
    </div>
);

export const FileExplorerApp = () => (
    <div className="w-full h-full bg-[#1e1e1e] text-gray-200 flex flex-col font-sans text-sm rounded-lg overflow-hidden border border-gray-700">

        {/* Top Navigation */}
        <div className="bg-[#2b2b2b] flex items-center px-3 py-1 border-b border-[#333]">
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-1">
                <div className="p-1 hover:bg-[#3a3a3a] rounded"><img className="w-5 h-5" src={icons.arleft} alt="navigate back" /></div>
                <div className="p-1 hover:bg-[#3a3a3a] rounded"><img className="w-5 h-5" src={icons.arRight} alt="navigate forward" /></div>
                <div className="p-1 hover:bg-[#3a3a3a] rounded"><img className="w-5 h-5" src={icons.arup} alt="return" /></div>
            </div>

            {/* Address Bar */}
            <div className="flex-1 mx-2 bg-[#1e1e1e] rounded border border-[#444] px-3 py-1 flex items-center">
                <span className="text-gray-400">This PC</span>
            </div>

            {/* Search */}
            <div className="bg-[#1e1e1e] rounded border border-[#444] px-2 py-1 flex items-center">
                <input
                    type="text"
                    placeholder="Search This PC"
                    className="bg-transparent outline-none text-gray-200 placeholder-gray-500 text-sm w-32"
                />
            </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-52 bg-[#252526] border-r border-[#333] overflow-auto">
                <ul className="text-sm">
                    <li className="px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer">🏠 Home</li>
                    <li className="px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer">🖼 Gallery</li>
                    <li className="px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer">☁️ OneDrive</li>
                    <li className="px-3 py-2 bg-[#3a3a3a] cursor-pointer">💻 This PC</li>
                    <ul className="ml-4">
                        <li className="px-3 py-1 hover:bg-[#3a3a3a] cursor-pointer">💾 Local Disk (C:)</li>
                        <li className="px-3 py-1 hover:bg-[#3a3a3a] cursor-pointer">💾 New Volume (D:)</li>
                    </ul>
                    <li className="px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer">🌐 Network</li>
                    <li className="px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer">🐧 Linux</li>
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-1 bg-[#1e1e1e] p-4 overflow-auto">
                {/* Devices and drives */}
                <h2 className="text-gray-300 mb-3 text-sm font-semibold">Devices and drives</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Local Disk C */}
                    <div className="border border-[#444] rounded p-3 hover:border-blue-400 cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 hover:bg-gray-400/35 rounded"><img className="h-10 w-10 p-0.5" src={icons.hdd} alt="" /></div>
                            <span className="text-gray-200 text-sm">Local Disk (C:)</span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-700 rounded overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: "12%" }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">29.8 GB free of 237 GB</div>
                    </div>

                    {/* New Volume D */}
                    <div className="border border-[#444] rounded p-3 hover:border-blue-400 cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded hover:bg-gray-400/35"><img className="h-10 w-10 p-0.5" src={icons.hdd} alt="" /></div>
                            <span className="text-gray-200 text-sm">New Volume (D:)</span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-700 rounded overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: "52%" }}></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">104 GB free of 201 GB</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const RecycleBinApp = () => (
    <div className="w-full h-full bg-[#1e1e1e] text-gray-200 flex flex-col rounded-lg overflow-hidden border border-gray-700">

        {/* Top Navigation */}
        <div className="bg-[#2b2b2b] flex items-center px-3 py-1 border-b border-[#333]">
            <div className="flex items-center space-x-1">
                <div className="p-1 hover:bg-[#3a3a3a] rounded"><img className="w-5 h-5" src={icons.arleft} alt="navigate back" /></div>
                <div className="p-1 hover:bg-[#3a3a3a] rounded"><img className="w-5 h-5" src={icons.arRight} alt="navigate forward" /></div>
                <div className="p-1 hover:bg-[#3a3a3a] rounded"><img className="w-5 h-5" src={icons.arup} alt="return" /></div>
            </div>

            {/* Address Bar */}
            <div className="flex-1 mx-2 bg-[#1e1e1e] rounded border border-[#444] px-3 py-1 flex items-center">
                <span className="text-gray-400">Recycle Bin</span>
            </div>

            {/* Search */}
            <div className="bg-[#1e1e1e] rounded border border-[#444] px-2 py-1 flex items-center">
                <input
                    type="text"
                    placeholder="Search Recycle Bin"
                    className="bg-transparent outline-none text-gray-200 placeholder-gray-500 text-sm w-40"
                />
            </div>
        </div>

        {/* Toolbar */}
        <div className="bg-[#252526] px-3 py-2 flex items-center space-x-4 border-b border-[#333] text-sm">
            <button className="px-3 py-1 bg-[#3a3a3a] rounded hover:bg-[#4a4a4a]">🗑 Empty Recycle Bin</button>
            <button className="px-3 py-1 bg-[#3a3a3a] rounded hover:bg-[#4a4a4a]">♻ Restore Selected</button>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto">
            <table className="w-full text-xs">
                <thead className="bg-[#252526] text-gray-400 border-b border-[#333]">
                    <tr>
                        <th className="text-left px-4 py-2">Name</th>
                        <th className="text-left px-4 py-2">Date Deleted</th>
                        <th className="text-left px-4 py-2">Original Location</th>
                        <th className="text-left px-4 py-2">Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-[#2f2f2f] border-b border-[#333]">
                        <td className="px-4 py-2 flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gray-500 rounded"></div>
                            <span>old_document.txt</span>
                        </td>
                        <td className="px-4 py-2 text-gray-400">Aug 10, 2025</td>
                        <td className="px-4 py-2 text-gray-400">C:\Users\Altyeb\Documents</td>
                        <td className="px-4 py-2 text-gray-400">15 KB</td>
                    </tr>
                    <tr className="hover:bg-[#2f2f2f] border-b border-[#333]">
                        <td className="px-4 py-2 flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gray-500 rounded"></div>
                            <span>photo.png</span>
                        </td>
                        <td className="px-4 py-2 text-gray-400">Aug 8, 2025</td>
                        <td className="px-4 py-2 text-gray-400">D:\Projects\AI</td>
                        <td className="px-4 py-2 text-gray-400">2.4 MB</td>
                    </tr>
                    <tr className="hover:bg-[#2f2f2f] border-b border-[#333]">
                        <td className="px-4 py-2 flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gray-500 rounded"></div>
                            <span>model_checkpoints.zip</span>
                        </td>
                        <td className="px-4 py-2 text-gray-400">Aug 1, 2025</td>
                        <td className="px-4 py-2 text-gray-400">C:\AI\Experiments</td>
                        <td className="px-4 py-2 text-gray-400">512 MB</td>
                    </tr>
                    <tr className="hover:bg-[#2f2f2f] border-b border-[#333]">
                        <td className="px-4 py-2 flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gray-500 rounded"></div>
                            <span>MNIST.zip</span>
                        </td>
                        <td className="px-4 py-2 text-gray-400">Aug 1, 2025</td>
                        <td className="px-4 py-2 text-gray-400">C:\AI\Experiments</td>
                        <td className="px-4 py-2 text-gray-400">1.1 GB</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export const TeamsApp = () => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, user: 'Sarah Chen', message: 'Hey team! Just pushed the latest updates to the AI model training pipeline 🚀', time: '2:30 PM', avatar: 'S' },
        { id: 2, user: 'Ahmed Hassan', message: 'Great work! The accuracy improvements are impressive. What optimizer did you use?', time: '2:32 PM', avatar: 'A' },
        { id: 3, user: 'Sarah Chen', message: 'AdamW with a custom learning rate scheduler. Also implemented early stopping to prevent overfitting.', time: '2:33 PM', avatar: 'S' },
        { id: 4, user: 'Dev Lead', message: '@everyone Code review session at 4 PM. We\'ll go through the new semantic search implementation.', time: '2:45 PM', avatar: 'D' },
        { id: 5, user: 'You', message: 'Excited to share my progress on the mobile AI integration! Would love to get your feedback 💡', time: '2:47 PM', avatar: 'Y', isMe: true }
    ]);

    const teams = [
        { name: '🤖 AI Research Team', active: true, unread: 3 },
        { name: '📱 Mobile Development', active: false, unread: 0 },
        { name: '🎯 Product Strategy', active: false, unread: 1 },
        { name: '🚀 Innovation Lab', active: false, unread: 0 }
    ];

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                id: messages.length + 1,
                user: 'You',
                message: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                avatar: 'Y',
                isMe: true
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="w-full h-full bg-[#18191c] rounded-lg overflow-hidden border border-gray-700 flex font-sans text-sm text-gray-200">
            {/* Left sidebar */}
            <div className="w-16 bg-[#202225] flex flex-col items-center py-4 space-y-3 border-r border-gray-800">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    A
                </div>
                <div className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center cursor-pointer transition-colors">
                    <img className="w-5 h-5 hover:scale-110" src={AppsIC.chat} alt="" />
                </div>
                <div className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center cursor-pointer transition-colors">
                    <img className="w-5 h-5 hover:scale-110" src={AppsIC.group} alt="" />
                </div>
                <div className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center cursor-pointer transition-colors">
                    <img className="w-5 h-5 hover:scale-110" src={AppsIC.calender} alt="" />
                </div>
                <div className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center cursor-pointer transition-colors">
                    <img className="w-5 h-5 hover:scale-110" src={AppsIC.tmFolder} alt="" />
                </div>
                <div className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center cursor-pointer transition-colors">
                    <img className="w-5 h-5 hover:scale-110" src={AppsIC.tmSettings} alt="" />
                </div>
            </div>

            {/* Teams list */}
            <div className="w-72 bg-[#2f3136] flex flex-col border-r border-gray-800">
                <div className="p-4 font-semibold text-lg border-b border-gray-700 bg-[#36393f]">
                    <div className="flex items-center justify-between">
                        <span>Development Teams</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-2">
                    {teams.map((team, index) => (
                        <div
                            key={index}
                            className={`px-3 py-3 mx-1 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between group ${team.active
                                ? 'bg-[#5865f2] text-white shadow-lg'
                                : 'hover:bg-[#40444b] text-gray-300'
                                }`}
                        >
                            <span className="font-medium">{team.name}</span>
                            {team.unread > 0 && (
                                <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {team.unread}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="mt-4 px-3 py-2 text-gray-400 text-xs uppercase tracking-wide font-semibold">
                        Quick Actions
                    </div>
                    <div className="px-3 py-2 mx-1 rounded-lg cursor-pointer hover:bg-[#40444b] text-gray-400 text-sm flex items-center">
                        <span className="mr-2">📊</span> Project Dashboard
                    </div>
                    <div className="px-3 py-2 mx-1 rounded-lg cursor-pointer hover:bg-[#40444b] text-gray-400 text-sm flex items-center">
                        <span className="mr-2">📋</span> Sprint Planning
                    </div>
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-[#36393f] min-w-0">
                {/* Chat header */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-gray-700 bg-[#36393f]">
                    <div className="flex items-center">
                        <span className="font-semibold text-lg">🤖 AI Research Team</span>
                        <div className="ml-3 flex items-center text-gray-400 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>5 members online</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <img className="w-5 h-5 hover:scale-110 transition-transform" src={AppsIC.call} alt="" />
                        <img className="w-5 h-5 hover:scale-110 transition-transform" src={AppsIC.video} alt="" />
                        <img className="w-5 h-5 hover:scale-110 transition-transform" src={AppsIC.group} alt="" />
                    </div>
                </div>

                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-auto space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg ${msg.isMe ? 'order-2' : 'order-1'}`}>
                                {!msg.isMe && (
                                    <div className="flex items-center mb-1">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                                            {msg.avatar}
                                        </div>
                                        <span className="font-semibold text-gray-300">{msg.user}</span>
                                        <span className="text-gray-500 text-xs ml-2">{msg.time}</span>
                                    </div>
                                )}
                                <div className={`inline-block px-4 py-2 rounded-2xl ${msg.isMe
                                    ? 'bg-[#5865f2] text-white ml-8'
                                    : 'bg-[#4f545c] text-gray-100 mr-8'
                                    }`}>
                                    {msg.message}
                                </div>
                                {msg.isMe && (
                                    <div className="text-right text-gray-500 text-xs mt-1 mr-2">{msg.time}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message input */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-end space-x-3">
                        <div className="flex-1 bg-[#40444b] rounded-2xl p-3 focus-within:ring-2 focus-within:ring-[#5865f2] transition-all">
                            <input
                                className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none"
                                placeholder="Share your thoughts with the team..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            className="p-3 bg-[#5865f2] hover:bg-[#4752c4] rounded-2xl transition-colors disabled:opacity-50"
                            disabled={!newMessage.trim()}
                        >
                            <span className="text-white">🚀</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const SpotifyApp = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [currentTime, setCurrentTime] = useState(42);
    const [volume, setVolume] = useState(75);
    const [isShuffled, setIsShuffled] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0: none, 1: all, 2: one
    const audioRef = useRef(null);

    const playlists = [
        "AI Chill Beats",
        "Machine Learning Vibes",
        "Deep Learning Focus",
        "Coding Grooves",
        "Neural Network Sessions",
        "Algorithm Anthems"
    ];

    const tracks = [
        {
            id: 1,
            title: "Neural Lo-Fi",
            artist: "AI Chill Beats",
            duration: 204, // 3:24 in seconds
            album: "AI Chill Beats Vol.1"
        },
        {
            id: 2,
            title: "Backprop Beats",
            artist: "Deep Learning Collective",
            duration: 241, // 4:01
            album: "Gradient Descent"
        },
        {
            id: 3,
            title: "Transformer Groove",
            artist: "Attention Mechanism",
            duration: 177, // 2:57
            album: "Self-Attention"
        },
        {
            id: 4,
            title: "Gradient Descent Chill",
            artist: "Optimization Orchestra",
            duration: 225, // 3:45
            album: "Learning Rate"
        },
        {
            id: 5,
            title: "LSTM Dreams",
            artist: "Recurrent Rhythms",
            duration: 198, // 3:18
            album: "Memory Networks"
        }
    ];

    const currentTrackInfo = tracks[currentTrack];

    useEffect(() => {
        let interval;
        if (isPlaying && currentTime < currentTrackInfo.duration) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= currentTrackInfo.duration) {
                        // Auto advance to next track
                        handleNextTrack();
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentTime, currentTrack]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // Here you would integrate with actual audio file
        // if (audioRef.current) {
        //     if (isPlaying) {
        //         audioRef.current.pause();
        //     } else {
        //         audioRef.current.play();
        //     }
        // }
    };

    const handlePreviousTrack = () => {
        if (currentTime > 10) {
            setCurrentTime(0);
        } else {
            setCurrentTrack(prev => prev === 0 ? tracks.length - 1 : prev - 1);
            setCurrentTime(0);
        }
    };

    const handleNextTrack = () => {
        if (repeatMode === 2) {
            setCurrentTime(0);
        } else {
            setCurrentTrack(prev => {
                if (prev === tracks.length - 1) {
                    return repeatMode === 1 ? 0 : prev;
                }
                return prev + 1;
            });
            setCurrentTime(0);
        }
    };

    const handleTrackSelect = (index) => {
        setCurrentTrack(index);
        setCurrentTime(0);
        setIsPlaying(true);
    };

    const handleProgressClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = Math.floor(percent * currentTrackInfo.duration);
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        setVolume(Math.floor(percent * 100));
    };

    const toggleShuffle = () => setIsShuffled(!isShuffled);
    const toggleRepeat = () => setRepeatMode((prev) => (prev + 1) % 3);

    return (
        <div className="w-full h-full bg-black text-gray-200 flex flex-col rounded-lg overflow-hidden border border-gray-700">
            {/* Hidden audio element for future integration */}
            <audio ref={audioRef} />

            {/* Main Content Area */}
            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div className="w-60 bg-[#121212] flex flex-col border-r border-[#282828]">
                    <div className="px-4 py-4 space-y-4 text-sm font-semibold">
                        <div className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors">
                            <img className="w-4 h-4" src={AppsIC.home} alt="" /> <span>Home</span>
                        </div>
                        <div className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors">
                            <img className="w-4 h-4" src={AppsIC.search} alt="" /> <span>Search</span>
                        </div>
                        <div className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors">
                            <img className="w-4 h-4" src={AppsIC.library} alt="" /> <span>Your Library</span>
                        </div>
                    </div>

                    {/* Playlists */}
                    <div className="flex-1 overflow-auto px-4 py-4 border-t border-[#282828] text-sm space-y-2">
                        <div className="text-gray-400 font-semibold mb-3">Created Playlists</div>
                        {playlists.map((playlist, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer hover:text-white transition-colors p-2 rounded ${index === 0 ? 'text-[#1db954] bg-[#1a1a1a]' : ''
                                    }`}
                            >
                                {playlist}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main View */}
                <div className="flex-1 bg-gradient-to-b from-[#1db954] to-black overflow-auto">
                    {/* Header */}
                    <div className="p-6 text-white">
                        <div className="flex items-end space-x-6">
                            <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
                                <img className="w-8 h-8" src={AppsIC.music} alt="" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider">Playlist</p>
                                <h1 className="text-5xl font-bold mt-2 mb-4">AI Chill Beats</h1>
                                <p className="text-gray-300">Your coding soundtrack • {tracks.length} songs</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <button
                                        onClick={handlePlayPause}
                                        className="w-14 h-14 bg-[#1db954] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                                    >
                                        <span className="text-black text-2xl">
                                            {isPlaying ? <img className="h-6 w-6" src={AppsIC.pause} alt="" /> : <img className="h-6 w-6" src={AppsIC.play} alt="" />}
                                        </span>
                                    </button>
                                    <div className="hover:scale-110 transition-transform"><img className="h-8 w-8" src={AppsIC.fav} alt="" /></div>
                                    <button className="text-2xl hover:scale-110 transition-transform">⋯</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Playlist Tracks */}
                    <div className="px-6 pb-6">
                        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm border-b border-[#282828] pb-2 mb-4">
                            <div className="col-span-1">#</div>
                            <div className="col-span-6">Title</div>
                            <div className="col-span-3">Album</div>
                            <div className="col-span-2 text-right">Duration</div>
                        </div>

                        {tracks.map((track, index) => (
                            <div
                                key={track.id}
                                className={`grid grid-cols-12 gap-4 py-2 px-2 rounded hover:bg-[#282828] cursor-pointer transition-colors group ${currentTrack === index ? 'bg-[#282828] text-[#1db954]' : 'text-gray-300'
                                    }`}
                                onClick={() => handleTrackSelect(index)}
                            >
                                <div className="col-span-1 flex items-center">
                                    {currentTrack === index && isPlaying ? (
                                        <div className="w-4 h-4 flex items-center justify-center">
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-4 bg-[#1db954] animate-pulse"></div>
                                                <div className="w-1 h-2 bg-[#1db954] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-1 h-3 bg-[#1db954] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="group-hover:hidden">{index + 1}</span>
                                    )}
                                    <span className="hidden group-hover:block"><img className="h-6 w-6" src={AppsIC.play} alt="" /></span>
                                </div>
                                <div className="col-span-6">
                                    <div className="font-medium">{track.title}</div>
                                    <div className="text-sm text-gray-400">{track.artist}</div>
                                </div>
                                <div className="col-span-3 text-gray-400">{track.album}</div>
                                <div className="col-span-2 text-right text-gray-400">{formatTime(track.duration)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Now Playing Bar */}
            <div className="h-20 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-4 text-sm">
                {/* Song Info */}
                <div className="flex items-center space-x-3 min-w-0 w-1/4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center text-xl flex-shrink-0">
                        🎵
                    </div>
                    <div className="min-w-0">
                        <div className="text-white truncate">{currentTrackInfo.title}</div>
                        <div className="text-gray-400 text-xs truncate">{currentTrackInfo.artist}</div>
                    </div>
                    <img className="w-7 h-7" src={AppsIC.loved} alt="" />
                </div>

                {/* Playback Controls */}
                <div className="flex flex-col items-center w-2/4 max-w-md">
                    <div className="flex items-center space-x-4 mb-2">
                        <div
                            onClick={toggleShuffle}
                            className={`text-lg hover:scale-110 transition-transform`}
                        >
                            {isShuffled ? <img className="w-5 h-5" src={AppsIC.shuffleOn} alt="" /> : <img className="w-5 h-5" src={AppsIC.shuffleOff} alt="" />}
                        </div>
                        <div
                            onClick={handlePreviousTrack}
                            className="text-2xl hover:scale-110 transition-transform text-white"
                        >
                            <img className="w-5 h-5" src={AppsIC.prev} alt="" />
                        </div>
                        <div
                            onClick={handlePlayPause}
                            className="w-8 h-8 p-2 bg-[#1db954] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            <span className="text-black text-lg">
                                {isPlaying ? <img className="h-6 w-6" src={AppsIC.pause} alt="" /> : <img className="h-6 w-6" src={AppsIC.play} alt="" />}
                            </span>
                        </div>
                        <div
                            onClick={handleNextTrack}
                            className="text-2xl hover:scale-110 transition-transform text-white"
                        >
                            <img className="w-5 h-5" src={AppsIC.next} alt="" />
                        </div>
                        <button
                            onClick={toggleRepeat}
                            className={`text-lg hover:scale-110 transition-transform ${repeatMode === 0 ? 'text-gray-400' : 'text-[#1db954]'
                                }`}
                        >
                            {repeatMode === 2 ? <img className="w-5 h-5" src={AppsIC.repeatOn} alt="" /> : <img className="w-5 h-5" src={AppsIC.repeatOff} alt="" />}
                        </button>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-400 text-xs w-full">
                        <span className="w-10 text-right">{formatTime(currentTime)}</span>
                        <div
                            className="flex-1 h-1 bg-gray-600 rounded cursor-pointer group"
                            onClick={handleProgressClick}
                        >
                            <div
                                className="h-full bg-gray-300 rounded relative group-hover:bg-[#1db954] transition-colors"
                                style={{ width: `${(currentTime / currentTrackInfo.duration) * 100}%` }}
                            >
                                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                        <span className="w-10">{formatTime(currentTrackInfo.duration)}</span>
                    </div>
                </div>

                {/* Volume and Other Controls */}
                <div className="flex items-center space-x-3 w-1/4 justify-end">
                    <img className="w-6 h-6 hover:scale-110 transition-transform" src={AppsIC.devices} alt="" />
                    <div className="flex items-center space-x-2">
                        <img className="w-5 h-5 hover:scale-110 transition-transform" src={AppsIC.soundOn} alt="" />
                        <div
                            className="w-20 h-1 bg-gray-600 rounded cursor-pointer group"
                            onClick={handleVolumeChange}
                        >
                            <div
                                className="h-full bg-gray-300 rounded relative group-hover:bg-[#1db954] transition-colors"
                                style={{ width: `${volume}%` }}
                            >
                                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">⛶</button>
                </div>
            </div>
        </div>
    );
};