const AGENTROUTER_BASE_URL = process.env.AGENTROUTER_BASE_URL || 'https://api.agentrouter.com/v1';

const buildPrompt = ({ originalIdea, goal, context, skill, level, promptType, outputLength }) => {
  const lengthMap = {
    Short: 'Generate a concise, focused prompt.',
    Medium: 'Generate a detailed, well-structured prompt.',
    Long: 'Generate a comprehensive, exhaustive prompt.',
  };

  return `You are an expert prompt engineer specializing in ${skill} with a ${level} proficiency level.
Your task is to create a professional ${promptType} prompt.

USER INPUT:
- Idea: "${originalIdea}"
${goal ? `- Goal: "${goal}"` : ''}
${context ? `- Context: "${context}"` : ''}
- Skill Category: ${skill}
- Experience Level: ${level}
- Prompt Type: ${promptType}

${lengthMap[outputLength] || lengthMap.Medium}

INSTRUCTIONS FOR CRAFTING THE PROMPT:
1. Start with a clear role definition for the AI
2. Define specific objectives and deliverables
3. Include constraints and boundaries
4. Specify the expected output format
5. Add quality criteria and evaluation metrics
6. Structure with clear sections

OUTPUT FORMAT:
Return ONLY the generated prompt in the following structure (no additional text):
**Role:** [AI role]
**Objective:** [clear objective]
**Context:** [relevant context]
**Requirements:**
- [requirement 1]
- [requirement 2]
- [requirement 3]
**Output Format:** [expected output structure]
**Quality Criteria:** [how to evaluate success]
**Prompt:** [the complete, ready-to-use prompt]`;
};

export const generatePrompt = async (params) => {
  const promptText = buildPrompt(params);

  const response = await fetch(`${AGENTROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.AGENTROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a professional prompt engineer. Generate optimized, production-ready prompts. Return only the generated prompt without any additional commentary.',
        },
        {
          role: 'user',
          content: promptText,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`AgentRouter API error: ${response.statusText}`);
  }

  const data = await response.json();
  const generatedPrompt = data.choices?.[0]?.message?.content?.trim();

  if (!generatedPrompt) {
    throw new Error('Failed to generate prompt from AI service');
  }

  return generatedPrompt;
};
