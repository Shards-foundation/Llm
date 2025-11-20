import React from 'react';
import { Icons } from './Icons';
import { ChatSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  sessions: ChatSession[];
  currentSessionId: string;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, sessions, currentSessionId, onNewChat, onSelectSession, onOpenSettings }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
             <Icons.Sparkles className="text-white w-5 h-5" />
           </div>
           <span className="font-semibold text-lg tracking-tight text-gray-100">OmniGrid AI</span>
        </div>
      </div>

      <div className="p-3">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 bg-surfaceHighlight hover:bg-gray-700 text-white py-2.5 rounded-lg border border-border transition-colors"
        >
          <Icons.Plus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider px-2 mb-2 mt-2">Recents</h3>
        {sessions.length === 0 && (
            <div className="text-secondary text-sm px-2 italic">No history yet</div>
        )}
        {sessions.map(session => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-colors ${currentSessionId === session.id ? 'bg-blue-900/20 text-blue-400' : 'text-gray-300 hover:bg-surfaceHighlight'}`}
          >
            {session.title}
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-border space-y-2">
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-surfaceHighlight text-gray-300 hover:text-white transition-colors"
        >
            <Icons.Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
        </button>
        
        <div className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-surfaceHighlight cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">U</div>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-200">User</span>
                <span className="text-xs text-gray-500">Pro Plan</span>
            </div>
        </div>
      </div>
    </div>
  );
};