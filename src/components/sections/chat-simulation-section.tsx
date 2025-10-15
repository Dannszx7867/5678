'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Model } from '@/app/data/models';
import { cn } from '@/lib/utils';
import Script from 'next/script';

type Message = {
  id: number;
  sender: 'user' | 'model';
  type: 'text' | 'audio' | 'image' | 'options' | 'button' | 'video';
  content: string;
  time: string;
  options?: { text: string; action: () => void }[];
  buttonText?: string;
  onButtonClick?: () => void;
};

type ChatSimulationSectionProps = {
  model: Model;
  onContinue: () => void;
};

const getCurrentTime = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

const audioMap: { [key: string]: string } = {
  audio1: '9ybr27cnqh',
  audio2: '6l3ti82ptt',
  audio3: 'yz8139pbct',
  audio4: 'e7hqkyehf3',
};

const WistiaAudioPlayer = ({ mediaId }: { mediaId: string }) => {
  return (
    <>
      <Script src="https://fast.wistia.com/player.js" async />
      <Script src={`https://fast.wistia.com/embed/${mediaId}.js`} async type="module" />
      <style>{`wistia-player[media-id='${mediaId}']:not(:defined) { display: block; filter: blur(5px); padding-top:100%; }`}</style>
      <div className="w-64 h-16 bg-transparent rounded-2xl flex items-center p-2 relative overflow-hidden">
        <wistia-player media-id={mediaId} swatch="false" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, willChange: 'transform' }}></wistia-player>
      </div>
    </>
  );
};


