import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { responses } = req.body;
  if (!responses) return res.status(400).json({ error: 'Responses are required' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    console.log(`🚀 API: Extracting skill for: ${responses.skillName}`);

    const prompt = `
      You are an Expert AI Operations Engineer specializing in "Extraction > Invention."
      Your goal is to transform a user's interview responses into a professional SKILL.md for Gemini CLI.
      
      CRITICAL RULES:
      1. **Extraction > Invention**: Do NOT invent procedures. Use ONLY the procedural truth provided by the user.
      2. **No AI Slop**: Do NOT use generic marketing fluff (e.g., "highly effective," "streamline your workflow," "unlock potential"). Keep it professional, brief, and technical.
      3. **Tool Specificity**: If the user mentions a specific tool, command, or file (e.g., "I use grep," "Check the .env file"), the SKILL.md MUST prioritize these.
      4. **Structured Workflow**: Break down the manual process into a clear, numbered sequence.
      5. **Strict Format**: Return ONLY the Markdown content. No preamble, no "Here is your skill."

      --- USER INTERVIEW RESPONSES ---
      Skill Name: ${responses.skillName}
      The Problem: ${responses.problem}
      The Trigger: ${responses.trigger}
      The Manual Process: ${responses.manualProcess}
      The Hammer (Key Tools): ${responses.hammer}
      The Guardrails (Validation): ${responses.guardrails}
      Desired Output: ${responses.output}

      --- REQUIRED STRUCTURE ---
      ---
      name: [hyphen-case-name]
      description: [Concise 1-sentence description including triggers. Use ONLY user info.]
      ---

      # [Skill Name]

      ## Overview
      [A 2-3 sentence summary of what this skill automates and why.]

      ## Workflow
      [The step-by-step logic. Map the user's manual process to AI actions.]

      ## The Hammer
      [List the specific tools, commands, or APIs mentioned by the user as the primary 'hammers' for this task.]

      ## The Guardrails
      [The 'Ironclad' validation steps to ensure accuracy and prevent hallucinations.]

      ## Quality Standards
      [Specific rules for the final output based on the user's Desired Output.]
    `;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const geminiData = await geminiResponse.json();
    
    if (geminiData.error) {
        throw new Error(geminiData.error.message || 'Gemini API Error');
    }

    const skillContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!skillContent) {
      throw new Error('Failed to generate skill content.');
    }

    const fileName = `${responses.skillName.toLowerCase().replace(/\s+/g, '-')}.md`;

    res.status(200).json({ 
      success: true, 
      content: skillContent,
      fileName: fileName
    });

  } catch (err: any) {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message });
  }
}
