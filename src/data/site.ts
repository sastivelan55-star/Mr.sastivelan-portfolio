// =====================================================
// SINGLE SOURCE OF TRUTH — SOURCED FROM RESUME
// "SASTIVELAN RESUME (3).pdf" dated Oct 2026
// Update this file to change portfolio content.
// =====================================================

export const siteData = {
  profile: {
    name: "Sasti Velan",
    fullName: "Sastivelan N",
    initials: "SN",
    role: "Full-Stack / Backend Developer",
    tagline: "Building backend systems & AI-powered web apps.",
    location: "Chennai / India",
    phone: "+91 8870210105",
    status: [
      "OPEN TO OPPORTUNITIES",
      "BACKEND / FULL-STACK"
    ]
  },

  about: {
    // Exact summary from resume, transformed for presentation
    heroIntro:
      "Computer Science student building web applications, REST APIs and AI-powered systems using Python, Flask, React, Java and Spring Boot.",
    largeText: "I BUILD\nSYSTEMS THAT\nDO SOMETHING.",
    description:
      "I'm Sastivelan N, a Computer Science student focused on backend and full-stack development.\n\nI build web applications and REST APIs using Python, Flask, React, Java, and Spring Boot — with hands-on experience in databases, Git, Docker, and deploying live applications.\n\nLooking for an entry-level opportunity to apply my skills and gain practical industry experience.",
    metadata: {
      focus: ["BACKEND", "FULL-STACK", "AI INTEGRATION"],
      currently: ["BUILDING", "LEARNING", "SHIPPING"]
    }
  },

  socialLinks: {
    github: "https://github.com/sastivelan55-star",
    linkedin: "https://www.linkedin.com/in/sasti-velan-a02416378/"
  },

  contact: {
    email: "sastivelan55@gmail.com",
    availableFor: ["ENTRY-LEVEL ROLES", "INTERNSHIPS", "BACKEND", "FULL-STACK"]
  },

  resume: "/resume.pdf", // Actual file: public/resume.pdf — SASTIVELAN RESUME (3).pdf

  // Exact skills from resume, grouped logically
  skills: [
    // Languages
    { name: "Java",        category: "Language",  description: "Enterprise applications, Spring Boot backend" },
    { name: "Python",      category: "Language",  description: "Backend logic, Flask APIs, ML integrations" },
    { name: "JavaScript",  category: "Language",  description: "Web interactivity, Node scripting" },
    { name: "TypeScript",  category: "Language",  description: "Type-safe frontend with React" },
    { name: "SQL",         category: "Language",  description: "Relational queries, schema design" },
    { name: "HTML",        category: "Language",  description: "Semantic markup, accessibility" },
    { name: "CSS",         category: "Language",  description: "Styling, responsive layout" },
    // Frameworks
    { name: "React.js",    category: "Framework", description: "Component-based UI, SPA architecture" },
    { name: "Flask",       category: "Framework", description: "Lightweight Python REST APIs" },
    { name: "Spring Boot", category: "Framework", description: "Robust Java REST microservices" },
    // Databases
    { name: "MySQL",       category: "Database",  description: "Relational data storage" },
    { name: "PostgreSQL",  category: "Database",  description: "Advanced relational data" },
    { name: "SQLite",      category: "Database",  description: "Lightweight embedded database" },
    // Tools
    { name: "Git",         category: "Tools",     description: "Version control, branching strategy" },
    { name: "Docker",      category: "Tools",     description: "Containerized environments & deployment" },
    { name: "Postman",     category: "Tools",     description: "API testing & documentation" },
    { name: "Vite",        category: "Tools",     description: "Fast frontend build tooling" },
    // Other
    { name: "REST APIs",   category: "Other",     description: "Design, implementation, integration" },
    { name: "Leaflet.js",  category: "Other",     description: "Interactive geospatial mapping" },
    { name: "PWA",         category: "Other",     description: "Progressive web app support" }
  ],

  // Projects in order as they appear in the resume
  projects: [
    {
      id: "clarifyx",
      title: "CLARIFYX",
      subtitle: "AI-BASED DIGITAL THREAT DETECTION",
      description:
        "A cybersecurity web application for analyzing phishing links, suspicious messages, manipulated media, and AI-generated voice indicators. Generates risk scores with supporting details.",
      tech: ["React", "Python", "Flask", "REST APIs", "Cybersecurity"],
      link: "#",
      github: "https://github.com/sastivelan55-star/Clarifyx.git",
      image: "/project3.jpg",
      details: {
        problem:
          "Increasing sophistication of digital threats — phishing links, manipulated media, AI-generated voice — requires accessible, automated detection tools.",
        solution:
          "Built a cybersecurity web application that allows users to submit suspicious content for analysis, returning a risk score and supporting breakdown.",
        architecture:
          "React frontend interfacing with a Python/Flask backend that contains the threat analysis and scoring logic served via REST APIs.",
        features: [
          "Analysis of phishing links and suspicious messages",
          "Detection of manipulated media and AI-generated voice indicators",
          "Risk score generation with supporting details",
          "Clean REST API design"
        ]
      }
    },
    {
      id: "malai-vizhi",
      title: "MALAI VIZHI",
      subtitle: "LANDSLIDE RISK MONITORING & EARLY WARNING",
      description:
        "A web-based landslide risk monitoring platform combining rainfall, soil moisture, terrain/slope, and historical hazard data. Built with PWA support.",
      tech: ["React", "TypeScript", "Python", "Flask", "SQLite", "Leaflet.js", "REST APIs", "PWA"],
      link: "#",
      github: "https://github.com/sastivelan55-star/Malai-vizhi.git",
      image: "/project1.jpg",
      details: {
        problem:
          "Landslide-prone regions lack accessible, real-time monitoring tools that combine multiple environmental data sources for early risk detection.",
        solution:
          "Developed a web platform combining rainfall, soil moisture, terrain/slope, and historical hazard data for real-time risk analysis and early warnings.",
        architecture:
          "React + TypeScript frontend with Leaflet.js maps, consuming RESTful APIs served by a Flask backend performing multi-factor empirical risk analysis. SQLite for local data storage.",
        features: [
          "Interactive geospatial mapping with Leaflet.js",
          "Multi-factor empirical landslide risk analysis",
          "RESTful APIs serving structured geospatial data",
          "Progressive Web App (PWA) support"
        ]
      }
    },
    {
      id: "kizuna",
      title: "KIZUNA",
      subtitle: "AI-ASSISTED TASK MANAGEMENT PLATFORM",
      description:
        "An AI-assisted web application with a Spring Boot backend, PostgreSQL data layer, and Google Gemini AI integration. Includes Dockerized deployment.",
      tech: ["React", "Spring Boot", "PostgreSQL", "Gemini AI API", "Docker", "REST APIs"],
      link: "#",
      github: "https://github.com/sastivelan55-star/kizuna.git",
      image: "/project2.jpg",
      details: {
        problem:
          "Task management tools often lack intelligent assistance. Users need AI-powered support for planning, prioritization, and breakdown of complex goals.",
        solution:
          "Designed and built an AI-assisted task management application integrating Google Gemini AI, with robust error handling for edge cases and service timeouts.",
        architecture:
          "React frontend consuming REST APIs from a Spring Boot application with PostgreSQL as the data layer. Containerized with Docker for consistent deployment.",
        features: [
          "Defined application architecture, database schemas and REST API flows",
          "Integrated Google Gemini AI API for task assistance",
          "Graceful backend error handling for edge cases and timeouts",
          "Dockerized deployment"
        ]
      }
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science (B.Sc. CS)",
      institution: "Rathinam Global University College, Bharathidasan University",
      period: "2026 — 2028",
      details: "CGPA: 8.0 / 80%"
    }
  ],

  certifications: [
    {
      title: "Introduction to Prompt Engineering for Generative AI",
      issuer: "LinkedIn Learning",
      date: "Oct 2026",
      duration: "1 hour 3 minutes",
      skills: ["AI Prompting", "Prompt Engineering", "Generative AI"]
    }
  ],

  languages: ["English", "Tamil"]
};
