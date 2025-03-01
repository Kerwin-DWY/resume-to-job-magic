
import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Loader2 } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { parseResume } from '@/utils/resumeParser';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ResumeParserProps {
  fileContent: string;
  fileName: string;
  onParsingComplete: (resumeData: any) => void;
}

export const ResumeParser = ({ 
  fileContent, 
  fileName,
  onParsingComplete 
}: ResumeParserProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const parseResumeContent = async () => {
      try {
        setIsLoading(true);
        
        // Simulate a delay for AI processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const parsedData = await parseResume(fileContent);
        setResumeData(parsedData);
        onParsingComplete(parsedData);
        
        toast({
          title: "Resume parsed successfully",
          description: "We've extracted your professional details and skills.",
        });
      } catch (error) {
        console.error('Error parsing resume:', error);
        toast({
          title: "Error parsing resume",
          description: "We encountered an issue while analyzing your resume. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    parseResumeContent();
  }, [fileContent, onParsingComplete, toast]);
  
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <AnimatedText
          text="Analyzing Your Resume"
          el="h2"
          className="text-2xl font-semibold text-center mb-6"
        />
        
        <GlassCard className="min-h-[200px] flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Extracting Information</h3>
            <p className="text-muted-foreground max-w-md">
              Our AI is analyzing {fileName} to identify skills, experience, and qualifications
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatedText
        text="Resume Analysis"
        el="h2"
        className="text-2xl font-semibold text-center mb-6"
      />
      
      <GlassCard className="animate-fade-in">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{resumeData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{resumeData.email}</p>
              </div>
              {resumeData.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{resumeData.phone}</p>
                </div>
              )}
              {resumeData.location && (
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{resumeData.location}</p>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-medium mb-2">Experience</h3>
            <div className="space-y-4">
              {resumeData.experience.map((exp: any, index: number) => (
                <div key={index} className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h4 className="font-medium">{exp.title}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                  </div>
                  <p className="mt-2 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {resumeData.education && resumeData.education.length > 0 && (
            <>
              <Separator />
              
              <div>
                <h3 className="text-xl font-medium mb-2">Education</h3>
                <div className="space-y-4">
                  {resumeData.education.map((edu: any, index: number) => (
                    <div key={index} className="bg-secondary/50 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-muted-foreground">{edu.institution}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {edu.startDate} - {edu.endDate || 'Present'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => onParsingComplete(resumeData)} 
              size="lg" 
              className="bg-black hover:bg-black/90 text-white rounded-full px-8 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Continue to Job Search
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
