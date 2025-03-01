
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: keyof JSX.IntrinsicElements;
  delay?: number;
  once?: boolean;
}

export const AnimatedText = ({
  text,
  className,
  el: Wrapper = 'h1',
  delay = 0,
  once = false,
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLElement | null>(null);
  const textArray = text.split(' ');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('animate-fade-in');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    
    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, [once]);
  
  return (
    <Wrapper
      ref={textRef}
      className={cn('opacity-0', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="reveal-text">
        {textArray.map((word, i) => (
          <span
            key={i}
            className="inline-block"
            style={{ '--index': i } as React.CSSProperties}
          >
            {word}{i !== textArray.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </Wrapper>
  );
};
