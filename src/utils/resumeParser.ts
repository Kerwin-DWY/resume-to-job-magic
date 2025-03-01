
// Function to extract information from resume text content
export const parseResume = async (fileContent: string): Promise<any> => {
  console.log('Parsing resume content...');
  
  // Ensure we have content to parse
  if (!fileContent || fileContent.trim() === '') {
    throw new Error('Resume content is empty');
  }
  
  // Convert content to lowercase for easier pattern matching
  const content = fileContent.toLowerCase();
  
  // Initialize the parsed data structure
  const parsedData: any = {
    name: extractName(fileContent),
    email: extractEmail(content),
    phone: extractPhone(content),
    location: extractLocation(content),
    skills: extractSkills(content),
    experience: extractExperience(fileContent),
    education: extractEducation(fileContent),
    summary: extractSummary(fileContent),
  };
  
  return parsedData;
};

// Helper functions for extracting specific information

function extractName(content: string): string {
  // Attempt to find name at the beginning of the resume
  // Names are typically at the top and often in larger font
  const lines = content.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length > 0) {
    // First non-empty line is likely the name
    const potentialName = lines[0].trim();
    
    // Check if it looks like a name (not an email, not too long)
    if (potentialName.length < 40 && !potentialName.includes('@') && !potentialName.includes('resume')) {
      return potentialName;
    }
  }
  
  // Fallback if we couldn't identify a name
  return "Unknown";
}

function extractEmail(content: string): string {
  // Find email addresses using regex
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const match = content.match(emailRegex);
  
  return match ? match[0] : "";
}

function extractPhone(content: string): string {
  // Find phone numbers using regex patterns
  // This handles several common formats: (123) 456-7890, 123-456-7890, 123.456.7890
  const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
  const match = content.match(phoneRegex);
  
  return match ? match[0] : "";
}

