
import React from 'react';

export const Icons: Record<string, React.FC<{ className?: string }>> = {
  Menu: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  Plus: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  X: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  RefreshCw: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
  ),
  Settings: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Eye: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  EyeOff: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
  ),
  Trash: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  ),
  Image: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  Video: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
  ),
  Mic: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
  ),
  Zap: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  ZapOff: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="12.41 6.75 13 2 10.57 4.92"/><polyline points="18.57 12.91 21 10 15.66 10"/><polyline points="8 8 3 14 12 14 11 22 16 16"/><line x1="1" x2="23" y1="1" y2="23"/></svg>
  ),
  Brain: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
  ),
  Pencil: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Send: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
  ),
  Search: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Code: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  Paperclip: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
  ),
  Sparkles: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 7h4"/><path d="M3 5h4"/></svg>
  ),
  ChevronDown: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
  ),
  Globe: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
  ),
  Copy: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
  ),
  Check: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  ThumbsUp: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
  ),
  ThumbsDown: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 0 1.84 2.75l-2.66 8.12A2 2 0 0 1 17.33 22H4a2 2 0 0 1-2-2v-6"/></svg>
  ),
  RotateCw: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
  ),
  Share2: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
  ),
  MoreHorizontal: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
  ),
  Edit: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
  ),
  Clock: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Flag: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
  ),
  OpenAI: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.045 6.045 0 0 0 6.5146 2.9001A5.9995 5.9995 0 0 0 13.259 24a6.055 6.055 0 0 0 5.7718-4.2058 5.989 5.989 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7466-7.073ZM13.259 21.7772a3.6321 3.6321 0 0 1-3.6973-2.4956l-.1305-.4255-1.2336.7131a3.8058 3.8058 0 0 1-2.643.0952 3.7632 3.7632 0 0 1-2.471-1.826L2.97 17.635a3.7565 3.7565 0 0 1 .3217-3.092l.1282-.2208-1.2336-.7131a3.8245 3.8245 0 0 1-1.3215-1.9758 3.7507 3.7507 0 0 1 1.1542-2.861l.1092-.1022.0475-1.4214a3.7942 3.7942 0 0 1 3.1205-1.7115 3.7438 3.7438 0 0 1 2.6477 1.145l.1092.126.9049-1.095a3.792 3.792 0 0 1 2.643.0951 3.7656 3.7656 0 0 1 2.471 1.8262l.114.204 1.236-.7155a3.7565 3.7565 0 0 1-.3217 3.0945l-.1305.2233 1.2312.7107a3.8174 3.8174 0 0 1 1.3239 1.9783 3.7554 3.7554 0 0 1-1.1542 2.8585l-.1092.1047-.0475 1.4214a3.7942 3.7942 0 0 1-3.1181 1.7115 3.7438 3.7438 0 0 1-2.6525-1.145l-.1092-.1284-.9049 1.0974a3.7709 3.7709 0 0 1-2.643.0951Zm-1.3048-4.3697a2.4375 2.4375 0 0 0 2.2121-1.2921l.6916-1.1974-1.2193-.7037-.6679 1.1546a1.0592 1.0592 0 0 1-1.7864-.4632l-.1236-.6082-1.3952.3231.2922 1.4191a2.4564 2.4564 0 0 0 1.9964 1.3678ZM5.2109 8.5659a2.4303 2.4303 0 0 0 2.3997-2.3831V4.805l-1.4071-.0024-.0024 1.3326a1.0616 1.0616 0 0 1-1.3535.9335l-.601-.1212-.3231 1.3952 1.2874.2233ZM7.4774 20.1337a2.4517 2.4517 0 0 0 1.0785-3.2443l-.6916-1.2021-1.2193.7037.6655 1.1569a1.0592 1.0592 0 0 1-.4608 1.7839l-.6033.1236.3231 1.3928 1.4167-.2851.0048-.0048Zm4.5226-6.939-2.3974-1.3833 1.198-2.0763 2.4021 1.3857-1.2026 2.0739Zm6.7874-3.375a2.4421 2.4421 0 0 0-1.0808 3.2443l.694 1.1997 1.2169-.7037-.6655-1.1545a1.0592 1.0592 0 0 1 .4608-1.784l.601-.1236-.3207-1.3928-1.4167.2851.0024.0024Zm-1.2217-3.3964a1.064 1.064 0 0 1 1.7864.4608l.1212.6034 1.3952-.3207-.2922-1.4191a2.4493 2.4493 0 0 0-1.994-1.3701L17.402 5.004l-.694 1.1998 1.2193.7037.6631-1.1546Zm-6.3474 8.3565a1.0616 1.0616 0 0 1 1.3511-.9311l.601.1212.3231-1.3952-1.285-.2209a2.4256 2.4256 0 0 0-2.4021 2.3807v1.381l1.4071.0023.0048-1.3373Z"/></svg>
  ),
  Claude: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17.68 12.5c-1.57-.02-3.15-.21-4.7-.56.43.94.83 1.89 1.18 2.85 1.17 3.17 2.29 6.37 4.25 9.21h1.58c-2.21-3.21-3.47-6.81-4.79-10.37.89.06 1.78.04 2.67-.05.28-.02.56-.06.84-.1.66-.09 1.33-.22 1.99-.42l1.06-.32c.35-.11.7-.23 1.04-.37l1.21-.49V8.24c-1.33 1.2-3.55 2.71-5.33 4.26ZM15.2 11.77c-.86 2.14-1.7 4.29-2.46 6.45-.24.68-.46 1.36-.67 2.04l-.53 1.74h1.52c.44-1.36.9-2.7 1.39-4.03 1.07-2.92 2.21-5.8 3.53-8.57-1.03.75-1.93 1.54-2.78 2.37Zm-8.25 1.58c-1.09 2.27-1.68 4.71-2.77 7.03-.34.71-.67 1.44-.97 2.17-.11.25-.21.51-.31.76-.01.03-.02.05-.03.08h1.52c1.04-2.39 1.98-4.82 3.17-7.14 1.55-3.02 3.43-5.87 5.61-8.58-2.01 1.79-4.26 3.68-6.22 5.68Zm-2.08-2.89c1.01-1.86 2.11-3.66 3.29-5.4 1.45-2.15 3-4.19 4.68-6.12-2.07 1.97-3.96 4.1-5.77 6.31-.91 1.11-1.78 2.25-2.6 3.43-.41.59-.81 1.19-1.2 1.8l.8.07c.27.02.53-.01.8-.09ZM11.36.3c1.94 1.65 3.62 3.52 4.98 5.58-.56-.6-1.15-1.18-1.75-1.73-.98-.9-2.02-1.73-3.1-2.49-.72-.51-1.47-.98-2.23-1.42.7-.03 1.4.05 2.1.06Z"/></svg>
  ),
  Grok: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
  ),
  Moonshot: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
  ),
  Meta: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm0 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-8c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
  ),
  Microsoft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.55 2H2v9.55h9.55V2zm0 10.45H2V22h9.55v-9.55zm.45-10.45h9.55v9.55H12V2zm0 10.45h9.55V22H12v-9.55z"/></svg>
  ),
  Mistral: ({ className }) => (
     <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 3.5h17v17h-17z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M7 17V7l5 5 5-5v10" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
  ),
  Nvidia: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 12.5c0 4.7-3.8 8.5-8.5 8.5s-8.5-3.8-8.5-8.5 3.8-8.5 8.5-8.5c.6 0 1.1.1 1.7.2.4.1.6.6.5 1-.1.4-.5.6-.9.5-.4-.1-.9-.1-1.3-.1-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7c0-.4-.1-.9-.2-1.3-.1-.4.1-.8.5-.9.4-.1.8.1.9.5.2.5.3 1.1.3 1.6zm-4.8-1.8c-.3-.2-.7-.1-.9.2-.4.5-1.1.8-1.8.8-.7 0-1.3-.3-1.7-.8-.2-.3-.6-.4-.9-.2-.3.2-.4.6-.2.9.6.8 1.6 1.3 2.8 1.3 1.2 0 2.1-.5 2.8-1.3.2-.3.1-.7-.1-.9zm1.3-2.6c-.4-.5-1.2-1.1-2.3-1.1s-2 .5-2.3 1.1c-.2.3-.6.4-.9.2-.3-.2-.4-.6-.2-.9.6-1 1.9-1.7 3.4-1.7s2.8.8 3.4 1.7c.2.3.1.7-.2.9-.3.2-.7.1-.9-.2z"/></svg>
  ),
  Perplexity: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
  ),
  Seeddream: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Alibaba: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm13.7 15.5c.8 0 1.3-.6 1.3-1.5s-.5-1.5-1.3-1.5c-1 0-1.4 1.2-1.4 1.2s-.4-1.2-1.4-1.2c-.8 0-1.3.6-1.3 1.5s.5 1.5 1.3 1.5c1 0 1.4-1.2 1.4-1.2s.4 1.2 1.4 1.2zM6.5 18.5h3v-3h-3v3zm0-4.5h3v-3h-3v3zm0-4.5h3v-3h-3v3zm4.5 0h3v-3h-3v3zm4.5 0h3v-3h-3v3z"/></svg>
  ),
  Google: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.373-1.133 8.573-3.427 2.24-2.24 2.933-5.52 2.933-8.133 0-.8-.067-1.573-.187-2.32h-11.32Z"/></svg>
  )
};
