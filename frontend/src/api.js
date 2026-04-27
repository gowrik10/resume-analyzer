export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  const res = await fetch("http://localhost:5000/api/analyze", {
    method: "POST",
    body: formData
  });

  return res.json();
};