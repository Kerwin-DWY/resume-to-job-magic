import React, { useState, useRef } from 'react';
import { GlassCard } from './GlassCard';
import { Upload, Check, AlertCircle } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

interface ResumeUploaderProps {
  onFileProcessed: (fileContent: string, fileName: string) => void;
}

export const ResumeUploader = ({ onFileProcessed }: ResumeUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const resetState = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setIsDragging(false);
    setIsSuccess(false);
    setFileName('');
  };

  const processFile = (file: File) => {
    if (!file) return;
    
    if (!/\.(pdf|docx|doc|txt)$/i.test(file.name)) {
      setError('Please upload a PDF, Word document, or text file');
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, Word document, or text file",
        variant: "destructive",
      });
      resetState();
      return;
    }
    
    setFileName(file.name);
    setIsUploading(true);
    setError('');
    
    // Simulate file upload progress
    let progress = 0;
    const intervalId = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(intervalId);
      }
    }, 100);

    // Read the file content
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      clearInterval(intervalId);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setIsSuccess(true); // ✅ Ensure success message shows

        // Pass the file content to the parent component
        onFileProcessed(fileContent, file.name);

        toast({
          title: "Resume uploaded successfully",
          description: "We're now processing your resume...",
        });
      }, 1000);
    };

    reader.onerror = () => {
      clearInterval(intervalId);
      setError('Error reading file');
      toast({
        title: "Error",
        description: "Failed to read file. Please try again.",
        variant: "destructive",
      });
      resetState();
    };

    reader.readAsText(file);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatedText
        text="Upload Your Resume"
        el="h2"
        className="text-2xl font-semibold text-center mb-6"
      />
      
      <GlassCard
        className={`
          min-h-[300px] flex flex-col items-center justify-center text-center relative overflow-hidden
          ${isDragging ? 'ring-2 ring-primary' : ''}
        `}
      >
        {!isUploading && !isSuccess ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center py-12 px-4"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {isDragging ? "Drop your resume here" : "Drag & drop your resume here"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Upload your resume in PDF, Word, or text format for our AI to analyze
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="input-file hidden"
            />
            {error && (
              <div className="text-destructive flex items-center mt-4">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>{error}</span>
              </div>
            )}
          </div>
        ) : isUploading ? (
          <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4">
            <div className="w-full max-w-md space-y-4">
              <p className="text-lg font-medium">{fileName}</p>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
            <div className="rounded-full bg-green-100 p-4 mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Resume Uploaded Successfully</h3>
            <p className="text-muted-foreground">{fileName}</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
