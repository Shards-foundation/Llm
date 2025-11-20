
import { ModelConfig, ModelId, Capability, Category } from "./types";

// Real Integration: Mapping simulated IDs to actual Google GenAI Models
const REAL_GEMINI_3_PRO = ModelId.Gemini3Pro;
const REAL_GEMINI_2_5_FLASH = ModelId.Gemini25Flash;
const REAL_GEMINI_2_5_FLASH_LITE = ModelId.Gemini25FlashLite;
const REAL_IMAGEN = ModelId.Imagen4;
const REAL_VEO = ModelId.Veo3;
const REAL_NANO = ModelId.NanoBanana;

export const MODELS: ModelConfig[] = [
  // --- Advanced Models ---
  {
    id: 'gemini-3-pro',
    apiModel: REAL_GEMINI_3_PRO,
    name: "Gemini 3 Pro",
    description: "Reasoning, maths and code",
    category: Category.Advanced,
    capability: Capability.Reasoning,
    icon: "Sparkles",
    isThinking: true,
    provider: 'google'
  },
  {
    id: 'gpt-5-1',
    apiModel: 'openai/gpt-4-turbo',
    name: "GPT-5.1",
    description: "Next-gen reasoning engine",
    category: Category.Advanced,
    capability: Capability.Text,
    icon: "OpenAI",
    provider: 'openrouter',
    openRouterModelId: 'openai/gpt-4-turbo'
  },
  {
    id: 'claude-haiku-4-5',
    apiModel: 'anthropic/claude-3-haiku',
    name: "Claude Haiku 4.5",
    description: "Fastest intelligent model",
    category: Category.Advanced,
    capability: Capability.Text,
    icon: "Claude",
    provider: 'openrouter',
    openRouterModelId: 'anthropic/claude-3-haiku'
  },
  {
    id: 'gpt-5',
    apiModel: 'openai/gpt-4o',
    name: "GPT-5",
    description: "Advanced general intelligence",
    category: Category.Advanced,
    capability: Capability.Text,
    icon: "OpenAI",
    provider: 'openrouter',
    openRouterModelId: 'openai/gpt-4o'
  },
  {
    id: 'claude-sonnet-4-5',
    apiModel: 'anthropic/claude-3.5-sonnet',
    name: "Claude Sonnet 4.5",
    description: "Balanced high intelligence",
    category: Category.Advanced,
    capability: Capability.Text,
    icon: "Claude",
    provider: 'openrouter',
    openRouterModelId: 'anthropic/claude-3.5-sonnet'
  },
  {
    id: 'claude-opus-4-1',
    apiModel: 'anthropic/claude-3-opus',
    name: "Claude Opus 4.1",
    description: "Deep reasoning expert",
    category: Category.Advanced,
    capability: Capability.Reasoning,
    icon: "Claude",
    provider: 'openrouter',
    openRouterModelId: 'anthropic/claude-3-opus'
  },
  {
    id: 'gemini-2-5-pro',
    apiModel: REAL_GEMINI_3_PRO,
    name: "Gemini 2.5 Pro",
    description: "Advanced reasoning & coding",
    category: Category.Advanced,
    capability: Capability.Reasoning,
    icon: "Sparkles",
    provider: 'google'
  },
  {
    id: 'grok-4-1-fast',
    apiModel: 'x-ai/grok-beta',
    name: "xAI: Grok 4.1 Fast",
    description: "Real-time knowledge & wit",
    category: Category.Advanced,
    capability: Capability.Text,
    icon: "Grok",
    provider: 'openrouter',
    openRouterModelId: 'x-ai/grok-beta'
  },
  {
    id: 'openai-o3',
    apiModel: 'openai/o1-preview',
    name: "OpenAI o3",
    description: "Advanced chain of thought",
    category: Category.Advanced,
    capability: Capability.Reasoning,
    icon: "OpenAI",
    provider: 'openrouter',
    openRouterModelId: 'openai/o1-preview'
  },
  {
    id: 'deepseek-v3',
    apiModel: 'deepseek/deepseek-chat',
    name: "DeepSeek V3",
    description: "Open source powerhouse",
    category: Category.Advanced,
    capability: Capability.Text,
    icon: "Code",
    provider: 'openrouter',
    openRouterModelId: 'deepseek/deepseek-chat'
  },
  {
    id: 'nvidia-nemotron-nano-12b',
    apiModel: 'nvidia/llama-3.1-nemotron-70b-instruct', 
    name: "NVIDIA: Nemotron Nano 12B 2 VL",
    description: "Efficient edge intelligence",
    category: Category.Advanced,
    capability: Capability.Text,
    icon: "Nvidia",
    provider: 'openrouter',
    openRouterModelId: 'nvidia/llama-3.1-nemotron-70b-instruct'
  },

  // --- Free Models ---
  {
    id: 'gemma-3-27b-free',
    apiModel: 'google/gemma-3-27b-it:free',
    name: "Google: Gemma 3 27B",
    description: "Multimodal open model - Free",
    category: Category.Free,
    capability: Capability.Text, // Text capability handles multimodal input in our OpenRouter service
    icon: "Google",
    tags: ["Free", "Vision"],
    provider: 'openrouter',
    openRouterModelId: 'google/gemma-3-27b-it:free'
  },
  {
    id: 'alibaba-deepresearch-free',
    apiModel: 'alibaba/tongyi-deepresearch-30b-a3b:free',
    name: "Alibaba: Tongyi DeepResearch",
    description: "Advanced reasoning - Free",
    category: Category.Free,
    capability: Capability.Reasoning,
    icon: "Alibaba",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'alibaba/tongyi-deepresearch-30b-a3b:free'
  },
  {
    id: 'gemini-2-0-flash-free',
    apiModel: 'google/gemini-2.0-flash-exp:free',
    name: "Gemini 2.0 Flash",
    description: "Google's fastest - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Sparkles",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'google/gemini-2.0-flash-exp:free'
  },
  {
    id: 'gemini-2-0-pro-free',
    apiModel: 'google/gemini-2.0-pro-exp-02-05:free',
    name: "Gemini 2.0 Pro Exp",
    description: "Google's best - Free",
    category: Category.Free,
    capability: Capability.Reasoning,
    icon: "Sparkles",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'google/gemini-2.0-pro-exp-02-05:free'
  },
  {
    id: 'moonshot-k2-free',
    apiModel: 'moonshotai/moonshot-v1-8k', 
    name: "MoonshotAI: Kimi K2 0711",
    description: "Kimi K2 model - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Moonshot",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'moonshotai/moonshot-v1-8k' 
  },
  {
    id: 'llama-3-3-70b-free',
    apiModel: 'meta-llama/llama-3.3-70b-instruct:free',
    name: "Llama 3.3 70B",
    description: "Meta's open source leader - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Meta",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'meta-llama/llama-3.3-70b-instruct:free'
  },
  {
    id: 'deepseek-r1-free',
    apiModel: 'deepseek/deepseek-r1:free',
    name: "DeepSeek R1",
    description: "Reasoning expert - Free",
    category: Category.Free,
    capability: Capability.Reasoning,
    icon: "Code",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'deepseek/deepseek-r1:free'
  },
  {
    id: 'deepseek-v3-free',
    apiModel: 'deepseek/deepseek-chat:free',
    name: "DeepSeek V3",
    description: "General purpose - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Code",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'deepseek/deepseek-chat:free'
  },
  {
    id: 'qwen-2-5-vl-free',
    apiModel: 'qwen/qwen-2.5-vl-72b-instruct:free',
    name: "Qwen 2.5 VL 72B",
    description: "Vision & text - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Code",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'qwen/qwen-2.5-vl-72b-instruct:free'
  },
  {
    id: 'mistral-nemo-free',
    apiModel: 'mistralai/mistral-nemo:free',
    name: "Mistral Nemo",
    description: "Efficient 12B model - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Mistral",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'mistralai/mistral-nemo:free'
  },
  {
    id: 'phi-3-medium-free',
    apiModel: 'microsoft/phi-3-medium-128k-instruct:free',
    name: "Phi-3 Medium",
    description: "Microsoft's efficient model - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Microsoft",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'microsoft/phi-3-medium-128k-instruct:free'
  },
  {
    id: 'hermes-3-405b-free',
    apiModel: 'nousresearch/hermes-3-llama-3.1-405b:free',
    name: "Hermes 3 405B",
    description: "Uncensored massive model - Free",
    category: Category.Free,
    capability: Capability.Text,
    icon: "Brain",
    tags: ["Free"],
    provider: 'openrouter',
    openRouterModelId: 'nousresearch/hermes-3-llama-3.1-405b:free'
  },
  
  // --- Agents ---
  {
    id: 'gemini-live',
    apiModel: ModelId.GeminiLive,
    name: "Gemini Live",
    description: "Real-time voice conversation",
    category: Category.Agents,
    capability: Capability.AudioLive,
    icon: "Mic",
    provider: 'google'
  },
  {
    id: 'kat-coder-pro',
    apiModel: 'kwaipilot/kat-coder-pro-v1',
    name: "KAT-Coder-Pro V1",
    description: "Specialized coding agent",
    category: Category.Agents,
    capability: Capability.Text,
    icon: "Code",
    provider: 'openrouter',
    openRouterModelId: 'kwaipilot/kat-coder-pro-v1'
  },
  {
    id: 'perplexity',
    apiModel: 'perplexity/llama-3-sonar-large-32k-online',
    name: "Perplexity",
    description: "Real-time search agent",
    category: Category.Agents,
    capability: Capability.Text,
    icon: "Perplexity",
    provider: 'openrouter',
    openRouterModelId: 'perplexity/llama-3-sonar-large-32k-online'
  },
  {
    id: 'deep-research',
    apiModel: REAL_GEMINI_3_PRO,
    name: "Deep Research",
    description: "Comprehensive analysis",
    category: Category.Agents,
    capability: Capability.Reasoning,
    icon: "Search",
    provider: 'google'
  },
  
  // --- Image Generation ---
  {
    id: 'imagen-4',
    apiModel: REAL_IMAGEN,
    name: "Imagen 3",
    description: "High fidelity image generation",
    category: Category.Image,
    capability: Capability.ImageGen,
    icon: "Image",
    provider: 'google'
  },
  {
    id: 'seeddream-4',
    apiModel: REAL_IMAGEN, // Using Imagen for high quality backend
    name: "Seeddream 4.0",
    description: "Artistic dreamscapes",
    category: Category.Image,
    capability: Capability.ImageGen,
    icon: "Seeddream",
    provider: 'google'
  },
  {
    id: 'flux',
    apiModel: REAL_IMAGEN,
    name: "Flux",
    description: "Rapid iteration images",
    category: Category.Image,
    capability: Capability.ImageGen,
    icon: "Image",
    provider: 'google'
  },
  {
    id: 'gemini-nano-edit',
    apiModel: REAL_NANO,
    name: "Gemini Nano (Edit)",
    description: "Fast image editing",
    category: Category.Image,
    capability: Capability.ImageEdit,
    icon: "Pencil",
    provider: 'google'
  },
  
  // --- Video Generation ---
  {
    id: 'veo-3',
    apiModel: REAL_VEO,
    name: "Veo 3",
    description: "1080p video generation",
    category: Category.Video,
    capability: Capability.VideoGen,
    icon: "Video",
    tags: ["Best Price"],
    provider: 'google'
  },
  {
    id: 'sora-2',
    apiModel: REAL_VEO,
    name: "Sora 2",
    description: "Cinematic realism",
    category: Category.Video,
    capability: Capability.VideoGen,
    icon: "Video",
    provider: 'google'
  }
];

