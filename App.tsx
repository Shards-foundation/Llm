
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Icons } from './components/Icons';
import { LiveMode } from './components/LiveMode';
import { 
  ModelId, 
  Message, 
  ChatSession, 
  Capability, 
  ModelConfig, 
  Attachment,
  Category
} from './types';
import { MODELS, STARTER_PROMPTS, SUGGESTIONS } from './constants';
import { 
  generateTextResponse, 
  generateImage, 
  generateVideo, 
  editImage,
  connectLiveSession
} from './services/geminiService';
import { generateOpenRouterResponse } from './services/openRouterService';

// --- Simple Markdown Formatter ---
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          // Render Code Block
          const content = part.replace(/```[a-z]*\n?|```$/g, '');
          return (
            <div key={i} className="bg-black/30 rounded-md p-3 overflow-x-auto border border-white/10 font-mono text-sm my-2">
              <pre>{content}</pre>
            </div>
          );
        }
        
        // Render Text with basic formatting (Bold & Newlines)
        return (
          <div key={i} className="whitespace-pre-wrap">
            {part.split(/(\*\*.*?\*\*)/g).map((subPart, j) => {
              if (subPart.startsWith('**') && subPart.endsWith('**')) {
                return <strong key={j} className="text-white font-semibold">{subPart.slice(2, -2)}</strong>;
              }
              return subPart;
            })}
          </div>
        );
      })}
    </div>
  );
};

// --- Settings Modal ---
const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [googleKey, setGoogleKey] = useState(localStorage.getItem('googleApiKey') || '');
  const [openRouterKey, setOpenRouterKey] = useState(localStorage.getItem('openRouterApiKey') || '');
  const [showGoogle, setShowGoogle] = useState(false);
  const [showRouter, setShowRouter] = useState(false);

  const handleSave = () => {
    if (googleKey) localStorage.setItem('googleApiKey', googleKey);
    else localStorage.removeItem('googleApiKey');
    
    if (openRouterKey) localStorage.setItem('openRouterApiKey', openRouterKey);
    else localStorage.removeItem('openRouterApiKey');
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><Icons.X className="w-5 h-5"/></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Google Gemini API Key</label>
            <div className="relative">
                <input 
                  type={showGoogle ? "text" : "password"}
                  value={googleKey}
                  onChange={(e) => setGoogleKey(e.target.value)}
                  placeholder="AIza..."
                  className="w-full bg-surfaceHighlight border border-border rounded-lg pl-4 pr-20 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors"
                />
                <div className="absolute right-3 top-2.5 flex items-center space-x-2">
                    <button 
                        onClick={() => setShowGoogle(!showGoogle)}
                        className="text-gray-500 hover:text-gray-300"
                    >
                        {showGoogle ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                    </button>
                    <button 
                        onClick={() => setGoogleKey('')}
                        className="text-red-500 hover:text-red-400"
                        title="Clear key"
                    >
                        <Icons.Trash className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-500">Required for Gemini, Veo, Imagen, and Live features.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">OpenRouter API Key</label>
            <div className="relative">
                <input 
                  type={showRouter ? "text" : "password"}
                  value={openRouterKey}
                  onChange={(e) => setOpenRouterKey(e.target.value)}
                  placeholder="sk-or-..."
                  className="w-full bg-surfaceHighlight border border-border rounded-lg pl-4 pr-20 py-2 text-sm text-white focus:border-blue-500 outline-none transition-colors"
                />
                 <div className="absolute right-3 top-2.5 flex items-center space-x-2">
                    <button 
                        onClick={() => setShowRouter(!showRouter)}
                        className="text-gray-500 hover:text-gray-300"
                    >
                        {showRouter ? <Icons.EyeOff className="w-4 h-4" /> : <Icons.Eye className="w-4 h-4" />}
                    </button>
                    <button 
                        onClick={() => setOpenRouterKey('')}
                        className="text-red-500 hover:text-red-400"
                        title="Clear key"
                    >
                        <Icons.Trash className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-500">Required for GPT, Claude, and other external models.</p>
          </div>
        </div>
        <div className="p-6 bg-surfaceHighlight/30 border-t border-border flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">Save Changes</button>
        </div>
      </div>
    </div>
  );
};


