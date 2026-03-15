import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const apiKey = process.argv[2];
  if (!apiKey) {
    console.error("API Key required as argument");
    process.exit(1);
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    // Note: The SDK might not expose listModels directly in the same way 
    // depending on the version, but we can try to find a valid model.
    console.log("Checking available models...");
    
    // We can't easily list models without a direct method if the SDK doesn't expose it, 
    // but we can try common names.
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-1.5-flash-8b",
      "gemini-1.0-pro",
      "gemini-2.0-flash-exp",
      "gemini-2.0-flash"
    ];

    for (const m of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        await model.generateContent("test");
        console.log(`[AVAILABLE] ${m}`);
      } catch (e) {
        console.log(`[UNAVAILABLE] ${m}: ${e.message}`);
      }
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
