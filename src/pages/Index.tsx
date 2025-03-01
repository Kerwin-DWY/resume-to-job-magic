
import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { ResumeUploader } from '@/components/ResumeUploader';
import { ResumeParser } from '@/components/ResumeParser';
import { JobList } from '@/components/JobList';

const Index = () => {
  const [step, setStep] = useState<'landing' | 'upload' | 'parsing' | 'jobs'>('landing');
  const [fileContent, setFileContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [resumeData, setResumeData] = useState<any>(null);
  
  const handleGetStarted = () => {
    setStep('upload');
    
    // Smooth scroll to the uploader
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleFileProcessed = (content: string, name: string) => {
    setFileContent(content);
    setFileName(name);
    setStep('parsing');
    
    // Smooth scroll to parser
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleParsingComplete = (data: any) => {
    setResumeData(data);
    setStep('jobs');
    
    // Smooth scroll to job list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen w-full pb-20">
      {step === 'landing' && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {step === 'upload' && (
        <div className="pt-20 px-4">
          <ResumeUploader onFileProcessed={handleFileProcessed} />
        </div>
      )}
      
      {step === 'parsing' && fileContent && (
        <div className="pt-20 px-4">
          <ResumeParser 
            fileContent={fileContent} 
            fileName={fileName}
            onParsingComplete={handleParsingComplete}
          />
        </div>
      )}
      
      {step === 'jobs' && resumeData && (
        <div className="pt-20 px-4">
          <JobList resumeData={resumeData} />
        </div>
      )}
    </div>
  );
};

export default Index;