export const STARTER_PROMPTS = [
  { icon: "Brain", text: "Deep Reasoning", prompt: "I'd like to explore the implications of quantum entanglement on modern cryptography. Can we dive deep?" },
  { icon: "Code", text: "Code Assistant", prompt: "Could you help me architect a React component for a responsive, accessible navbar?" },
  { icon: "Image", text: "Create Image", prompt: "Generate a cinematic visualization of a futuristic city with flying cars in a cyberpunk style." },
  { icon: "Video", text: "Generate Video", prompt: "Create a video showing a cinematic drone shot of a mountain range at sunset." }
];

export const SUGGESTIONS = {
  START: {
    [Category.Advanced]: [
        "Explain quantum computing like I'm 5",
        "Review this code for security flaws",
        "Write a python script to scrape stock data",
        "Summarize the history of the internet",
        "Draft a polite resignation email",
        "What are the best practices for REST APIs?",
        "Create a study plan for learning Spanish",
        "Debug my React useEffect hook",
        "Explain the theory of relativity",
        "Write a poem about artificial intelligence"
    ],
    [Category.Free]: [
        "Explain the benefits of open source AI",
        "Write a quick python script",
        "Summarize this text for me",
        "What is the capital of France?",
        "Help me debug this function",
        "Write a creative short story",
        "Explain photosynthesis simply",
        "What are some healthy dinner ideas?",
        "Draft a tweet about AI",
        "Translate 'Hello World' to French"
    ],
    [Category.Agents]: [
        "Find me the cheapest flights to Tokyo",
        "Research the latest EV battery tech",
        "Compare the iPhone 16 vs Galaxy S25",
        "Find me a recipe for vegan lasagna",
        "Summarize the latest tech news",
        "Who won the 1998 World Cup?",
        "What is the weather in London next week?",
        "Find academic papers on LLMs",
        "Plan a 3-day trip to Paris",
        "Search for 'best sci-fi movies 2024'"
    ],
    [Category.Image]: [
        "A cyberpunk street food vendor, neon lights",
        "Portrait of a cat in a spacesuit, 8k",
        "Minimalist logo for a coffee shop",
        "Fantasy landscape with floating islands",
        "A futuristic car driving on Mars",
        "Oil painting of a rainy cottage",
        "Isometric 3D render of a gaming room",
        "Studio photography of a sneaker",
        "Anime style character sketch",
        "Vintage travel poster for the Moon"
    ],
    [Category.Video]: [
        "Drone shot of a tropical beach at sunset",
        "Time-lapse of a busy city intersection",
        "Slow motion water droplet falling",
        "A robot dancing in a futuristic club",
        "Cinematic zoom out from a human eye",
        "A car drifting on a snowy track",
        "Clouds moving rapidly over a mountain",
        "A campfire crackling in the woods",
        "Cyberpunk city flyover, night time",
        "A flower blooming in 4k time-lapse"
    ]
  },
  FOLLOW_UP: {
    [Category.Advanced]: [
        "Can you explain that more simply?",
        "What are the potential downsides?",
        "Give me a code example for that",
        "How does this compare to the alternative?",
        "Are there any security risks?",
        "Rewrite that to be more professional",
        "Expand on the second point",
        "Summarize this in 3 bullet points",
        "What would you recommend I do first?",
        "Is there a library that does this?"
    ],
    [Category.Free]: [
        "Can you simplify that explanation?",
        "Show me an example code snippet",
        "Are there any free alternatives?",
        "Summarize the key points",
        "Translate that to Spanish",
        "Make it shorter",
        "Add more detail to the first part",
        "What is the most important takeaway?",
        "Check for grammar errors",
        "Rewrite in a casual tone"
    ],
    [Category.Agents]: [
        "Find a source for that claim",
        "Are there any recent updates?",
        "Check for competitor pricing",
        "Look for user reviews on Reddit",
        "Can you verify this information?",
        "What do experts say about this?",
        "Find a YouTube video explaining this",
        "Search for similar products",
        "Is this available in my region?",
        "Get me more details on the specs"
    ],
    [Category.Image]: [
        "Make it look more realistic",
        "Change the lighting to sunset",
        "Add a person in the background",
        "Remove the text from the image",
        "Make it in the style of Van Gogh",
        "Change the aspect ratio to 16:9",
        "Make the colors more vibrant",
        "Add a futuristic filter",
        "Turn this into a vector illustration",
        "Make the background transparent"
    ],
    [Category.Video]: [
        "Make the movement smoother",
        "Extend the duration to 10 seconds",
        "Add a cinematic film grain",
        "Change the camera angle to low angle",
        "Make it slow motion",
        "Add a lens flare effect",
        "Change the time of day to night",
        "Zoom in on the main subject",
        "Make the colors cooler/bluer",
        "Add a shaking camera effect"
    ]
  }
};