export default function ChatSimulationSection({ model, onContinue }: ChatSimulationSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatFinished, setIsChatFinished] = useState(false);
  const [awaitingUserResponse, setAwaitingUserResponse] = useState(false);
  const hasSentInitialMessage = useRef(false);
  
  const addMessage = (msg: Omit<Message, 'id' | 'time'>) => {
    setMessages(prev => [...prev, { ...msg, id: prev.length, time: getCurrentTime() }]);
  };

  const simulateRecordingAndAddAudio = (audioKey: string, nextStepFn: () => void) => {
    setIsTyping(false);
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      addMessage({ sender: 'model', type: 'audio', content: audioKey });
      setTimeout(nextStepFn, 1000);
    }, 5000);
  };
  
  const handleUserMessage = () => {
    if (!inputValue.trim() || !awaitingUserResponse) return;

    addMessage({ sender: 'user', type: 'text', content: inputValue });
    setInputValue('');
    setAwaitingUserResponse(false);
  };
  
  const runChatFlow = (step: number) => {
    setCurrentStep(step);
    setIsTyping(true);

    switch (step) {
      case 1: // Initial model message
        if (hasSentInitialMessage.current) return;
        hasSentInitialMessage.current = true;
        setTimeout(() => {
            addMessage({ sender: 'model', type: 'text', content: 'Hola, ¿cómo estás, amorcito?🥰' });
            setIsTyping(false);
            setAwaitingUserResponse(true);
        }, 1500);
        break;
      
      case 2: // Audio 1
        simulateRecordingAndAddAudio('audio1', () => runChatFlow(3));
        break;
        
      case 3: // Audio 2
        simulateRecordingAndAddAudio('audio2', () => runChatFlow(4));
        break;

      case 4: // Déjame ver
        setTimeout(() => {
            addMessage({ sender: 'model', type: 'text', content: 'Déjame ver, ¿mi amor?😍' });
            setIsTyping(false);
            setAwaitingUserResponse(true);
        }, 4500);
        break;
        
      case 5: // Blurred Image -> Video
        setTimeout(() => {
            addMessage({ sender: 'model', type: 'video', content: '/video_07.mp4' });
            setIsTyping(false);
            setTimeout(() => runChatFlow(6), 1500);
        }, 2000);
        break;
        
      case 6: // Te gustó?
         setTimeout(() => {
            addMessage({ sender: 'model', type: 'text', content: '¿Te gustó mi amor?🤭' });
            setIsTyping(false);
            setAwaitingUserResponse(true);
        }, 1000);
        break;
        
      case 7: // Audio 3
        simulateRecordingAndAddAudio('audio3', () => {
          setIsTyping(false);
          setAwaitingUserResponse(true);
        });
        break;
        
      case 8: // Audio 4
        simulateRecordingAndAddAudio('audio4', () => runChatFlow(9));
        break;
      
      case 9: // New message after audio 4
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            addMessage({ sender: 'model', type: 'text', content: 'Haz clic aquí para tenerme a mí y a mis amigas, amor😍👇' });
            setIsTyping(false);
            runChatFlow(10);
          }, 1500)
        }, 8000); // 8 seconds
        break;

      case 10: // Finish chat
        setTimeout(() => {
            setIsTyping(false);
            setIsChatFinished(true);
        }, 2200);
        break;
    }
  };

  useEffect(() => {
    if (currentStep === 0) {
      runChatFlow(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (awaitingUserResponse) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender !== 'user') return;
    
    // Always proceed to the next step after a user message when expected
    const nextStepMap: { [key: number]: number } = {
        1: 2,  // After "Hola, como estas" -> Audio 1
        4: 5,  // After "Déjame ver" -> Blurred image
        6: 7,  // After "Te gusto?" -> Audio 3
        7: 8   // After Audio 3 -> Audio 4
    };

    if (nextStepMap[currentStep]) {
        setTimeout(() => runChatFlow(nextStepMap[currentStep]), 1000);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awaitingUserResponse, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isRecording]);

  return (
    <section className="bg-white h-screen w-screen">
      <div className="container mx-auto max-w-2xl h-full">
        <div className="flex flex-col bg-white overflow-hidden h-full">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image alt={model.name} loading="lazy" width="48" height="48" decoding="async" data-nimg="1" className="h-full w-full object-cover" src={model.imageUrl} />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border border-white"></div>
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h2 className="text-lg font-semibold text-gray-900">{model.name}</h2>
                  </div>
                  <p className="text-sm text-gray-500">
                     {isRecording ? <span className='text-red-500 animate-pulse'>Grabando...</span> : (isTyping ? 'Escribiendo...' : 'Activo ahora')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center my-2">
                <div className="px-4 py-1 rounded-full bg-gray-100 text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Hoy
                </div>
              </div>
              {messages.map((msg) => (
                <div key={msg.id} style={{ opacity: 1, transform: 'none' }}>
                    <div className={cn('flex items-end', msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                        {msg.sender === 'model' && (
                            <div className="mr-2 h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                            <Image alt="Profile" width="40" height="40" className="h-full w-full object-cover" src={model.imageUrl} loading="lazy" />
                            </div>
                        )}
                        <div className={cn('max-w-[75%] rounded-2xl px-4 py-3', 
                            msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-gray-100 text-primary rounded-bl-none',
                            (msg.type === 'options' || msg.type === 'button') && 'bg-transparent p-0',
                             msg.type === 'audio' && 'bg-transparent p-0',
                             msg.type === 'video' && 'bg-transparent p-0'
                        )}>
                            {msg.type === 'text' && <p className={cn("text-base", msg.sender === 'model' ? "text-primary" : "")}>{msg.content}</p>}
                            {msg.type === 'audio' && <WistiaAudioPlayer mediaId={audioMap[msg.content]} />}
                            {msg.type === 'video' && (
                                <div className="relative aspect-square w-48 h-48 rounded-lg overflow-hidden">
                                    <video src={msg.content} autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" style={{ willChange: 'transform' }} />
                                </div>
                            )}
                            {msg.type === 'button' && msg.onButtonClick && (
                                <Button onClick={msg.onButtonClick} size="lg" className="rounded-full bg-primary text-white font-bold">{msg.buttonText}</Button>
                            )}
                            {msg.type === 'options' && (
                                <div className="flex gap-2">
                                    {msg.options?.map((opt, i) => (
                                        <Button key={i} onClick={opt.action} variant='outline' className='rounded-full border-primary text-primary font-bold'>{opt.text}</Button>
                                    ))}
                                </div>
                            )}
                            <div className={cn("mt-1 text-right text-xs text-gray-400", (msg.type === 'options' || msg.type === 'button' || msg.type === 'image' || msg.type === 'audio' || msg.type === 'video') && 'hidden' )}>{msg.time}</div>
                        </div>
                    </div>
                </div>
              ))}
              {(isTyping && !isRecording) && (
                <div className="flex justify-start items-end">
                  <div className="mr-2 h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                    <Image alt="Profile" width="40" height="40" className="h-full w-full object-cover" src={model.imageUrl} loading="lazy" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-gray-100 text-gray-900 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-gray-400/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-gray-400/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-gray-400/50 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-3">
            {isChatFinished ? (
              <Button onClick={onContinue} size="lg" className="w-full rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90 px-10 py-7 shadow-lg shadow-primary/30 active:scale-95">
                Validar y Continuar
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    className="flex h-10 w-full border border-gray-300 px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed md:text-sm rounded-full bg-gray-100 py-6 pl-5 pr-12 text-gray-900 text-base focus:border-primary"
                    placeholder="Mensaje..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUserMessage()}
                    disabled={!awaitingUserResponse || isTyping || isRecording}
                  />
                </div>
                <Button size="icon" className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90" onClick={handleUserMessage} disabled={!inputValue.trim() || !awaitingUserResponse || isTyping || isRecording}>
                  {inputValue ? <Send className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
