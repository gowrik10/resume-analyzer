import { useState } from "react";
import { analyzeResume } from "../api";
import ResultCard from "./ResultCard";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a resume");

    const res = await analyzeResume(file, jd);
    setResult(res);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <p>Selected File: {file?.name}</p>

      <textarea
        placeholder="Paste Job Description (optional)"
        rows={5}
        cols={50}
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Analyze Resume</button>

      {result && <ResultCard data={result} />}
    </div>
  );
}