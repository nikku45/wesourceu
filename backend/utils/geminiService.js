// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyBNOOcUST5CJoqu0P1qTUjJ9pEPiGAAb2Y");
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// export async function checkRulesWithGemini(pdfText, rules) {
//   const results = [];

//   for (const rule of rules) {
//     const prompt = `
// You are analyzing a PDF text based on a rule.

// RULE: "${rule}"
// PDF CONTENT:
// ${pdfText}

// Return JSON only:
// {
//   "rule": "...",
//   "status": "pass/fail",
//   "evidence": "...",
//   "reasoning": "...",
//   "confidence": 0-100
// }
//     `;

//     const response = await model.generateContent(prompt);
//     const text = response.response.text();

//     results.push(JSON.parse(text));
//   }

//   return results;
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBNOOcUST5CJoqu0P1qTUjJ9pEPiGAAb2Y");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function checkRulesWithGemini(pdfText, rules) {
  const results = [];

  for (const rule of rules) {
    if(rule=="") continue; // skip empty rules
    const prompt = `
You are an AI that must return STRICT JSON ONLY. 
NO explanations, NO markdown, NO commentary.

Analyze the PDF text for this RULE: "${rule}"

PDF CONTENT:
${pdfText}

Return EXACTLY this JSON:
{
  "rule": "${rule}",
  "status": "pass or fail",
  "evidence": "short sentence from PDF",
  "reasoning": "why pass or fail",
  "confidence": number between 0 and 100
}
`;

    const response = await model.generateContent(prompt);
    let raw = response.response.text();

    // clean markdown
    raw = raw.replace(/```json/g, "")
             .replace(/```/g, "")
             .trim();

    // extract JSON
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("Gemini returned non-JSON:", raw);
      throw new Error("Gemini did not return JSON");
    }

    const json = JSON.parse(match[0]);
    results.push(json);
  }

  return results;
}
