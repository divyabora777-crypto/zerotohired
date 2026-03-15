import { GoogleGenerativeAI } from "@google/generative-ai";

const getApiKey = () => localStorage.getItem('gemini_api_key') || '';

export const generateResumeFromStory = async (story) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });
  
  const prompt = `
You are an expert resume writer and career coach. 
Extract information from the user's story and create 
a professional, ATS-optimized resume. Format as JSON with 
fields: name, email, phone, location, targetRole, summary, 
education, skills, experience, projects, achievements. 
Make bullet points powerful with action verbs and numbers.

Story:
${story}
`;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  // Robust JSON parsing
  try {
    const cleanedText = text.replace(/```json\n?|```/g, '').trim();
    const startIndex = cleanedText.indexOf('{');
    const endIndex = cleanedText.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1) {
       throw new Error("No JSON found in response");
    }
    
    const jsonStr = cleanedText.substring(startIndex, endIndex + 1);
    const parsedData = JSON.parse(jsonStr);
    
    // Auto-save to local history so tools like Roaster know what to roast
    localStorage.setItem('zerotohired_resume_data', JSON.stringify(parsedData));
    
    return parsedData;
  } catch {
    throw new Error("Failed to parse AI response into resume format. The AI might be confused, please try a shorter story.");
  }
};

export const analyzeResumeForAts = async (resumeText, jobDescription = "") => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });
  
  const prompt = `
You are a strict ATS (Applicant Tracking System) algorithm. Evaluate this resume context.
Return ONLY a valid JSON object with the following structure:
{
  "score": <number 0-100>,
  "goodPoints": [<3 strong points>],
  "improvements": [<3 areas to improve>],
  "criticalIssues": [<2 critical flaws>],
  "keywordsHave": [<5 matching keywords found>],
  "keywordsNeed": [<5 industry keywords missing>]
}

${jobDescription ? `Job Description to match against:\n${jobDescription}\n` : ''}
Resume Context:
${resumeText.substring(0, 3000)}
`;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    const jsonStr = text.match(/\{[\s\S]*\}/)[0];
    return JSON.parse(jsonStr);
  } catch {
    throw new Error("Failed to parse ATS response");
  }
};

export const enhanceBullet = async (bullet) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });
  
  const prompt = `Rewrite this resume bullet point to be extremely professional, high-impact, and metrics-driven (if applicable). Use strong action verbs. Return ONLY the edited bullet point text, nothing else.\n\nOriginal: ${bullet}`;
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};

export const roastResume = async (resumeText) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key missing");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });
  
  const prompt = `You are a brutally honest, hilarious, cynical tech recruiter. Roast this resume. Be funny, ruthless, but insightful. Give it to them straight. Keep it under 150 words.\n\nResume Context:\n${resumeText.substring(0, 3000)}`;
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
};
