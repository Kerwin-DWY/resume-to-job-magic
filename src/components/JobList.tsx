
import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { AnimatedText } from './AnimatedText';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Loader2, BriefcaseBusiness, CheckCircle2, Clock, MapPin, ExternalLink, Search } from 'lucide-react';
import { searchJobs } from '@/utils/jobSearch';
import { useToast } from '@/components/ui/use-toast';

interface JobListProps {
  resumeData: any;
}

export const JobList = ({ resumeData }: JobListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [applyingStatus, setApplyingStatus] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        
        // Simulate a delay for job searching
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const foundJobs = await searchJobs(resumeData);
        setJobs(foundJobs);
        
        if (foundJobs.length > 0) {
          setSelectedJob(foundJobs[0]);
        }
        
        toast({
          title: "Jobs found!",
          description: `We found ${foundJobs.length} matching jobs based on your resume.`,
        });
      } catch (error) {
        console.error('Error searching for jobs:', error);
        toast({
          title: "Error searching jobs",
          description: "We encountered an issue while searching for jobs. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadJobs();
  }, [resumeData, toast]);
  
  const filteredJobs = activeTab === 'all' 
    ? jobs 
    : jobs.filter(job => job.match_percentage >= 80);
  
  const handleAutoApply = async (jobId: string) => {
    setApplyingStatus(prev => ({ ...prev, [jobId]: 'processing' }));
    
    try {
      // Simulate AI application process
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      setApplyingStatus(prev => ({ ...prev, [jobId]: 'completed' }));
      
      toast({
        title: "Application Submitted!",
        description: "The AI has successfully applied to this job on your behalf.",
      });
    } catch (error) {
      console.error('Error applying to job:', error);
      setApplyingStatus(prev => ({ ...prev, [jobId]: 'error' }));
      
      toast({
        title: "Application Error",
        description: "There was an issue applying to this job. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const renderMatchBadge = (percentage: number) => {
    let color = "text-green-600 bg-green-100";
    if (percentage < 70) color = "text-yellow-600 bg-yellow-100";
    if (percentage < 50) color = "text-red-600 bg-red-100";
    
    return (
      <Badge variant="outline" className={`${color} px-2 py-1 ml-2`}>
        {percentage}% Match
      </Badge>
    );
  };
  
  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <AnimatedText
          text="Finding Your Ideal Jobs"
          el="h2"
          className="text-2xl font-semibold text-center mb-6"
        />
        
        <GlassCard className="min-h-[300px] flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-medium mb-2">Searching for Matching Jobs</h3>
            <p className="text-muted-foreground max-w-md">
              Our AI is analyzing job listings to find the best matches based on your skills and experience
            </p>
            <Progress value={65} className="h-2 max-w-md mx-auto mt-6" />
          </div>
        </GlassCard>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <AnimatedText
        text="Job Matches"
        el="h2"
        className="text-2xl font-semibold text-center mb-6"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <GlassCard className="h-full">
            <div className="mb-4">
              <div className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                <h3 className="text-xl font-medium">Results</h3>
                <span className="ml-2 text-sm bg-secondary py-1 px-2 rounded-full">
                  {jobs.length} jobs
                </span>
              </div>
              
              <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Jobs</TabsTrigger>
                  <TabsTrigger value="best">Best Matches</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No matching jobs found</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all duration-300 
                      ${selectedJob?.id === job.id ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 hover:bg-secondary'}
                    `}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium line-clamp-1">{job.title}</h4>
                        <p className={`text-sm ${selectedJob?.id === job.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {job.company}
                        </p>
                      </div>
                      {selectedJob?.id !== job.id && renderMatchBadge(job.match_percentage)}
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <MapPin className={`h-4 w-4 mr-1 ${selectedJob?.id === job.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
                      <span className={`text-xs ${selectedJob?.id === job.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {job.location}
                      </span>
                      <Clock className={`h-4 w-4 ml-3 mr-1 ${selectedJob?.id === job.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
                      <span className={`text-xs ${selectedJob?.id === job.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {job.posted_time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
        
        <div className="lg:col-span-2">
          {selectedJob ? (
            <GlassCard className="animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-medium">{selectedJob.title}</h3>
                    {renderMatchBadge(selectedJob.match_percentage)}
                  </div>
                  <p className="text-muted-foreground">{selectedJob.company}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View Original</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedJob.location}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Salary</p>
                  <p className="font-medium">{selectedJob.salary}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Job Type</p>
                  <p className="font-medium">{selectedJob.job_type}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Posted</p>
                  <p className="font-medium">{selectedJob.posted_time}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-2">Job Description</h4>
                  <p className="text-sm whitespace-pre-line">{selectedJob.description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.required_skills.map((skill: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className={`
                          text-sm py-1 px-3
                          ${resumeData.skills.includes(skill) ? 'bg-green-100 text-green-800 border-green-200' : ''}
                        `}
                      >
                        {skill}
                        {resumeData.skills.includes(skill) && (
                          <CheckCircle2 className="ml-1 h-3 w-3 text-green-600" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Why You're a Good Fit</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {selectedJob.match_reasons.map((reason: string, index: number) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  {applyingStatus[selectedJob.id] === 'processing' ? (
                    <Button disabled className="w-full py-6 bg-primary">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      AI is applying on your behalf...
                    </Button>
                  ) : applyingStatus[selectedJob.id] === 'completed' ? (
                    <Button disabled className="w-full py-6 bg-green-600 hover:bg-green-600">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Application Submitted Successfully
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleAutoApply(selectedJob.id)} 
                      className="w-full py-6 bg-black hover:bg-black/90 text-lg transition-all"
                    >
                      <BriefcaseBusiness className="mr-2 h-5 w-5" />
                      Apply with AI
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Select a job to view details</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
