import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  PhoneCall,
  PhoneOff,
  RotateCcw,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  AlertTriangle,
  RefreshCw,
  Mic,
  MicOff,
  Radio,
  Play,
  Square,
} from 'lucide-react';
import { DemoChatMessage } from '../types';

const BASE_URL = 'https://mycallagent-aug-1008791897094.us-east1.run.app';
const PROXY_URL = '/api-agent';

// Declare SpeechRecognition for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const DemoPage: React.FC = () => {
  const [callState, setCallState] = useState<'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'>('CONNECTING');
  const [statusText, setStatusText] = useState<string>('Connecting to API session...');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [isConnectingSession, setIsConnectingSession] = useState<boolean>(true);

  // Initial greeting
  const INITIAL_GREETING = "Hello Mrs. Rigby! This is Aftercare following up from St. Jude Hospital regarding your knee replacement surgery 3 days ago. How are you feeling today?";

  const [messages, setMessages] = useState<DemoChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'agent',
      text: INITIAL_GREETING,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoadingReply, setIsLoadingReply] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  
  // Real-time Voice / Mic & TTS state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [micError, setMicError] = useState<string | null>(null);
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Setup Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Text-To-Speech Playback function
  const speakText = useCallback((text: string, msgId?: string) => {
    if (!synthRef.current || isAudioMuted) return;

    // Clean markdown symbols for natural audio speech
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    if (!cleanText) return;

    // Stop current speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try to pick a natural-sounding English voice
    const voices = synthRef.current.getVoices();
    const naturalVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (msgId) setActiveSpeakingMsgId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpeakingMsgId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveSpeakingMsgId(null);
    };

    synthRef.current.speak(utterance);
  }, [isAudioMuted]);

  // Stop TTS playback
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setActiveSpeakingMsgId(null);
    }
  };

  // Speak initial greeting on load (if not muted)
  useEffect(() => {
    if (callState === 'CONNECTED' && !isAudioMuted) {
      speakText(INITIAL_GREETING, 'msg-init');
    }
  }, [callState, isAudioMuted, speakText]);

  // Setup Speech Recognition (Microphone Speech-to-Text)
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setMicError(null);
        setStatusText('Listening to microphone...');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputMessage(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setMicError('Microphone permission blocked. Please allow mic access in your browser.');
        } else if (event.error !== 'no-speech') {
          setMicError(`Mic error: ${event.error}`);
        }
        setStatusText('Connected • Speak now');
      };

      recognition.onend = () => {
        setIsListening(false);
        setStatusText('Connected • Speak now');
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Failed to initialize Speech Recognition:', err);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, []);

  // Toggle Microphone recording
  const toggleListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      stopSpeaking();
      setInputMessage('');
      setMicError(null);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.error('Error starting recognition:', err);
        }
      }
    }
  };

  // Auto scroll transcript to bottom on message update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoadingReply, isSpeaking]);

  // Helper to call backend endpoint trying direct URL first, then Vite proxy fallback
  const apiFetch = async (path: string, options: RequestInit = {}) => {
    let lastError: any = null;
    
    // 1. Try Direct URL
    try {
      const res = await fetch(`${BASE_URL}${path}`, options);
      if (res.ok) return res;
      lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (err) {
      lastError = err;
    }

    // 2. Try Proxy URL fallback (bypasses browser CORS if needed)
    try {
      const proxyRes = await fetch(`${PROXY_URL}${path}`, options);
      if (proxyRes.ok) return proxyRes;
      lastError = new Error(`HTTP ${proxyRes.status}: ${proxyRes.statusText}`);
    } catch (err) {
      if (!lastError) lastError = err;
    }

    throw lastError || new Error('Network request failed');
  };

  // Create session on backend
  const initSession = async (): Promise<string | null> => {
    setIsConnectingSession(true);
    setSessionError(null);
    setCallState('CONNECTING');
    setStatusText('Connecting to API session...');

    try {
      const res = await apiFetch('/apps/app/users/web-user-01/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      const newSessionId = data.id || data.session_id || (typeof data === 'string' ? data : null);

      if (newSessionId) {
        setSessionId(newSessionId);
        setCallState('CONNECTED');
        setStatusText('Connected • Speak now');
        setIsConnectingSession(false);
        return newSessionId;
      } else {
        throw new Error('Backend response did not contain a session ID');
      }
    } catch (err: any) {
      console.error('Failed to establish API session:', err);
      const errMsg = err?.message || 'Network / CORS error connecting to server';
      setSessionError(`Unable to connect to session endpoint (${BASE_URL}/apps/app/users/web-user-01/sessions). Details: ${errMsg}`);
      setCallState('DISCONNECTED');
      setStatusText('Session Connection Error');
      setIsConnectingSession(false);
      return null;
    }
  };

  useEffect(() => {
    initSession();
  }, []);

  // Handle starting call manually
  const handleStartCall = async () => {
    if (!sessionId) {
      await initSession();
    } else {
      setCallState('CONNECTED');
      setStatusText('Connected • Speak now');
    }
  };

  // Handle ending call
  const handleEndCall = () => {
    stopSpeaking();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setCallState('DISCONNECTED');
    setStatusText('Call Ended');
  };

  // Handle Reset Session
  const handleResetSession = async () => {
    stopSpeaking();
    setMessages([
      {
        id: 'msg-init-' + Date.now(),
        sender: 'agent',
        text: INITIAL_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    await initSession();
  };

  // Send message directly to API
  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();

    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoadingReply) return;

    // Stop listening or speech if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    stopSpeaking();

    let activeSession = sessionId;
    if (!activeSession) {
      activeSession = await initSession();
      if (!activeSession) {
        const errNotice: DemoChatMessage = {
          id: 'msg-err-' + Date.now(),
          sender: 'agent',
          text: `⚠️ **Connection Error**: Cannot send message because session is not connected to API (${BASE_URL}). Click **Retry Connection** above.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errNotice]);
        return;
      }
    }

    if (callState !== 'CONNECTED') {
      setCallState('CONNECTED');
      setStatusText('Connected • Speak now');
    }

    const userText = textToSend.trim();
    setInputMessage('');

    const userMsg: DemoChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoadingReply(true);

    try {
      const payload = {
        app_name: 'app',
        user_id: 'web-user-01',
        session_id: activeSession,
        new_message: { parts: [{ text: userText }] },
      };

      const res = await apiFetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const events = await res.json();
      let agentResponseText = '';

      // Traverse events array for last text response
      if (Array.isArray(events)) {
        for (let i = events.length - 1; i >= 0; i--) {
          const ev = events[i];
          if (ev?.content?.parts && Array.isArray(ev.content.parts)) {
            const textPart = ev.content.parts.find((p: any) => p.text);
            if (textPart?.text) {
              agentResponseText = textPart.text;
              break;
            }
          } else if (ev?.text) {
            agentResponseText = ev.text;
            break;
          }
        }
      } else if (typeof events === 'object' && events !== null) {
        if (events.text) agentResponseText = events.text;
        else if (events.output) agentResponseText = events.output;
      }

      if (agentResponseText) {
        const agentMsgId = 'msg-' + Date.now();
        const agentMsg: DemoChatMessage = {
          id: agentMsgId,
          sender: 'agent',
          text: agentResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, agentMsg]);

        // Speak the AI agent response out loud!
        speakText(agentResponseText, agentMsgId);
      } else {
        const emptyMsg: DemoChatMessage = {
          id: 'msg-err-' + Date.now(),
          sender: 'agent',
          text: `⚠️ **API Warning**: API endpoint returned success but no text payload was found in event logs. Raw response: \`${JSON.stringify(events).slice(0, 150)}\``,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, emptyMsg]);
      }
    } catch (err: any) {
      console.error('API /run request failed:', err);
      const apiErrMsg: DemoChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'agent',
        text: `⚠️ **Network / API Error**: Failed to fetch response from \`${BASE_URL}/run\`. ${err?.message || 'Check network connection or server endpoint status.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, apiErrMsg]);
    } finally {
      setIsLoadingReply(false);
    }
  };

  // Preset sample prompts to help user test
  const handleQuickPrompt = (promptText: string) => {
    setInputMessage(promptText);
    handleSendMessage(undefined, promptText);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 w-full space-y-6 flex-1 flex flex-col">
        {/* HEADER SECTION */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs dark:shadow-xl transition-colors duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${callState === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Experience Aftercare AI Voice
              </h1>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Interactive clinical follow-up call with <strong className="text-slate-900 dark:text-slate-200">Eleanor Rigby</strong>. Speak into your microphone or type.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-auto">
            {sessionId && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <span className="text-slate-500 font-sans">Session ID:</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{sessionId}</span>
              </div>
            )}
            <button
              onClick={handleResetSession}
              disabled={isConnectingSession}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold border border-slate-200 dark:border-slate-700 disabled:opacity-50 transition-colors shadow-xs"
              title="Reset Session"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isConnectingSession ? 'animate-spin' : ''}`} />
              Reset Session
            </button>
          </div>
        </div>

        {/* NETWORK / SESSION ERROR BANNER */}
        {sessionError && (
          <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/80 rounded-2xl p-4 text-red-800 dark:text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-wider">Network / API Error</h3>
                <p className="text-xs text-red-700 dark:text-red-200 leading-relaxed">{sessionError}</p>
              </div>
            </div>
            <button
              onClick={initSession}
              disabled={isConnectingSession}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isConnectingSession ? 'animate-spin' : ''}`} />
              Retry Connection
            </button>
          </div>
        )}

        {/* MIC ERROR BANNER */}
        {micError && (
          <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-3 text-amber-800 dark:text-amber-200 flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{micError}</span>
          </div>
        )}

        {/* MAIN PHONE CALL INTERFACE CARD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors duration-200">
          {/* Top Status & AI Avatar */}
          <div className="flex flex-col items-center text-center space-y-4 pt-2">
            <div className="relative flex items-center justify-center my-4">
              {/* Ripple animation when agent is speaking */}
              {isSpeaking && (
                <>
                  <div className="absolute w-40 h-40 rounded-full bg-blue-500/20 dark:bg-blue-500/30 animate-ping border border-blue-400/40 pointer-events-none" />
                  <div className="absolute w-32 h-32 rounded-full bg-blue-500/30 dark:bg-blue-500/40 animate-pulse pointer-events-none" />
                </>
              )}

              {/* Ripple animation when user is listening */}
              {isListening && (
                <>
                  <div className="absolute w-40 h-40 rounded-full bg-emerald-500/20 dark:bg-emerald-500/30 animate-ping border border-emerald-400/40 pointer-events-none" />
                  <div className="absolute w-32 h-32 rounded-full bg-emerald-500/30 dark:bg-emerald-500/40 animate-pulse pointer-events-none" />
                </>
              )}

              {/* Centered Avatar */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white relative z-10 shadow-xl transition-all ${
                  isSpeaking
                    ? 'bg-blue-600 ring-4 ring-blue-400/50 scale-110 shadow-blue-500/50'
                    : isListening
                    ? 'bg-emerald-600 ring-4 ring-emerald-400/50 scale-110 shadow-emerald-500/50'
                    : callState === 'CONNECTED'
                    ? 'bg-blue-600 ring-4 ring-blue-500/30'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-300 dark:border-slate-700'
                }`}
              >
                <Bot className="w-10 h-10" />
              </div>
            </div>

            {/* Status text */}
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                Aftercare AI Agent
                {isSpeaking && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800">
                    <Radio className="w-3 h-3 animate-pulse text-blue-600 dark:text-blue-400" /> Speaking...
                  </span>
                )}
                {isListening && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800">
                    <Radio className="w-3 h-3 animate-pulse text-emerald-600 dark:text-emerald-400" /> Listening...
                  </span>
                )}
              </h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSpeaking
                      ? 'bg-blue-500 animate-ping'
                      : isListening
                      ? 'bg-emerald-500 animate-ping'
                      : callState === 'CONNECTED'
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-slate-700 dark:text-slate-300">{statusText}</span>
              </div>
            </div>
          </div>

          {/* CIRCULAR CALL / MIC / AUDIO CONTROLS */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-6">
            {/* MICROPHONE PUSH-TO-TALK BUTTON */}
            <button
              onClick={toggleListening}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${
                isListening
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-400/50 animate-pulse shadow-emerald-500/40 scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
              title={isListening ? 'Stop Microphone Listening' : 'Talk via Microphone'}
            >
              {isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <MicOff className="w-6 h-6" />}
            </button>

            {/* CALL DISCONNECT / START BUTTON */}
            {callState === 'DISCONNECTED' ? (
              <button
                onClick={handleStartCall}
                disabled={isConnectingSession}
                className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
                title="Start AI Call"
              >
                <PhoneCall className="w-8 h-8" />
              </button>
            ) : (
              <button
                onClick={handleEndCall}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
                title="End Call"
              >
                <PhoneOff className="w-8 h-8" />
              </button>
            )}

            {/* MUTE / UNMUTE SPEAKER AUDIO */}
            <button
              onClick={() => {
                const nextMute = !isAudioMuted;
                setIsAudioMuted(nextMute);
                if (nextMute) stopSpeaking();
              }}
              className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors shadow-xs ${
                isAudioMuted
                  ? 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isAudioMuted ? 'Unmute Audio Playback' : 'Mute Audio Playback'}
            >
              {isAudioMuted ? <VolumeX className="w-6 h-6 text-red-500" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          {/* QUICK SIMULATION PROMPT PILLS */}
          <div className="mb-4">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 text-center">
              Quick Test Patient Responses:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() =>
                  handleQuickPrompt(
                    "My pain is an 8 out of 10 today and my knee is really swollen and warm."
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-xs font-medium transition-colors shadow-xs"
              >
                🚨 Escalation: Pain 8/10 &amp; Swelling
              </button>

              <button
                onClick={() =>
                  handleQuickPrompt(
                    "I'm feeling much better today, pain is only a 2 or 3."
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium transition-colors shadow-xs"
              >
                ✅ Normal: Pain 2/10, doing well
              </button>

              <button
                onClick={() =>
                  handleQuickPrompt(
                    "When should I take my Oxycodone pill?"
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-xs font-medium transition-colors shadow-xs"
              >
                💊 Question: Medication instructions
              </button>
            </div>
          </div>

          {/* SCROLLABLE CHAT TRANSCRIPT AREA */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 p-4 space-y-4 max-h-72 overflow-y-auto mb-4" ref={chatContainerRef}>
            {messages.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs space-y-2">
                <p>No active call transcript yet.</p>
                <p>Click the green phone button above to initiate the call session.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-1 px-1">
                    {msg.sender === 'agent' ? (
                      <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Bot className="w-3 h-3" /> AI Voice Agent
                      </span>
                    ) : (
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Patient (Eleanor Rigby)
                      </span>
                    )}
                    <span>•</span>
                    <span>{msg.timestamp}</span>

                    {/* Play / Stop Audio button for agent messages */}
                    {msg.sender === 'agent' && (
                      <button
                        onClick={() => {
                          if (activeSpeakingMsgId === msg.id && isSpeaking) {
                            stopSpeaking();
                          } else {
                            speakText(msg.text, msg.id);
                          }
                        }}
                        className="ml-2 inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/60 transition-colors"
                        title="Replay Audio"
                      >
                        {activeSpeakingMsgId === msg.id && isSpeaking ? (
                          <>
                            <Square className="w-2.5 h-2.5 fill-current" /> Stop
                          </>
                        ) : (
                          <>
                            <Play className="w-2.5 h-2.5 fill-current" /> Listen
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div
                    className={`max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.sender === 'agent'
                        ? 'bg-blue-50 text-blue-950 border border-blue-200 dark:bg-blue-950/80 dark:text-blue-100 dark:border-blue-800/60 rounded-tl-xs shadow-xs'
                        : 'bg-white text-slate-900 border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 rounded-tr-xs shadow-xs'
                    }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))
            )}

            {/* THINKING ANIMATION WHEN WAITING */}
            {isLoadingReply && (
              <div className="flex flex-col items-start space-y-1">
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Bot className="w-3 h-3" /> AI Voice Agent
                </span>
                <div className="bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Processing real-time AI response...</span>
                </div>
              </div>
            )}
          </div>

          {/* FIXED INPUT & MIC CONTROLS AT THE BOTTOM */}
          <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
            {/* Push-to-Talk Mic Toggle Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3 rounded-xl border font-semibold text-xs flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400/50 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
              title={isListening ? 'Stop Mic' : 'Start Mic Recording'}
            >
              {isListening ? <Mic className="w-4 h-4 text-white animate-bounce" /> : <Mic className="w-4 h-4 text-slate-600 dark:text-slate-300" />}
            </button>

            <input
              type="text"
              placeholder={
                isListening
                  ? 'Listening... Speak into your microphone now'
                  : 'Type or speak patient reply (e.g., Pain is 8/10)...'
              }
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoadingReply || isConnectingSession}
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-colors shadow-xs"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoadingReply || isConnectingSession}
              className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
