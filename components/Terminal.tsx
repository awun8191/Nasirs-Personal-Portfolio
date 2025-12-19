import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const script = [
    "> import sys",
    "> from dauda_nasir import Profile",
    "> loading profile...",
    "> print(Profile.bio)",
    "----------------------------------------",
    "ROLE: Senior Software Engineer",
    "FOCUS: Scalable Systems & AI",
    "STACK: Python, Flutter, TensorFlow, AWS",
    "STATUS: Ready for new challenges...",
    "----------------------------------------",
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeLine = () => {
      if (lineIndex >= script.length) {
        setIsTyping(false);
        return;
      }

      const currentLine = script[lineIndex];
      
      // Instant print for separator lines or results, typing effect for commands
      if (!currentLine.startsWith('>')) {
         setLines(prev => {
            const newLines = [...prev];
            if (newLines[lineIndex] !== currentLine) {
                newLines[lineIndex] = currentLine;
            } else {
                // If line already exists (from re-render), don't duplicate logic
                return prev;
            }
            return newLines;
         });
         // Fill empty slot if needed
         if (lines.length <= lineIndex) {
            setLines(prev => [...prev, currentLine]);
         }
         
         lineIndex++;
         timeout = setTimeout(typeLine, 300);
      } else {
        // Typing effect
        if (charIndex <= currentLine.length) {
          setLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = currentLine.substring(0, charIndex);
            return newLines;
          });
          charIndex++;
          timeout = setTimeout(typeLine, 30 + Math.random() * 50);
        } else {
          lineIndex++;
          charIndex = 0;
          timeout = setTimeout(typeLine, 400);
        }
      }
    };

    // Initial empty lines
    setLines(Array(script.length).fill(""));
    timeout = setTimeout(typeLine, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden font-mono text-sm md:text-base border border-gray-800">
      {/* Window Header */}
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
        </div>
        <div className="flex items-center text-gray-400 gap-2 text-xs">
            <TerminalIcon size={12} />
            <span>dauda_profile.py — zsh</span>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Terminal Body */}
      <div className="p-6 h-[400px] text-green-400 overflow-y-auto custom-scrollbar">
        {lines.map((line, idx) => (
          <div key={idx} className="min-h-[1.5em] whitespace-pre-wrap">
            {line}
            {idx === lines.findIndex(l => l.length < script[lines.findIndex(s => s === l)]?.length ?? -1) && isTyping && (
              <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle"></span>
            )}
          </div>
        ))}
        {!isTyping && (
           <div className="mt-2 flex items-center">
              <span className="text-blue-400 mr-2">➜</span>
              <span className="text-yellow-300 mr-2">~</span>
              <span className="animate-pulse inline-block w-2 h-4 bg-gray-400"></span>
           </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;