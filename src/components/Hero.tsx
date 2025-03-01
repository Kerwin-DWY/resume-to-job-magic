
import React from 'react';
import { AnimatedText } from './AnimatedText';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="animated-bg" />
      
      <div className="max-w-4xl text-center z-10 space-y-6">
        <div className="inline-block text-xs font-medium bg-black text-white py-1 px-3 rounded-full mb-6 animate-fade-in">
          Powered by AI
        </div>
        
        <AnimatedText
          text="Transform Your Job Search with AI"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          delay={100}
        />
        
        <AnimatedText
          text="Upload your resume and let our AI handle everything from parsing your skills to applying for the perfect job matches."
          el="p"
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4"
          delay={400}
        />
        
        <div className="flex justify-center mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <Button 
            onClick={onGetStarted} 
            size="lg" 
            className="group bg-black hover:bg-black/90 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full flex justify-center opacity-0 animate-fade-in" style={{ animationDelay: '1200ms' }}>
        <div className="rounded-full h-12 w-12 flex items-center justify-center border border-gray-200 bg-white/50 backdrop-blur-sm animate-float">
          <ArrowRight className="h-5 w-5 -rotate-90" />
        </div>
      </div>
    </div>
  );
};
