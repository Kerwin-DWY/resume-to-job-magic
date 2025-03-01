
// This is a simplified mock implementation of job searching
// In a real application, this would use APIs to search job listings

export const searchJobs = async (resumeData: any): Promise<any[]> => {
  console.log('Searching jobs based on resume data...', resumeData);
  
  // For demo purposes, return mock data
  // In a real implementation, this would make API calls to job boards
  return [
    {
      id: "job1",
      title: "Senior Frontend Engineer",
      company: "Innovative Tech",
      location: "San Francisco, CA (Remote)",
      salary: "$140,000 - $180,000",
      job_type: "Full-time",
      posted_time: "2 days ago",
      match_percentage: 95,
      description: `We're looking for a Senior Frontend Engineer to join our product team. 
      
      You'll be responsible for building and maintaining high-quality web applications, collaborating with designers and other developers to create intuitive user experiences.
      
      Responsibilities:
      • Develop new user-facing features using React.js
      • Build reusable components and libraries for future use
      • Translate designs and wireframes into high-quality code
      • Optimize applications for maximum performance
      • Collaborate with other team members and stakeholders
      
      Requirements:
      • 5+ years of experience in frontend development
      • Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
      • Thorough understanding of React.js and its core principles
      • Experience with popular React.js workflows (such as Redux)
      • Familiarity with modern frontend build pipelines and tools
      • Experience with common frontend development tools such as Babel, Webpack, NPM, etc.
      • Good understanding of asynchronous request handling, partial page updates, and AJAX
      • Proficient understanding of cross-browser compatibility issues and ways to work around them`,
      required_skills: [
        "JavaScript",
        "React",
        "TypeScript",
        "Redux",
        "HTML/CSS",
        "Webpack",
        "Frontend Testing"
      ],
      match_reasons: [
        "Your 8+ years of experience exceeds the 5+ years required",
        "You have all 7 of the required skills for this position",
        "Your experience with performance optimization aligns with the job requirements",
        "Your work at TechCorp Inc. involved similar responsibilities"
      ]
    },
    {
      id: "job2",
      title: "Frontend Developer",
      company: "Growth Startup",
      location: "Remote",
      salary: "$120,000 - $150,000",
      job_type: "Full-time",
      posted_time: "1 week ago",
      match_percentage: 88,
      description: `We are seeking a skilled Frontend Developer to join our growing team. In this role, you will be responsible for implementing visual elements that users see and interact with in a web application.
      
      Responsibilities:
      • Develop new user-facing features
      • Create reusable code and libraries for future use
      • Ensure the technical feasibility of UI/UX designs
      • Optimize application for maximum speed and scalability
      • Collaborate with other team members and stakeholders
      
      Requirements:
      • 3+ years of experience with JavaScript
      • 2+ years of experience with React.js
      • Experience with responsive design
      • Understanding of server-side CSS pre-processing platforms
      • Good understanding of advanced JavaScript concepts
      • Familiarity with GraphQL
      • Experience with AWS is a plus`,
      required_skills: [
        "JavaScript",
        "React",
        "CSS",
        "GraphQL",
        "Responsive Design",
        "AWS"
      ],
      match_reasons: [
        "You have 5 out of 6 required skills",
        "Your experience with GraphQL is highly relevant",
        "Your AWS experience is listed as a desired skill",
        "You exceed the minimum experience requirements"
      ]
    },
    {
      id: "job3",
      title: "Lead React Developer",
      company: "Enterprise Solutions",
      location: "San Francisco, CA",
      salary: "$160,000 - $190,000",
      job_type: "Full-time",
      posted_time: "3 days ago",
      match_percentage: 92,
      description: `We are looking for a Lead React Developer to join our enterprise software team and help us build scalable, high-performance web applications.
      
      As a Lead Developer, you will be responsible for architecting and implementing frontend solutions, mentoring junior developers, and ensuring code quality across projects.
      
      Responsibilities:
      • Lead the development of complex React applications
      • Architect scalable and maintainable frontend solutions
      • Mentor and guide junior developers
      • Work closely with product managers and designers
      • Implement best practices for code quality and performance
      
      Requirements:
      • 7+ years of frontend development experience
      • 4+ years of experience with React.js
      • Strong knowledge of TypeScript
      • Experience with state management libraries (Redux, MobX)
      • Understanding of CI/CD pipelines
      • Experience with test-driven development
      • Leadership experience is preferred`,
      required_skills: [
        "React",
        "TypeScript",
        "Redux",
        "JavaScript",
        "CI/CD",
        "Leadership",
        "Testing"
      ],
      match_reasons: [
        "Your senior role at TechCorp includes leadership experience",
        "You have all of the technical skills required",
        "Your mentoring experience aligns with the leadership requirements",
        "Your 8+ years of experience exceeds the 7+ years required"
      ]
    },
    {
      id: "job4",
      title: "Full Stack Developer",
      company: "Tech Innovators",
      location: "New York, NY (Hybrid)",
      salary: "$130,000 - $160,000",
      job_type: "Full-time",
      posted_time: "5 days ago",
      match_percentage: 79,
      description: `We're seeking a Full Stack Developer who is proficient with both frontend and backend development. The ideal candidate should have experience with React, Node.js, and database technologies.
      
      Responsibilities:
      • Develop and maintain both frontend and backend applications
      • Implement responsive design and ensure cross-browser compatibility
      • Write reusable, testable, and efficient code
      • Design and implement database schemas
      • Ensure the technical feasibility of UI/UX designs
      
      Requirements:
      • 4+ years of full stack development experience
      • Strong proficiency in JavaScript
      • Experience with React.js and Node.js
      • Experience with MongoDB or PostgreSQL
      • Understanding of RESTful APIs
      • Knowledge of version control systems (Git)
      • Experience with AWS services
      • Familiarity with agile development methodologies`,
      required_skills: [
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "PostgreSQL",
        "Git",
        "AWS"
      ],
      match_reasons: [
        "You have 5 out of 7 required skills",
        "Your frontend experience is very strong",
        "Your AWS experience is directly applicable",
        "You have experience with Git version control"
      ]
    },
    {
      id: "job5",
      title: "UI Engineer",
      company: "Design Forward",
      location: "Remote",
      salary: "$125,000 - $155,000",
      job_type: "Full-time",
      posted_time: "1 day ago",
      match_percentage: 86,
      description: `We are looking for a UI Engineer with a strong design sense to join our creative team. In this role, you'll be responsible for translating design concepts into functional interfaces and creating delightful user experiences.
      
      Responsibilities:
      • Implement responsive, accessible web interfaces
      • Collaborate closely with designers to realize their vision
      • Develop and maintain a component library
      • Optimize animations and transitions for performance
      • Ensure cross-browser and cross-device compatibility
      
      Requirements:
      • 3+ years of experience in frontend development
      • Strong proficiency in HTML, CSS, and JavaScript
      • Experience with modern CSS techniques and preprocessors
      • Experience with React or similar frontend frameworks
      • Strong understanding of UI/UX principles
      • Portfolio showcasing frontend implementation work
      • Experience with animation and micro-interactions`,
      required_skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "UI/UX",
        "Animation",
        "Responsive Design"
      ],
      match_reasons: [
        "You have 4 out of 7 required skills",
        "Your React experience is directly applicable",
        "Your JavaScript expertise is highly relevant",
        "Your experience building responsive applications is valuable"
      ]
    }
  ];
};