function extractLocation(content: string): string {
  // Try to find location information
  // This is challenging without NLP, but we can look for common patterns
  const locationPatterns = [
    /location:\s*([^,\n]+(?:,\s*[^,\n]+)*)/i,
    /address:\s*([^,\n]+(?:,\s*[^,\n]+)*)/i,
    /\b([a-z\s]+,\s*[a-z]{2}(?:,\s*\d{5})?)\b/i, // City, State pattern
  ];
  
  for (const pattern of locationPatterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return "";
}

function extractSkills(content: string): string[] {
  // Common tech skills to look for
  const commonSkills = [
    "javascript", "typescript", "python", "java", "c++", "c#", "ruby", "php", "swift", 
    "kotlin", "go", "rust", "html", "css", "react", "angular", "vue", "svelte", 
    "node", "express", "django", "flask", "spring", "asp.net", "laravel", "rails",
    "mongodb", "mysql", "postgresql", "oracle", "sql server", "firebase", "aws", 
    "azure", "gcp", "docker", "kubernetes", "jenkins", "ci/cd", "git", "github", 
    "gitlab", "jira", "agile", "scrum", "kanban", "rest", "graphql", "grpc",
    "redux", "mobx", "vuex", "flutter", "react native", "electron", "webpack", 
    "babel", "sass", "less", "tailwind", "bootstrap", "material-ui", "figma",
    "sketch", "adobe xd", "photoshop", "illustrator", "machine learning", "ai",
    "data science", "data analysis", "tensorflow", "pytorch", "opencv", "nlp",
    "blockchain", "cryptocurrency", "solidity", "web3", "devops", "sre",
    "security", "penetration testing", "ethical hacking", "network", "system administration",
    "linux", "windows", "macos", "ios", "android", "mobile development", "responsive design",
    "accessibility", "seo", "performance optimization", "unit testing", "integration testing",
    "e2e testing", "test automation", "jest", "mocha", "cypress", "selenium",
    "product management", "project management", "team leadership", "mentoring",
    "communication", "problem solving", "critical thinking", "time management",
    "multitasking", "attention to detail", "creativity", "innovation"
  ];
  
  // Look for skills section
  const skillsSection = content.match(/skills(?::|section|\n)([\s\S]*?)(?:\n\s*\n|\n\w+:|\n\w+\s+section|$)/i);
  
  let skills: string[] = [];
  
  if (skillsSection && skillsSection[1]) {
    // Extract skills from the skills section
    const skillText = skillsSection[1].toLowerCase();
    skills = commonSkills.filter(skill => skillText.includes(skill.toLowerCase()));
  }
  
  // If we couldn't find skills in a dedicated section, scan the whole resume
  if (skills.length === 0) {
    skills = commonSkills.filter(skill => content.includes(skill.toLowerCase()));
  }
  
  // Limit to a reasonable number of skills and capitalize first letter of each
  return skills.slice(0, 15).map(skill => 
    skill.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
}

function extractExperience(content: string): any[] {
  const experiences: any[] = [];
  
  // Look for experience sections with various common headings
  const experienceRegex = /(?:experience|work experience|employment|work history)(?::|section|\n)([\s\S]*?)(?:\n\s*\n|\n\w+:|\n\w+\s+section|$)/i;
  const experienceMatch = content.match(experienceRegex);
  
  if (experienceMatch && experienceMatch[1]) {
    const experienceContent = experienceMatch[1];
    
    // Split into potential job entries (look for date patterns or company names)
    const lines = experienceContent.split('\n').filter(line => line.trim() !== '');
    
    let currentJob: any = null;
    let description = '';
    
    for (const line of lines) {
      // Look for job title/company lines (usually shorter and may contain dates)
      const datePattern = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[\s.,-]+\d{4}\b.*?(present|current|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[\s.,-]+\d{4}\b)?/i;
      
      // If line contains a date pattern or looks like a job title
      if (datePattern.test(line) || (line.length < 100 && /\b(senior|junior|lead|principal|director|manager|developer|engineer|analyst|specialist|consultant)\b/i.test(line))) {
        // Save previous job if exists
        if (currentJob) {
          currentJob.description = description.trim();
          experiences.push(currentJob);
          description = '';
        }
        
        // Extract dates
        const dateMatch = line.match(datePattern);
        let startDate = '', endDate = '';
        
        if (dateMatch) {
          const dateInfo = dateMatch[0];
          // Simple extraction, can be improved
          if (dateInfo.includes('present') || dateInfo.includes('current')) {
            endDate = 'Present';
          }
          
          const dates = dateInfo.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[\s.,-]+\d{4}\b/gi);
          if (dates && dates.length >= 1) {
            startDate = dates[0];
            if (dates.length >= 2 && !endDate) {
              endDate = dates[1];
            }
          }
        }
        
        // Extract title and company
        let title = '', company = '';
        const withoutDates = line.replace(datePattern, '').trim();
        
        // Try to separate title from company (common patterns: "Title at Company", "Title - Company", "Title, Company")
        const titleCompanySeparators = [' at ', ' - ', ', ', ' | '];
        for (const separator of titleCompanySeparators) {
          if (withoutDates.includes(separator)) {
            const parts = withoutDates.split(separator);
            title = parts[0].trim();
            company = parts.slice(1).join(separator).trim();
            break;
          }
        }
        
        // If we couldn't separate, set the entire string as title
        if (!title) {
          title = withoutDates;
        }
        
        currentJob = {
          title,
          company,
          startDate,
          endDate,
          description: ''
        };
      } else if (currentJob) {
        // Add to current job description
        description += line + ' ';
      }
    }
    
    // Add the last job
    if (currentJob) {
      currentJob.description = description.trim();
      experiences.push(currentJob);
    }
  }
  
  // If we couldn't extract any experiences, return an empty array
  return experiences;
}

function extractEducation(content: string): any[] {
  const education: any[] = [];
  
  // Look for education section
  const educationRegex = /(?:education|educational background|academic)(?::|section|\n)([\s\S]*?)(?:\n\s*\n|\n\w+:|\n\w+\s+section|$)/i;
  const educationMatch = content.match(educationRegex);
  
  if (educationMatch && educationMatch[1]) {
    const educationContent = educationMatch[1];
    const lines = educationContent.split('\n').filter(line => line.trim() !== '');
    
    let currentEducation: any = null;
    
    for (const line of lines) {
      // Look for education entries (degree, institution, dates)
      const degreePatterns = /\b(bachelor|master|phd|doctor|associate|diploma|certificate|mba|bs|ba|ms|ma|bsc|msc|btech|mtech)\b|\b(of science|of arts|of engineering|of business|of technology)\b/i;
      const schoolPatterns = /\b(university|college|institute|school|academy)\b/i;
      const datePattern = /\b(19|20)\d{2}\b.*?(present|current|\b(19|20)\d{2}\b)?/i;
      
      // If line looks like an education entry
      if (degreePatterns.test(line) || schoolPatterns.test(line) || datePattern.test(line)) {
        // Save previous education if exists
        if (currentEducation) {
          education.push(currentEducation);
        }
        
        // Extract dates
        const dateMatch = line.match(datePattern);
        let startDate = '', endDate = '';
        
        if (dateMatch) {
          const dateInfo = dateMatch[0];
          if (dateInfo.includes('present') || dateInfo.includes('current')) {
            endDate = 'Present';
          }
          
          const dates = dateInfo.match(/\b(19|20)\d{2}\b/g);
          if (dates && dates.length >= 1) {
            startDate = dates[0];
            if (dates.length >= 2 && !endDate) {
              endDate = dates[1];
            }
          }
        }
        
        // Extract degree and institution
        let degree = '', institution = '';
        const lineWithoutDates = line.replace(datePattern, '').trim();
        
        // Try to identify degree
        const degreeMatch = lineWithoutDates.match(/\b([A-Za-z]+\s*(of|in|on)\s*[A-Za-z\s,]+)\b|\b(Bachelor|Master|PhD|Doctor|Associate|Diploma|Certificate|MBA|BS|BA|MS|MA|BSc|MSc|BTech|MTech)(\s+of|\s+in)?\s+[A-Za-z\s]+\b/i);
        if (degreeMatch) {
          degree = degreeMatch[0].trim();
        }
        
        // Try to identify institution
        const institutionMatch = lineWithoutDates.match(/\b([A-Za-z\s]+\b(University|College|Institute|School|Academy)\b[A-Za-z\s,]*|\b(University|College|Institute|School|Academy)\b\s+[A-Za-z\s,]+)/i);
        if (institutionMatch) {
          institution = institutionMatch[0].trim();
        }
        
        currentEducation = {
          degree: degree || "Degree",
          institution: institution || "Institution",
          startDate,
          endDate
        };
      }
    }
    
    // Add the last education entry
    if (currentEducation) {
      education.push(currentEducation);
    }
  }
  
  return education;
}

function extractSummary(content: string): string {
  // Look for summary or objective section
  const summaryRegex = /(?:summary|profile|objective|about|professional summary)(?::|section|\n)([\s\S]*?)(?:\n\s*\n|\n\w+:|\n\w+\s+section|$)/i;
  const summaryMatch = content.match(summaryRegex);
  
  if (summaryMatch && summaryMatch[1]) {
    return summaryMatch[1].trim();
  }
  
  // If no dedicated summary, take the first paragraph (first few lines) as a summary
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const firstFewLines = lines.slice(1, 4).join(' '); // Skip first line (likely name)
  
  if (firstFewLines.length > 20) {
    return firstFewLines;
  }
  
  return "Experienced professional with skills in relevant technologies and methodologies.";
}
