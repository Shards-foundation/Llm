
import { LiveServerMessage } from "@google/genai";

export enum ModelId {
  Gemini3Pro = 'gemini-3-pro-preview',
  Gemini25Flash = 'gemini-2.5-flash',
  Gemini25FlashLite = 'gemini-flash-lite-latest',
  Imagen4 = 'imagen-4.0-generate-001',
  Veo3 = 'veo-3.1-fast-generate-preview',
  Veo3High = 'veo-3.1-generate-preview',
  NanoBanana = 'gemini-2.5-flash-image',
  GeminiLive = 'gemini-2.5-flash-native-audio-preview-09-2025',
  Thinking = 'gemini-2.0-flash-thinking-exp-01-21'
}

export enum Capability {
  Text = 'text',
  Reasoning = 'reasoning',
  ImageGen = 'image-gen',
  VideoGen = 'video-gen',
  AudioLive = 'audio-live',
  ImageEdit = 'image-edit'
}

export enum Category {
  Advanced = 'Advanced Models',
  Agents = 'AI Agents',
  Image = 'Image Generation',
  Video = 'Video Generation',
  Free = 'Free Models'
}

export type ModelProvider = 'google' | 'openrouter';

export interface ModelConfig {
  id: string; // Unique UI ID
  apiModel: string; // Actual Google GenAI Model ID or OpenRouter ID
  name: string;
  description?: string;
  category: Category;
  capability: Capability;
  icon: string; // Icon name
  tags?: string[]; // e.g. "Best Price", "New"
  isThinking?: boolean;
  provider: ModelProvider; // NEW: Distinguish between Google and OpenRouter
  openRouterModelId?: string; // Specific ID for OpenRouter
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text?: string;
  images?: string[]; // Base64
  videoUri?: string; // For Veo output
  timestamp: number;
  isThinking?: boolean;
  thinkingLog?: string; 
  reasoning_details?: any; // For OpenRouter reasoning models
  sources?: Array<{uri: string; title: string}>; 
  feedback?: 'good' | 'bad';
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: number;
  modelId: string;
}

export interface Attachment {
  file: File;
  preview: string; // URL or base64
  type: 'image' | 'video' | 'audio' | 'pdf';
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  
  interface Window {
    aistudio?: AIStudio;
  }
}
