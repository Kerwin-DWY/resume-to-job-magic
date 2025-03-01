
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard = ({ 
  children, 
  className,
  hoverEffect = true 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 transition-all duration-300',
        hoverEffect && 'hover:shadow-xl hover:translate-y-[-2px]',
        className
      )}
    >
      {children}
    </div>
  );
};
