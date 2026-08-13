export type LearningResource = {
  title: string;
  description: string;
  type: "video" | "course" | "documentation" | "practice" | "project";
  url: string;
};

export type RoadmapStep = {
  number: number;
  title: string;
  description: string;
  duration: string;
  resources: LearningResource[];
};

export const fullStackRoadmap: RoadmapStep[] = [
  {
    number: 1,
    title: "HTML & CSS",
    description:
      "Build a strong foundation in web structure, styling, layouts, responsive design, and accessibility.",
    duration: "2 Weeks",
    resources: [
      {
        title: "HTML & CSS Full Course",
        description:
          "Free beginner-friendly video course covering HTML and CSS fundamentals.",
        type: "video",
        url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
      },
      {
        title: "freeCodeCamp Responsive Web Design",
        description:
          "Structured interactive curriculum for HTML, CSS, responsive layouts, and accessibility.",
        type: "course",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      },
      {
        title: "MDN HTML",
        description:
          "Official HTML documentation and reference.",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
      {
        title: "MDN CSS",
        description:
          "Official CSS documentation and reference.",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      },
      {
        title: "Build a Responsive Portfolio",
        description:
          "Create a responsive personal portfolio using HTML and CSS.",
        type: "project",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      },
    ],
  },

  {
    number: 2,
    title: "JavaScript",
    description:
      "Learn modern JavaScript, ES6+, DOM manipulation, asynchronous programming, APIs, and problem solving.",
    duration: "3 Weeks",
    resources: [
      {
        title: "JavaScript Full Course",
        description:
          "Video-based JavaScript learning covering fundamentals through practical development.",
        type: "video",
        url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      },
      {
        title: "freeCodeCamp JavaScript Algorithms",
        description:
          "Interactive JavaScript curriculum with exercises and programming challenges.",
        type: "course",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
      },
      {
        title: "MDN JavaScript",
        description:
          "Official JavaScript documentation and reference.",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        title: "JavaScript Practice",
        description:
          "Practice JavaScript programming problems and concepts.",
        type: "practice",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",
      },
      {
        title: "Build a JavaScript Project",
        description:
          "Build a practical application using DOM manipulation, events, and APIs.",
        type: "project",
        url: "https://www.freecodecamp.org/news/javascript-projects-for-beginners/",
      },
    ],
  },

  {
    number: 3,
    title: "React.js",
    description:
      "Learn components, props, state, hooks, routing, forms, APIs, and modern React development.",
    duration: "3 Weeks",
    resources: [
      {
        title: "React Course",
        description:
          "Video-based React learning with practical examples.",
        type: "video",
        url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      },
      {
        title: "Full Stack Open",
        description:
          "University of Helsinki course covering modern React and full-stack development.",
        type: "course",
        url: "https://fullstackopen.com/en/",
      },
      {
        title: "React Documentation",
        description:
          "Official React documentation and learning resources.",
        type: "documentation",
        url: "https://react.dev/learn",
      },
      {
        title: "React Practice",
        description:
          "Practice building React components and applications.",
        type: "practice",
        url: "https://fullstackopen.com/en/part1/",
      },
      {
        title: "Build a React Dashboard",
        description:
          "Build a responsive dashboard using components, state, routing, and APIs.",
        type: "project",
        url: "https://fullstackopen.com/en/",
      },
    ],
  },

  {
    number: 4,
    title: "Node.js & Express",
    description:
      "Build backend applications, REST APIs, authentication, middleware, and server-side applications.",
    duration: "3 Weeks",
    resources: [
      {
        title: "Node.js & Express Course",
        description:
          "Learn backend development using Node.js and Express.",
        type: "video",
        url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
      },
      {
        title: "Full Stack Open Backend",
        description:
          "Learn Node.js, Express, REST APIs, databases, and full-stack development.",
        type: "course",
        url: "https://fullstackopen.com/en/part3/",
      },
      {
        title: "Node.js Documentation",
        description:
          "Official Node.js documentation.",
        type: "documentation",
        url: "https://nodejs.org/docs/latest/api/",
      },
      {
        title: "Express Documentation",
        description:
          "Official Express.js documentation.",
        type: "documentation",
        url: "https://expressjs.com/",
      },
      {
        title: "Build a REST API",
        description:
          "Build an Express REST API with authentication and database integration.",
        type: "project",
        url: "https://fullstackopen.com/en/part3/",
      },
    ],
  },

  {
    number: 5,
    title: "Database & APIs",
    description:
      "Learn MongoDB, SQL, database design, API integration, queries, and data management.",
    duration: "2 Weeks",
    resources: [
      {
        title: "SQL Tutorial",
        description:
          "Beginner-friendly SQL learning with interactive exercises.",
        type: "course",
        url: "https://sqlbolt.com/",
      },
      {
        title: "MongoDB University",
        description:
          "Official MongoDB learning resources and courses.",
        type: "course",
        url: "https://learn.mongodb.com/",
      },
      {
        title: "MongoDB Documentation",
        description:
          "Official MongoDB documentation.",
        type: "documentation",
        url: "https://www.mongodb.com/docs/",
      },
      {
        title: "PostgreSQL Documentation",
        description:
          "Official PostgreSQL documentation.",
        type: "documentation",
        url: "https://www.postgresql.org/docs/",
      },
      {
        title: "SQL Practice",
        description:
          "Practice SQL queries using interactive exercises.",
        type: "practice",
        url: "https://sqlbolt.com/",
      },
    ],
  },

  {
    number: 6,
    title: "Projects & Portfolio",
    description:
      "Build real-world projects and create a strong developer portfolio for placements and internships.",
    duration: "4 Weeks",
    resources: [
      {
        title: "Full Stack Project Ideas",
        description:
          "Use practical project ideas to build portfolio-ready applications.",
        type: "course",
        url: "https://www.freecodecamp.org/news/20-web-development-projects-with-source-code/",
      },
      {
        title: "GitHub Skills",
        description:
          "Learn GitHub workflows and development practices.",
        type: "course",
        url: "https://skills.github.com/",
      },
      {
        title: "GitHub Documentation",
        description:
          "Official GitHub documentation.",
        type: "documentation",
        url: "https://docs.github.com/",
      },
      {
        title: "Build Your Portfolio",
        description:
          "Create and publish a professional developer portfolio.",
        type: "project",
        url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/",
      },
    ],
  },
];

export const careerNames = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Java Developer",
  "Data Analyst",
  "AI / ML Engineer",
  "UI / UX Designer",
] as const;