export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<ModelConfig>(MODELS[0]); 
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [liveActive, setLiveActive] = useState(false);
  const [liveAudioBuffer, setLiveAudioBuffer] = useState<AudioBuffer | null>(null);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [useGrounding, setUseGrounding] = useState(false);
  
  // Suggestions State
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestionsRefreshKey, setSuggestionsRefreshKey] = useState(0);

  // Toolbar & Menu States
  const [activeMessageMenu, setActiveMessageMenu] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  
  // Settings State
  const [showSettings, setShowSettings] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  // Contextual Suggestions Logic
  const suggestions = useMemo(() => {
      const suggestionsState = messages.length === 0 ? 'START' : 'FOLLOW_UP';
      const currentCategory = currentModel.category;
      const pool = SUGGESTIONS[suggestionsState][currentCategory] || SUGGESTIONS[suggestionsState][Category.Advanced];
      
      // Randomly shuffle and pick 4 suggestions
      // Dependent on messages.length and refresh key
      return [...pool].sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [messages.length, currentModel.category, suggestionsRefreshKey]);

  // Group models by category
  const groupedModels = MODELS.reduce((acc, model) => {
    if (!acc[model.category]) {
      acc[model.category] = [];
    }
    acc[model.category].push(model);
    return acc;
  }, {} as Record<Category, ModelConfig[]>);

  const categories = [Category.Advanced, Category.Free, Category.Agents, Category.Image, Category.Video];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMessageMenu(null);
      setShowModelMenu(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newSession: ChatSession = {
      id: newId,
      title: 'New Chat',
      messages: [],
      lastUpdated: Date.now(),
      modelId: currentModel.id
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setInput('');
    setAttachment(null);
    setIsSidebarOpen(false); 
    setShowSuggestions(true); // Reset suggestions visibility
  };

  useEffect(() => {
    if (sessions.length === 0) handleNewChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Core Send Logic
  const processMessage = async (
      textInput: string, 
      msgAttachment: Attachment | null, 
      forceThinking = false, 
      forceGrounding = false
  ) => {
    const tempInput = textInput;
    const tempAttachment = msgAttachment;
    
    setIsGenerating(true);

    try {
      let aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        timestamp: Date.now(),
      };

      if (currentModel.apiModel === ModelId.GeminiLive) {
        setLiveActive(true);
        setIsGenerating(false);
        return;
      }

      if (currentModel.capability === Capability.ImageGen) {
        // Image Generation uses Google Imagen
        const imageUrl = await generateImage(tempInput);
        aiMsg.images = [imageUrl];
      } else if (currentModel.capability === Capability.VideoGen) {
        // Video Generation uses Google Veo
        const videoUrl = await generateVideo(tempInput);
        aiMsg.videoUri = videoUrl;
      } else if (currentModel.capability === Capability.ImageEdit && tempAttachment?.type === 'image') {
        // Image Edit uses Gemini Nano/Flash Image
        const editedImage = await editImage(tempAttachment.preview, tempInput);
        aiMsg.images = [editedImage];
      } else {
        // Text Generation
        if (currentModel.provider === 'openrouter') {
           // Use OpenRouter Service
           const modelId = currentModel.openRouterModelId || currentModel.apiModel;
           const { text, reasoning_details } = await generateOpenRouterResponse(modelId, messages, tempInput);
           aiMsg.text = text;
           aiMsg.reasoning_details = reasoning_details; // Store reasoning details
        } else {
           // Use Google GenAI Service
           const attachments = tempAttachment?.type === 'image' 
               ? [{ inlineData: { mimeType: 'image/png', data: tempAttachment.preview.split(',')[1] } }]
               : [];
           
           const effectiveGrounding = useGrounding || forceGrounding;
           const effectiveThinking = currentModel.isThinking || forceThinking;

           const response = await generateTextResponse(
               currentModel.apiModel,
               messages, 
               tempInput, 
               attachments,
               effectiveThinking,
               effectiveGrounding
           );

           aiMsg.text = response.text;
           if (effectiveGrounding && response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
               const chunks = response.candidates[0].groundingMetadata.groundingChunks;
               aiMsg.sources = chunks
                   .filter((c: any) => c.web?.uri)
                   .map((c: any) => ({ uri: c.web.uri, title: c.web.title }));
           }
        }
      }

      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return { ...s, messages: [...s.messages, aiMsg] };
        }
        return s;
      }));

    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: 'model',
        text: `Error: ${err.message || "Something went wrong. Please try again."}`,
        timestamp: Date.now()
      };
      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) return { ...s, messages: [...s.messages, errorMsg] };
        return s;
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && !attachment) || isGenerating) return;
    
    const textToSend = input;
    const attachToSend = attachment;
    
    setInput('');
    setAttachment(null);

    // Optimistic User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      images: attachToSend?.type === 'image' ? [attachToSend.preview] : undefined,
      timestamp: Date.now()
    };

    setSessions(prev => prev.map(s => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          messages: [...s.messages, userMsg],
          title: s.messages.length === 0 ? (textToSend.slice(0, 30) || 'New Conversation') : s.title
        };
      }
      return s;
    }));

    await processMessage(textToSend, attachToSend);
  };

  const handleRegenerate = async (msgIndex: number, mode: 'normal' | 'thinking' | 'grounding' = 'normal') => {
      if (!currentSessionId) return;
      
      const prevMsg = messages[msgIndex - 1];
      if (!prevMsg || prevMsg.role !== 'user') return;

      const newMessages = messages.slice(0, msgIndex); 
      
      setSessions(prev => prev.map(s => {
          if (s.id === currentSessionId) {
              return { ...s, messages: newMessages };
          }
          return s;
      }));

      setTimeout(() => {
         setIsGenerating(true);
         const lastUserMsg = newMessages[newMessages.length - 1];
         
         (async () => {
             try {
                 let aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    timestamp: Date.now(),
                 };
                 
                 if (currentModel.capability === Capability.ImageGen) {
                    const imageUrl = await generateImage(lastUserMsg.text || '');
                    aiMsg.images = [imageUrl];
                 } else if (currentModel.capability === Capability.VideoGen) {
                    const videoUrl = await generateVideo(lastUserMsg.text || '');
                    aiMsg.videoUri = videoUrl;
                 } else {
                     if (currentModel.provider === 'openrouter') {
                        const modelId = currentModel.openRouterModelId || currentModel.apiModel;
                        const { text, reasoning_details } = await generateOpenRouterResponse(modelId, newMessages, lastUserMsg.text || '');
                        aiMsg.text = text;
                        aiMsg.reasoning_details = reasoning_details;
                     } else {
                        // Google GenAI
                        const attachments: any[] = [];
                        const forceThinking = mode === 'thinking';
                        const forceGrounding = mode === 'grounding';
                        
                        const response = await generateTextResponse(
                            currentModel.apiModel,
                            newMessages,
                            lastUserMsg.text || '', 
                            attachments,
                            forceThinking || currentModel.isThinking,
                            forceGrounding || useGrounding
                        );
                        
                        aiMsg.text = response.text;
                        if ((forceGrounding || useGrounding) && response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                            const chunks = response.candidates[0].groundingMetadata.groundingChunks;
                            aiMsg.sources = chunks.filter((c: any) => c.web?.uri).map((c: any) => ({ uri: c.web.uri, title: c.web.title }));
                        }
                     }
                 }

                 setSessions(prev => prev.map(s => {
                    if (s.id === currentSessionId) {
                        return { ...s, messages: [...newMessages, aiMsg] };
                    }
                    return s;
                 }));
             } catch (e) {
                 console.error(e);
             } finally {
                 setIsGenerating(false);
             }
         })();
         
      }, 0);
  };

  const copyToClipboard = (text: string, msgId: string) => {
      navigator.clipboard.writeText(text);
      setCopiedMessageId(msgId);
      setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleFeedback = (msgId: string, type: 'good' | 'bad') => {
      setSessions(prev => prev.map(s => {
          if (s.id === currentSessionId) {
              return {
                  ...s,
                  messages: s.messages.map(m => m.id === msgId ? { ...m, feedback: type } : m)
              };
          }
          return s;
      }));
  };

  const toggleLive = async () => {
    if (liveActive) {
        setLiveActive(false);
    } else {
        setLiveActive(true);
        setTimeout(() => {
            connectLiveSession(
                (buffer) => setLiveAudioBuffer(buffer),
                () => setLiveActive(false)
            );
        }, 100);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAttachment({
        file,
        preview: ev.target?.result as string,
        type: file.type.startsWith('image') ? 'image' : 'pdf'
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex h-screen bg-background text-gray-100 font-sans overflow-hidden">
      <LiveMode isActive={liveActive} onClose={() => setLiveActive(false)} audioBuffer={liveAudioBuffer} />
      
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      <Sidebar 
        isOpen={isSidebarOpen}
        sessions={sessions}
        currentSessionId={currentSessionId || ''}
        onNewChat={handleNewChat}
        onSelectSession={(id) => { setCurrentSessionId(id); setIsSidebarOpen(false); }}
        onOpenSettings={() => { setShowSettings(true); setIsSidebarOpen(false); }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center px-4 justify-between bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-secondary hover:text-white">
              <Icons.Menu className="w-6 h-6" />
            </button>
            
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowModelMenu(!showModelMenu); }}
                className="flex items-center space-x-2 text-sm font-medium bg-surfaceHighlight px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Icons.Sparkles className="w-4 h-4 text-accent" />
                <span>{currentModel.name}</span>
                <Icons.ChevronDown className="w-3 h-3 text-secondary" />
              </button>

              {showModelMenu && (
                <div onClick={(e) => e.stopPropagation()} className="absolute top-full left-0 mt-2 w-80 bg-black border border-border rounded-xl shadow-2xl overflow-hidden z-20 max-h-[600px] overflow-y-auto">
                  {categories.map(cat => (
                    <div key={cat} className="py-2">
                        <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-black z-10">
                            {cat}
                        </div>
                        {groupedModels[cat]?.map(model => {
                            const Icon = Icons[model.icon] || Icons.Sparkles;
                            return (
                                <button
                                    key={model.id}
                                    onClick={() => { setCurrentModel(model); setShowModelMenu(false); }}
                                    className={`w-full flex items-center px-4 py-3 hover:bg-gray-900 transition-colors text-left group ${currentModel.id === model.id ? 'bg-gray-900' : ''}`}
                                >
                                    <div className="flex-shrink-0 mr-3 text-gray-400 group-hover:text-white">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-medium ${currentModel.id === model.id ? 'text-white' : 'text-gray-300'}`}>
                                                {model.name}
                                            </span>
                                            {model.tags && model.tags.map(tag => (
                                                <span key={tag} className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {model.description && (
                                            <div className="text-xs text-gray-500 truncate mt-0.5">
                                                {model.description}
                                            </div>
                                        )}
                                    </div>
                                    {currentModel.id === model.id && (
                                        <Icons.Sparkles className="w-3 h-3 text-blue-500 ml-2" />
                                    )}
                                </button>
                            );
                        })}
                        {cat !== categories[categories.length -1] && (
                            <div className="h-px bg-gray-900 mx-4 mt-2"></div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
             <button 
               onClick={() => setUseGrounding(!useGrounding)}
               className={`p-2 rounded-full transition-colors ${useGrounding ? 'bg-blue-900/30 text-blue-400' : 'text-secondary hover:bg-surfaceHighlight'}`}
               title="Grounding (Search/Maps)"
             >
                <Icons.Globe className="w-5 h-5" />
             </button>
             <button className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-medium border border-amber-500/20">
                Pro
             </button>
          </div>
        </header>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth pb-32">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto text-center">
               <div className="mb-8 relative">
                 <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                    <Icons.Sparkles className="w-10 h-10 text-white" />
                 </div>
               </div>
               <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-3">
                 How can I help you today?
               </h1>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 w-full">
                 {STARTER_PROMPTS.map((starter, i) => {
                    const Icon = Icons[starter.icon] || Icons.Sparkles;
                    return (
                        <button 
                          key={i}
                          onClick={() => setInput(starter.prompt)}
                          className="col-span-1 bg-surfaceHighlight border border-border p-4 rounded-xl text-left hover:bg-gray-700 hover:scale-[1.02] transition-all group"
                        >
                           <Icon className="w-6 h-6 text-secondary group-hover:text-accent mb-3" />
                           <div className="text-sm font-medium text-gray-200">{starter.text}</div>
                        </button>
                    );
                 })}
               </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              {messages.map((msg, idx) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] md:max-w-[75%] space-y-2 group relative`}>
                      <div className={`p-4 rounded-2xl ${
                          msg.role === 'user' 
                          ? 'bg-surfaceHighlight text-white rounded-tr-none' 
                          : 'text-gray-100' 
                      }`}>
                          {msg.images && msg.images.map((img, i) => (
                              <img key={i} src={img} alt="Generated" className="rounded-lg mb-3 max-w-full shadow-lg border border-border" />
                          ))}
                          
                          {msg.videoUri && (
                              <video controls src={msg.videoUri} className="rounded-lg mb-3 w-full shadow-lg border border-border" />
                          )}

                          {msg.text && (
                             <div className="prose prose-invert prose-sm md:prose-base max-w-none whitespace-pre-wrap leading-relaxed">
                                {msg.role === 'model' ? <SimpleMarkdown text={msg.text} /> : msg.text}
                             </div>
                          )}
                          
                          {msg.reasoning_details && (
                              <details className="mt-2 bg-black/20 rounded p-2 border border-white/5">
                                  <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-200">Show Thinking Process</summary>
                                  <pre className="mt-2 text-[10px] text-gray-500 overflow-x-auto whitespace-pre-wrap">
                                      {typeof msg.reasoning_details === 'string' ? msg.reasoning_details : JSON.stringify(msg.reasoning_details, null, 2)}
                                  </pre>
                              </details>
                          )}

                          {msg.sources && msg.sources.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                  {msg.sources.map((s, i) => (
                                      <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-400 px-2 py-1 rounded border border-gray-700 transition-colors truncate max-w-[200px]">
                                          {s.title || s.uri}
                                      </a>
                                  ))}
                              </div>
                          )}
                      </div>
                      
                      {/* AI Message Toolbar */}
                      {msg.role === 'model' && !isGenerating && (
                          <div className="flex items-center space-x-1 mt-1.5 pl-1">
                             <button 
                                onClick={() => copyToClipboard(msg.text || '', msg.id)}
                                className="p-1.5 rounded hover:bg-surfaceHighlight text-secondary hover:text-white transition-colors"
                                title="Copy"
                             >
                                {copiedMessageId === msg.id ? <Icons.Check className="w-4 h-4 text-green-500" /> : <Icons.Copy className="w-4 h-4" />}
                             </button>
                             <button 
                                onClick={() => handleFeedback(msg.id, 'good')}
                                className={`p-1.5 rounded hover:bg-surfaceHighlight transition-colors ${msg.feedback === 'good' ? 'text-green-400' : 'text-secondary hover:text-white'}`}
                                title="Good response"
                             >
                                <Icons.ThumbsUp className="w-4 h-4" />
                             </button>
                             <button 
                                onClick={() => handleFeedback(msg.id, 'bad')}
                                className={`p-1.5 rounded hover:bg-surfaceHighlight transition-colors ${msg.feedback === 'bad' ? 'text-red-400' : 'text-secondary hover:text-white'}`}
                                title="Bad response"
                             >
                                <Icons.ThumbsDown className="w-4 h-4" />
                             </button>
                             <button 
                                onClick={() => handleRegenerate(idx)}
                                className="p-1.5 rounded hover:bg-surfaceHighlight text-secondary hover:text-white transition-colors"
                                title="Regenerate"
                             >
                                <Icons.RotateCw className="w-4 h-4" />
                             </button>
                             <button 
                                className="p-1.5 rounded hover:bg-surfaceHighlight text-secondary hover:text-white transition-colors"
                                title="Share"
                             >
                                <Icons.Share2 className="w-4 h-4" />
                             </button>
                             
                             <div className="relative">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setActiveMessageMenu(activeMessageMenu === msg.id ? null : msg.id); }}
                                    className={`p-1.5 rounded hover:bg-surfaceHighlight transition-colors ${activeMessageMenu === msg.id ? 'bg-surfaceHighlight text-white' : 'text-secondary hover:text-white'}`}
                                >
                                    <Icons.MoreHorizontal className="w-4 h-4" />
                                </button>
                                
                                {activeMessageMenu === msg.id && (
                                    <div onClick={(e) => e.stopPropagation()} className="absolute bottom-full left-0 mb-2 w-48 bg-surfaceHighlight border border-border rounded-lg shadow-xl overflow-hidden z-10">
                                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 flex items-center space-x-2">
                                            <Icons.Share2 className="w-4 h-4" /> <span>Share full conversation</span>
                                        </button>
                                        <button className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 flex items-center space-x-2">
                                            <Icons.Edit className="w-4 h-4" /> <span>Edit</span>
                                        </button>
                                        <button 
                                            onClick={() => copyToClipboard(msg.text || '', msg.id)}
                                            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 flex items-center space-x-2"
                                        >
                                            <Icons.Copy className="w-4 h-4" /> <span>Select text</span>
                                        </button>
                                        <div className="h-px bg-gray-700 mx-2 my-1"></div>
                                        <button 
                                            onClick={() => { handleRegenerate(idx, 'grounding'); setActiveMessageMenu(null); }}
                                            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 flex items-center space-x-2"
                                        >
                                            <Icons.Globe className="w-4 h-4" /> <span>Grounding</span>
                                        </button>
                                        <button 
                                            onClick={() => { handleRegenerate(idx, 'thinking'); setActiveMessageMenu(null); }}
                                            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 flex items-center space-x-2"
                                        >
                                            <Icons.Clock className="w-4 h-4" /> <span>Think longer</span>
                                        </button>
                                        <div className="h-px bg-gray-700 mx-2 my-1"></div>
                                        <button className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 flex items-center space-x-2">
                                            <Icons.Flag className="w-4 h-4" /> <span>Report legal issue</span>
                                        </button>
                                    </div>
                                )}
                             </div>
                          </div>
                      )}
                   </div>
                </div>
              ))}
              
              {isGenerating && (
                 <div className="flex justify-start">
                     <div className="flex items-center space-x-2 text-secondary bg-surfaceHighlight px-4 py-2 rounded-full">
                         <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                         <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                         <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                     </div>
                 </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
           <div className="max-w-3xl mx-auto relative group">
              
              {/* Contextual Suggestions */}
              {showSuggestions && (
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 px-1 mb-2 scrollbar-hide">
                   <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 mr-1">
                       <Icons.Sparkles className="w-3.5 h-3.5 text-accent" />
                   </div>
                   {suggestions.map((s, i) => (
                      <button
                          key={i}
                          onClick={() => setInput(s)}
                          className="flex-shrink-0 bg-surface/80 hover:bg-surfaceHighlight border border-white/5 hover:border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-gray-100 transition-all duration-200 whitespace-nowrap backdrop-blur-sm"
                      >
                          {s}
                      </button>
                   ))}
                   <div className="w-px h-4 bg-gray-700 mx-1 flex-shrink-0" />
                   <button 
                      onClick={() => setSuggestionsRefreshKey(prev => prev + 1)}
                      className="flex-shrink-0 p-1.5 rounded-full hover:bg-surfaceHighlight text-secondary hover:text-white transition-colors"
                      title="Refresh suggestions"
                   >
                      <Icons.RefreshCw className="w-3.5 h-3.5" />
                   </button>
                   <button 
                      onClick={() => setShowSuggestions(false)}
                      className="flex-shrink-0 p-1.5 rounded-full hover:bg-surfaceHighlight text-secondary hover:text-white transition-colors"
                      title="Close suggestions"
                   >
                      <Icons.X className="w-3.5 h-3.5" />
                   </button>
                </div>
              )}

              {attachment && (
                <div className="absolute -top-16 left-0 bg-surface border border-border p-2 rounded-lg flex items-center space-x-2">
                    {attachment.type === 'image' ? (
                        <img src={attachment.preview} className="w-10 h-10 rounded object-cover" alt="preview" />
                    ) : (
                        <Icons.Paperclip className="w-5 h-5 text-secondary" />
                    )}
                    <span className="text-xs text-gray-300 max-w-[150px] truncate">{attachment.file.name}</span>
                    <button onClick={() => setAttachment(null)} className="text-red-400 hover:text-red-300 ml-2">×</button>
                </div>
              )}

              <div className="bg-surfaceHighlight border border-gray-700 rounded-3xl flex flex-col relative shadow-xl focus-within:border-gray-500 transition-colors">
                 <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder={currentModel.capability === Capability.ImageEdit ? "Upload image and describe edits..." : "Ask anything..."}
                    className="bg-transparent text-white p-4 w-full outline-none resize-none min-h-[56px] max-h-32"
                    rows={1}
                 />
                 <div className="flex items-center justify-between px-2 pb-2">
                    <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="p-2 text-secondary hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <Icons.Plus className="w-5 h-5" />
                        </button>
                        <input 
                           type="file" 
                           ref={fileInputRef} 
                           onChange={handleFileUpload} 
                           className="hidden" 
                           accept="image/*,application/pdf"
                        />
                        <button 
                            onClick={toggleLive}
                            className="p-2 text-secondary hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                            title="Live Mode"
                        >
                            <Icons.Mic className="w-5 h-5" />
                        </button>
                    </div>
                    <button 
                        onClick={handleSendMessage}
                        disabled={!input.trim() && !attachment}
                        className={`p-2 rounded-full transition-all ${input.trim() || attachment ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                    >
                        <Icons.Send className="w-5 h-5" />
                    </button>
                 </div>
              </div>
              <div className="text-center text-xs text-gray-600 mt-2">
                 Gemini may display inaccurate info, including about people, so double-check its responses.
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
