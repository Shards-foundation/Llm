
import { Message } from '../types';

export const generateOpenRouterResponse = async (
  modelId: string,
  history: Message[],
  prompt: string
): Promise<{ text: string; reasoning_details?: any }> => {
  // Check LocalStorage first for user-provided key, then environment variables
  const apiKey = localStorage.getItem('openRouterApiKey') || process.env.OPENROUTER_API_KEY || process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please set your OpenRouter API Key in Settings.");
  }

  // Convert internal message format to OpenAI/OpenRouter format
  // Include reasoning_details from previous turns if available to preserve context
  const messages = history.map(msg => {
    const apiMsg: any = {
      role: msg.role === 'model' ? 'assistant' : msg.role,
      content: msg.text || ''
    };
    
    // Critical: Pass back reasoning details if they exist for continuity
    if (msg.reasoning_details) {
        apiMsg.reasoning_details = msg.reasoning_details;
    }
    
    return apiMsg;
  });

  // Add current user prompt
  messages.push({
    role: 'user',
    content: prompt
  });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin, // Required by OpenRouter
        "X-Title": "OmniGrid AI", 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        temperature: 0.7,
        reasoning: { enabled: true } // Enable reasoning for supported models
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter Error: ${response.statusText}`);
    }

    const data = await response.json();
    const choice = data.choices?.[0];
    const content = choice?.message?.content || "";
    const reasoning_details = choice?.message?.reasoning_details || undefined;

    return { text: content, reasoning_details };
  } catch (error) {
    console.error("OpenRouter API Call Failed", error);
    throw error;
  }
};