export const careerDescriptions: Record<string, string> = {
  "Full Stack Developer":
    "Follow this roadmap to build frontend, backend, database, API, and project skills required for full-stack development.",
  "Frontend Developer":
    "Build strong skills in HTML, CSS, JavaScript, React, responsive design, accessibility, and frontend projects.",
  "Backend Developer":
    "Learn server-side development, REST APIs, authentication, databases, testing, deployment, and backend projects.",
  "Java Developer":
    "Learn Core Java, object-oriented programming, collections, DSA, Spring Boot, databases, APIs, and Java projects.",
  "Data Analyst":
    "Develop skills in Excel, SQL, Python, statistics, data visualization, dashboards, and practical analytics projects.",
  "AI / ML Engineer":
    "Learn Python, mathematics, machine learning, deep learning, model evaluation, deployment, and AI projects.",
  "UI / UX Designer":
    "Build skills in user research, information architecture, wireframing, visual design, prototyping, usability, and design systems.",
};

const createCareerStep = (
  number: number,
  title: string,
  description: string,
  duration: string,
  resources: LearningResource[] = []
): RoadmapStep => ({
  number,
  title,
  description,
  duration,
  resources,
});

export const careerRoadmaps: Record<string, RoadmapStep[]> = {
  "Full Stack Developer": fullStackRoadmap,

  "Frontend Developer": [
    createCareerStep(1, "HTML & CSS", "Learn semantic HTML, modern CSS, layouts, responsive design, and accessibility.", "2 Weeks"),
    createCareerStep(2, "JavaScript", "Learn modern JavaScript, DOM manipulation, asynchronous programming, APIs, and ES6+.", "3 Weeks"),
    createCareerStep(3, "React.js", "Learn components, props, state, hooks, routing, forms, and API integration.", "3 Weeks"),
    createCareerStep(4, "Frontend Projects", "Build responsive real-world applications and strengthen your portfolio.", "3 Weeks"),
    createCareerStep(5, "Testing & Deployment", "Learn frontend testing, Git workflows, optimization, and deployment.", "2 Weeks"),
  ],

  "Backend Developer": [
    createCareerStep(1, "Programming Fundamentals", "Strengthen programming, data structures, algorithms, and problem solving.", "3 Weeks"),
    createCareerStep(2, "Node.js & Express", "Build backend applications, REST APIs, middleware, and authentication.", "3 Weeks"),
    createCareerStep(3, "Databases", "Learn SQL, MongoDB, database design, queries, and data modeling.", "2 Weeks"),
    createCareerStep(4, "APIs & Authentication", "Build secure APIs with validation, authorization, JWT, and error handling.", "2 Weeks"),
    createCareerStep(5, "Backend Projects", "Build and deploy production-style backend projects.", "3 Weeks"),
  ],

  "Java Developer": [
    createCareerStep(1, "Core Java", "Learn Java syntax, OOP, classes, inheritance, interfaces, exceptions, and collections.", "3 Weeks"),
    createCareerStep(2, "Java DSA", "Practice arrays, strings, linked lists, stacks, queues, trees, graphs, and algorithms.", "4 Weeks"),
    createCareerStep(3, "Advanced Java", "Learn JDBC, multithreading, streams, files, and application architecture.", "3 Weeks"),
    createCareerStep(4, "Spring Boot", "Build REST APIs and backend applications using Spring Boot.", "3 Weeks"),
    createCareerStep(5, "Java Projects", "Build portfolio-ready Java applications and deploy them.", "3 Weeks"),
  ],

  "Data Analyst": [
    createCareerStep(1, "Excel", "Learn formulas, pivot tables, charts, cleaning, and analysis workflows.", "2 Weeks"),
    createCareerStep(2, "SQL", "Learn queries, joins, aggregation, subqueries, CTEs, and window functions.", "3 Weeks"),
    createCareerStep(3, "Python for Data Analysis", "Learn Python with pandas, NumPy, and data cleaning techniques.", "3 Weeks"),
    createCareerStep(4, "Visualization", "Create dashboards and communicate insights using visualization tools.", "2 Weeks"),
    createCareerStep(5, "Analytics Projects", "Complete practical datasets and portfolio-ready analytics projects.", "3 Weeks"),
  ],

  "AI / ML Engineer": [
    createCareerStep(1, "Python & Mathematics", "Build Python programming and the mathematics foundation required for machine learning.", "4 Weeks"),
    createCareerStep(2, "Machine Learning", "Learn supervised and unsupervised learning, preprocessing, and evaluation.", "4 Weeks"),
    createCareerStep(3, "Deep Learning", "Learn neural networks, CNNs, sequence models, and modern deep learning concepts.", "4 Weeks"),
    createCareerStep(4, "MLOps & Deployment", "Learn model serving, APIs, monitoring, and deployment workflows.", "3 Weeks"),
    createCareerStep(5, "AI Projects", "Build practical AI/ML projects for your portfolio.", "4 Weeks"),
  ],

  "UI / UX Designer": [
    createCareerStep(1, "Design Fundamentals", "Learn composition, typography, color, spacing, hierarchy, and visual systems.", "2 Weeks"),
    createCareerStep(2, "User Research", "Learn user interviews, personas, journey mapping, and problem definition.", "2 Weeks"),
    createCareerStep(3, "Wireframing & Prototyping", "Create wireframes, user flows, prototypes, and interaction designs.", "3 Weeks"),
    createCareerStep(4, "UI Design", "Design responsive interfaces, components, design systems, and high-fidelity screens.", "3 Weeks"),
    createCareerStep(5, "UX Projects & Portfolio", "Complete case studies and build a professional design portfolio.", "3 Weeks"),
  ],
};

export const getRoadmapStep = (
  stepNumber: number
): RoadmapStep | undefined => {
  return fullStackRoadmap.find(
    (step) => step.number === stepNumber
  );
};