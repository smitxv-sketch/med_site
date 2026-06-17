import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GhostTypingProps {
  text: string;
  startDelay?: number;
  typingSpeed?: number;
  highlightFirstWord?: boolean;
}

export function GhostTyping({
  text,
  startDelay = 0,
  typingSpeed = 25,
  highlightFirstWord = false // By default do not highlight the first word, unless explicitly requested, because the overlay logic handles visibility
}: GhostTypingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Reset state when text changes
    setCurrentIndex(0);
    setIsTyping(false);

    const startTyping = () => {
      setIsTyping(true);
      
      const typeNextChar = () => {
        setCurrentIndex((prev) => {
          if (prev < text.length) {
            // Slight randomization for natural typing feel
            const delay = typingSpeed + (Math.random() * 20 - 10);
            timeoutId = setTimeout(typeNextChar, delay);
            return prev + 1;
          } else {
            setIsTyping(false);
            return prev;
          }
        });
      };

      typeNextChar();
    };

    if (startDelay > 0) {
      timeoutId = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => clearTimeout(timeoutId);
  }, [text, startDelay, typingSpeed]);

  const firstWordMatch = text.match(/^\S+/);
  const firstWordLen = firstWordMatch ? firstWordMatch[0].length : 0;

  return (
    <span className="relative w-full font-inherit" aria-hidden="true">
      {/* 
        ROBUST LAYOUT STRATEGY (Сильное решение):
        We render the entire string using inline spans. This ensures the browser 
        calculates the exact required height and handles word-breaks natively at all times.
        We simply toggle opacity for characters that haven't been "typed" yet.
      */}
      {text.split('').map((char, index) => {
        const isBrandColor = highlightFirstWord && index < firstWordLen;
        const colorClass = isBrandColor ? 'text-brand' : 'text-inherit';
        
        return (
          <span
            key={index}
            className={`${colorClass} ${index < currentIndex ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}
          >
            {char}
          </span>
        );
      })}
      
      {/* Absolute Cursor that doesn't push layout */}
      {isTyping && (
         <span className="relative inline-block w-0 h-0">
           <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 -translate-y-[45%] left-0.5 w-[3px] h-[1.1em] bg-brand"
           />
         </span>
      )}
      {/* Screen Reader Only text */}
      <span className="sr-only">{text}</span>
    </span>
  );
}
