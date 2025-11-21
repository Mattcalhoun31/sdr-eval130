'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Calendar, X, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type WidgetState = 'idle' | 'listening' | 'processing' | 'speaking';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface VoiceAIWidgetProps {
  onClose?: () => void;
  minimized?: boolean;
  onMinimize?: () => void;
}

export default function VoiceAIWidget({ onClose, minimized, onMinimize }: VoiceAIWidgetProps) {
  const [widgetState, setWidgetState] = useState<WidgetState>('idle');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  // Greet user on mount
  useEffect(() => {
    if (!hasGreeted && synthesisRef.current) {
      setTimeout(() => {
        speak("Hi! Welcome to Symmetri Growth. I'm your AI assistant. What brings you here today?");
        setHasGreeted(true);
      }, 1000);
    }
  }, [hasGreeted]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');

          setTranscript(currentTranscript);

          // Reset silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // Check if result is final
          const isFinal = event.results[event.results.length - 1].isFinal;
          if (isFinal) {
            // Set a timer to stop listening after 2 seconds of silence
            silenceTimerRef.current = setTimeout(() => {
              if (currentTranscript.trim()) {
                handleUserSpeech(currentTranscript);
              }
            }, 2000);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setWidgetState('idle');
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            // Restart if still in listening mode
            try {
              recognitionRef.current?.start();
            } catch (e) {
              console.error('Error restarting recognition:', e);
            }
          }
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [isListening]);

  const speak = (text: string) => {
    if (synthesisRef.current) {
      // Cancel any ongoing speech
      synthesisRef.current.cancel();

      // Check if user wants to book a meeting
      if (text.toLowerCase().includes('pull up our calendar') || text.toLowerCase().includes('schedule')) {
        setShowCalendar(true);
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setWidgetState('speaking');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setWidgetState('idle');
      };

      synthesisRef.current.speak(utterance);
    }
  };

  const handleUserSpeech = async (text: string) => {
    setTranscript('');
    setIsListening(false);
    setWidgetState('processing');
    setIsLoading(true);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    // Add user message to chat
    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          aiResponse += chunk;
        }
      }

      // Add assistant message
      const assistantMessage: Message = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, assistantMessage]);

      // Speak the response
      speak(aiResponse);
    } catch (error) {
      console.error('Error sending message:', error);
      setWidgetState('idle');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setWidgetState('idle');
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    } else {
      setIsListening(true);
      setWidgetState('listening');
      setTranscript('');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error('Error starting recognition:', e);
        }
      }
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
      setWidgetState('idle');
    }
  };

  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onMinimize}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-3 h-3 rounded-full animate-pulse",
            widgetState === 'listening' && "bg-green-400",
            widgetState === 'processing' && "bg-yellow-400",
            widgetState === 'speaking' && "bg-blue-400",
            widgetState === 'idle' && "bg-gray-300"
          )} />
          <div>
            <h3 className="font-semibold">Symmetri Growth AI</h3>
            <p className="text-xs opacity-90">
              {widgetState === 'listening' && 'Listening...'}
              {widgetState === 'processing' && 'Thinking...'}
              {widgetState === 'speaking' && 'Speaking...'}
              {widgetState === 'idle' && 'Ready to help'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Minimize"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Conversation Display */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Volume2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm">Click the microphone to start talking</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "p-3 rounded-lg max-w-[85%]",
              message.role === 'user'
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white border border-gray-200"
            )}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        ))}

        {transcript && (
          <div className="p-3 rounded-lg bg-blue-100 border-2 border-blue-300 max-w-[85%] ml-auto">
            <p className="text-sm text-blue-900">{transcript}</p>
            <p className="text-xs text-blue-600 mt-1">Speaking...</p>
          </div>
        )}

        {isLoading && (
          <div className="p-3 rounded-lg bg-white border border-gray-200 max-w-[85%]">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="absolute inset-0 bg-white p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Schedule a Meeting
            </h3>
            <button
              onClick={() => setShowCalendar(false)}
              className="hover:bg-gray-100 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 border rounded-lg overflow-hidden">
            {/* Replace with your Calendly URL */}
            <iframe
              src="https://calendly.com/your-link-here"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Replace the Calendly URL in the code with your actual booking link
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="p-4 bg-white border-t border-gray-200 flex gap-3 justify-center">
        <button
          onClick={toggleListening}
          disabled={isSpeaking || isLoading}
          className={cn(
            "p-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            isListening
              ? "bg-red-500 hover:bg-red-600 text-white shadow-lg scale-110"
              : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg hover:scale-105"
          )}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={stopSpeaking}
          disabled={!isSpeaking}
          className="p-4 rounded-full bg-gray-500 hover:bg-gray-600 text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          aria-label="Stop speaking"
        >
          <VolumeX className="w-6 h-6" />
        </button>

        <button
          onClick={() => setShowCalendar(true)}
          className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          aria-label="Schedule meeting"
        >
          <Calendar className="w-6 h-6" />
        </button>
      </div>

      {/* Browser compatibility warning */}
      {typeof window !== 'undefined' && !(window as any).SpeechRecognition && !(window as any).webkitSpeechRecognition && (
        <div className="p-3 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-800">
          ⚠️ Voice recognition not supported in this browser. Please use Chrome or Edge.
        </div>
      )}
    </div>
  );
}
