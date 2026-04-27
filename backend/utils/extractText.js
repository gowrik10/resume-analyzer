const pdf = require("pdf-parse");

module.exports = async (buffer) => {
  const data = await pdf(buffer);
  return data.text;
};