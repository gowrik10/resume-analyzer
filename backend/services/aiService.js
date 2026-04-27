module.exports = async (resumeText, jobDescription) => {
  const text = resumeText.toLowerCase();
  const jd = (jobDescription || "").toLowerCase();

  let score = 40;

  let strengths = [];
  let weaknesses = [];
  let missing_skills = [];
  let suggestions = [];

  const skills = ["javascript", "react", "node", "python", "java", "sql"];

  let matchedSkills = 0;
  let missingSkillsCount = 0;

  // -------------------------
  // SKILL ANALYSIS
  // -------------------------
  skills.forEach((skill) => {
    if (text.includes(skill)) {
      strengths.push(`Has knowledge of ${skill}`);
      score += 5;

      if (jd.includes(skill)) {
        matchedSkills++;
      }
    } else {
      missing_skills.push(skill);
      missingSkillsCount++;
    }
  });

  // -------------------------
  // PROJECT CHECK
  // -------------------------
  if (text.includes("project")) {
    strengths.push("Includes project experience");
    score += 10;
  } else {
    weaknesses.push("No projects mentioned");
  }

  // -------------------------
  // EXPERIENCE CHECK
  // -------------------------
  if (text.includes("experience") || text.includes("intern")) {
    strengths.push("Has internship/work experience");
    score += 10;
  } else {
    weaknesses.push("No work or internship experience mentioned");
  }

  // -------------------------
  // ACHIEVEMENTS CHECK
  // -------------------------
  if (text.includes("%") || text.includes("improved") || text.includes("increased")) {
    strengths.push("Uses measurable achievements");
    score += 5;
  } else {
    weaknesses.push("Lacks measurable achievements (metrics not found)");
  }

  // -------------------------
  // RESUME LENGTH CHECK
  // -------------------------
  if (resumeText.length < 1500) {
    weaknesses.push("Resume content is too short");
  } else {
    strengths.push("Good amount of content provided");
  }

  // -------------------------
  // SKILL GAP WEAKNESS (IMPORTANT FIX)
  // -------------------------
  if (missingSkillsCount >= 3) {
    weaknesses.push("Low number of technical skills detected");
  }

  // -------------------------
  // JOB MATCH SCORE
  // -------------------------
  let job_match = jd
    ? Math.round((matchedSkills / skills.length) * 100)
    : null;

  // -------------------------
  // SECTION SCORING
  // -------------------------
  const section_scores = {
    skills: Math.min(strengths.length * 10, 100),
    experience: text.includes("experience") ? 80 : 40,
    projects: text.includes("project") ? 80 : 40
  };

  // -------------------------
  // SUGGESTIONS (ALWAYS FILLED)
  // -------------------------
  suggestions.push("Improve resume formatting");
  suggestions.push("Add more technical keywords");
  suggestions.push("Include measurable achievements");

  if (missing_skills.length > 0) {
    suggestions.push("Learn: " + missing_skills.slice(0, 3).join(", "));
  }

  // -------------------------
  // FINAL RESPONSE
  // -------------------------
  return {
    score: Math.min(score, 100),

    summary:
      "Candidate evaluated based on technical skills, experience, and job relevance.",

    strengths,
    weaknesses: weaknesses.length
      ? weaknesses
      : ["No major weaknesses found"],

    missing_skills,
    suggestions,

    job_match,

    section_scores
  };
};