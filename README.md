# AI Resume Analyzer

## Overview

The AI Resume Analyzer is a full-stack web application that analyzes resumes and provides structured feedback using AI-inspired rule-based logic.

It evaluates resumes based on:

- Skills
- Experience
- Projects
- Job relevance

It generates a detailed ATS-style report including scoring, strengths, weaknesses, missing skills, suggestions, and visual analytics.

It also supports job description matching, section-wise scoring, keyword highlighting, and PDF report generation.

---

# Features

- Resume upload (PDF)
- AI-inspired rule-based analysis
- Job description matching
- Overall ATS score (0–100)
- Section-wise scoring (Skills, Experience, Projects, etc.)
- Key strengths detection
- Areas for improvement
- Missing skills identification
- Improvement suggestions
- Progress bar visualization
- Keyword highlighting (ATS keywords detection)
- Download analysis as PDF report

---

# Setup Instructions

## 1. Clone the project

```bash
git clone <your-repo-link>
cd resume-analyzer
2. Backend Setup
cd backend
npm install
Create .env file
OPENAI_API_KEY=your_api_key_here
Run backend
node index.js

Backend runs at:
http://localhost:5000

3. Frontend Setup
cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

Architecture / Flow

Frontend (React)
→ User uploads resume + optional job description
→ Backend (Node.js + Express)
→ PDF parsed using pdf-parse
→ Text processed using rule-based logic
→ Resume analyzed and structured JSON response generated
→ Frontend renders ATS-style dashboard report

AI / Logic System
Initial Approach (AI Model)

You are a resume analyzer.

Return ONLY valid JSON:

{
"score": 0-100,
"summary": "",
"strengths": [],
"weaknesses": [],
"missing_skills": [],
"suggestions": []
}

Final Approach (Rule-Based System)

Due to API limitations, a fallback system is used:

Keyword detection (JavaScript, React, Node.js, Python, etc.)
Experience detection
Project analysis
Resume length evaluation
Job description matching
Section-wise scoring engine
Example Output

{
"score": 75,
"section_scores": {
"skills": 60,
"experience": 80,
"projects": 80
},
"summary": "Candidate evaluated based on technical skills, experience, and job relevance.",
"strengths": [
"Has knowledge of python",
"Has knowledge of sql",
"Includes project experience",
"Has internship/work experience",
"Uses measurable achievements",
"Good amount of content provided"
],
"weaknesses": [
"Low number of technical skills detected"
],
"missing_skills": [
"javascript",
"react",
"node",
"java"
],
"suggestions": [
"Improve resume formatting",
"Add more technical keywords",
"Include measurable achievements",
"Learn: javascript, react, node"
],
"job_match": "33% match with job description"
}

What Worked Well
Resume upload and parsing works reliably
Structured JSON output is consistent
ATS-style dashboard UI
Dynamic scoring system
Job matching improves relevance
Works without external AI API
PDF report generation
Keyword highlighting system
Limitations
OpenAI API quota limitations (if enabled)
Some variability in PDF parsing
Rule-based scoring is approximate (not true AI)
Similar resumes may produce similar results
Assumptions
Resume is in PDF format
Text is extractable using pdf-parse
Rule-based scoring is sufficient for demo/portfolio use
Job description input is optional
Tech Stack
React.js (Frontend)
Node.js + Express (Backend)
pdf-parse (PDF extraction)
OpenAI API (optional)
Custom rule-based engine
Future Improvements
AI-powered resume rewriting
Advanced ATS scoring model (ML-based)
Modern dashboard UI with charts
Resume keyword heatmap
User authentication
Save/download history
Final Note

This project demonstrates a complete ATS-style Resume Analyzer with:

AI-inspired scoring logic
Real-time resume evaluation
Interactive dashboard UI
PDF export functionality
Keyword intelligence system