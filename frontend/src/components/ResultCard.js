import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function ResultCard({ data }) {
  const [loading, setLoading] = useState(false);

  if (!data || data.error) {
    return <div style={{ color: "red" }}>{data?.error}</div>;
  }

  const keywords = [
    "javascript", "react", "node", "python", "java", "sql",
    "aws", "docker", "mongodb", "express", "html", "css"
  ];

  const highlight = (text = "") => {
    const parts = text.split(new RegExp(`(${keywords.join("|")})`, "gi"));
    return parts.map((part, i) => {
      const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase());
      if (isKeyword) {
        return <span key={i} style={{ background: "#ffe066" }}>{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  // -----------------------------
  // POLISHED PDF (ADDED LOADING + DATE)
  // -----------------------------
  const downloadPDF = () => {
    setLoading(true);

    const input = document.getElementById("resume-report");

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");

      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.setFontSize(12);
      pdf.text("AI Resume Analysis Report", 10, 10);
      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 10, 16);

      pdf.addImage(imgData, "PNG", 0, 20, imgWidth, imgHeight);
      pdf.save("resume-analysis.pdf");

      setLoading(false);
    });
  };

  const cardStyle = {
    background: "white",
    color: "#333",
    padding: "20px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "100%",
    textAlign: "left",
  };

  const sectionTitle = {
    marginBottom: "15px",
    textAlign: "left",
    width: "100%",
  };

  return (
    <div style={{ marginTop: "20px" }}>

      {/* ================= HEADER (POLISH ADDITION) ================= */}
      <div style={{ marginBottom: "10px" }}>
        <h2 style={{ margin: 0 }}>AI Resume Analyzer</h2>
        <p style={{ margin: 0, color: "#666" }}>
          ATS-style resume evaluation report
        </p>
      </div>

      {/* BUTTON (POLISH) */}
      <button
        onClick={downloadPDF}
        disabled={loading}
        style={{
          marginBottom: "15px",
          padding: "10px 18px",
          background: loading ? "#999" : "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {loading ? "Generating PDF..." : "Download PDF Report"}
      </button>

      <div id="resume-report">

        {/* Overall Score */}
        <div style={cardStyle}>
          <h2>Overall Score: {data.score}/100</h2>

          <div style={{
            width: "100%",
            background: "#eee",
            borderRadius: "10px",
            height: "15px",
            marginTop: "8px"
          }}>
            <div
              style={{
                width: `${data.score}%`,
                height: "15px",
                background: data.score > 75 ? "green" : data.score > 50 ? "orange" : "red",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        {/* Section-wise Scores */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Section-wise Scores</h3>
          {Object.entries(data.section_scores || {}).map(([k, v]) => (
            <div key={k} style={{ marginBottom: "10px" }}>
              • <strong>{k}</strong>: {v}/100
            </div>
          ))}
        </div>

        {/* Profile Summary */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Profile Summary</h3>
          <p>{highlight(data.summary || "")}</p>
        </div>

        {/* Key Strengths */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Key Strengths</h3>
          {(data.strengths || []).map((s, i) => (
            <div key={i}>• {highlight(s)}</div>
          ))}
        </div>

        {/* Weaknesses */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Areas for Improvement</h3>
          {(data.weaknesses || []).map((w, i) => (
            <div key={i}>{highlight(w)}</div>
          ))}
        </div>

        {/* Missing Skills */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Missing Skills / Sections</h3>
          {(data.missing_skills || []).map((m, i) => (
            <div key={i}>• {highlight(m)}</div>
          ))}
        </div>

        {/* Suggestions */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Suggestions</h3>
          {(data.suggestions || []).map((s, i) => (
            <div key={i}>• {highlight(s)}</div>
          ))}
        </div>

        {/* Job Match */}
        {data.job_match !== null && (
          <div style={cardStyle}>
            <h3 style={sectionTitle}>Job Match</h3>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>
              {data.job_match}% match with job description
            </p>
          </div>
        )}

      </div>
    </div>
  );
}