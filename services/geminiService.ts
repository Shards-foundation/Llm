
import { 
  GoogleGenAI, 
  Modality, 
  LiveServerMessage,
  FunctionDeclaration,
  Type
} from "@google/genai";
import { ModelId, Message } from "../types";

// Helper to check/prompt for API Key if using Veo
export const ensureApiKey = async (modelId: string): Promise<void> => {
  if (modelId === ModelId.Veo3 || modelId === ModelId.Veo3High) {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }
  }
};

export const createClient = () => {
  const apiKey = localStorage.getItem('googleApiKey') || process.env.API_KEY;
  return new GoogleGenAI({ apiKey });
};

export const generateTextResponse = async (
  modelId: string,
  history: Message[],
  prompt: string,
  attachments: { inlineData: { mimeType: string; data: string } }[],
  isThinking: boolean = false,
  useGrounding: boolean = false
): Promise<any> => {
  const ai = createClient();
  
  const tools = [];
  if (useGrounding) {
    tools.push({ googleSearch: {} });
  }

  const config: any = {
    tools: tools.length > 0 ? tools : undefined
  };

  if (isThinking) {
    config.thinkingConfig = { thinkingBudget: 16000 }; 
  }

  const parts: any[] = [...attachments];
  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: modelId,
    contents: { parts },
    config
  });

  return response;
};

export const generateImage = async (prompt: string): Promise<string> => {
  const ai = createClient();
  const response = await ai.models.generateImages({
    model: ModelId.Imagen4,
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '16:9',
    },
  });
  
  const base64 = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64}`;
};

export const editImage = async (imageBase64: string, prompt: string): Promise<string> => {
  const ai = createClient();
  const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
  
  const response = await ai.models.generateContent({
    model: ModelId.NanoBanana, 
    contents: {
      parts: [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: 'image/png', 
          },
        },
        { text: prompt },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image returned from edit");
};

export const generateVideo = async (prompt: string): Promise<string> => {
  const ai = createClient();
  await ensureApiKey(ModelId.Veo3);

  let operation = await ai.models.generateVideos({
    model: ModelId.Veo3,
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Video generation failed");

  // Use stored key for fetch if available
  const apiKey = localStorage.getItem('googleApiKey') || process.env.API_KEY;
  const response = await fetch(`${downloadLink}&key=${apiKey}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

// --- LIVE API HELPERS ---

const encodeAudio = (bytes: Uint8Array) => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const decodeAudio = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const connectLiveSession = async (
  onAudioData: (buffer: AudioBuffer) => void,
  onClose: () => void
) => {
  const ai = createClient();
  
  const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
  const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
  let nextStartTime = 0;
  const sources = new Set<AudioBufferSourceNode>();

  const sessionPromise = ai.live.connect({
    model: ModelId.GeminiLive,
    callbacks: {
      onopen: () => {
        const source = inputAudioContext.createMediaStreamSource(stream);
        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
        
        scriptProcessor.onaudioprocess = (e) => {
          const inputData = e.inputBuffer.getChannelData(0);
          const l = inputData.length;
          const int16 = new Int16Array(l);
          for (let i = 0; i < l; i++) {
            int16[i] = inputData[i] * 32768;
          }
          const pcmData = encodeAudio(new Uint8Array(int16.buffer));
          
          sessionPromise.then(session => {
            session.sendRealtimeInput({
              media: {
                mimeType: 'audio/pcm;rate=16000',
                data: pcmData
              }
            });
          });
        };
        
        source.connect(scriptProcessor);
        scriptProcessor.connect(inputAudioContext.destination);
      },
      onmessage: async (msg: LiveServerMessage) => {
        const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (audioData) {
          const bytes = decodeAudio(audioData);
          const dataInt16 = new Int16Array(bytes.buffer);
          const buffer = outputAudioContext.createBuffer(1, dataInt16.length, 24000);
          const channelData = buffer.getChannelData(0);
          for(let i=0; i<dataInt16.length; i++) {
            channelData[i] = dataInt16[i] / 32768.0;
          }
          
          if (outputAudioContext.state === 'suspended') await outputAudioContext.resume();
          
          const source = outputAudioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(outputAudioContext.destination);
          
          nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
          source.start(nextStartTime);
          nextStartTime += buffer.duration;
          
          sources.add(source);
          source.onended = () => sources.delete(source);
          
          onAudioData(buffer); 
        }
        
        if (msg.serverContent?.interrupted) {
            sources.forEach(s => s.stop());
            sources.clear();
            nextStartTime = 0;
        }
      },
      onclose: () => {
        onClose();
        inputAudioContext.close();
        outputAudioContext.close();
        stream.getTracks().forEach(t => t.stop());
      },
      onerror: (err) => {
        console.error(err);
        onClose();
      }
    },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
      }
    }
  });
  
  return () => {
      sessionPromise.then(s => s.close());
  };
};