import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  GitBranch,
  FileText,
  Mic,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type EngineeringBranch =
  | "Computer Science Engineering"
  | "Information Science / Information Technology"
  | "Artificial Intelligence & Machine Learning"
  | "Data Science"
  | "Cybersecurity"
  | "Electronics & Communication Engineering"
  | "Electrical & Electronics Engineering"
  | "Mechanical Engineering"
  | "Civil Engineering"
  | "Aerospace Engineering"
  | "Chemical Engineering"
  | "Biotechnology"
  | "Biomedical Engineering"
  | "Automobile Engineering"
  | "Robotics & Automation"
  | "Industrial Engineering"
  | "Other Engineering";

type InterviewType =
  | "Technical"
  | "HR / Behavioral"
  | "Mixed"
  | "Language-Specific"
  | "Resume-Related";

type ProgrammingLanguage =
  | "C"
  | "C++"
  | "Java"
  | "Python"
  | "JavaScript"
  | "TypeScript"
  | "SQL";

type Question = {
  question: string;
  keywords: string[];
};

type Evaluation = {
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
};

const branchOptions: EngineeringBranch[] = [
  "Computer Science Engineering",
  "Information Science / Information Technology",
  "Artificial Intelligence & Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Aerospace Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Biomedical Engineering",
  "Automobile Engineering",
  "Robotics & Automation",
  "Industrial Engineering",
  "Other Engineering",
];

const commonHrQuestions: Question[] = [
  {
    question: "Tell me about yourself and your engineering background.",
    keywords: ["education", "engineering", "skills", "project", "goal"],
  },
  {
    question: "Tell me about an engineering project you worked on.",
    keywords: ["project", "problem", "solution", "role", "result"],
  },
  {
    question: "Describe a technical challenge you faced and how you solved it.",
    keywords: ["challenge", "problem", "solution", "debug", "result"],
  },
  {
    question: "How do you handle deadlines when working on an engineering project?",
    keywords: ["deadline", "planning", "priority", "team", "communication"],
  },
  {
    question: "Why did you choose your engineering branch?",
    keywords: ["engineering", "branch", "interest", "career", "goal"],
  },
];

const codingQuestions: Question[] = [
  {
    question:
      "Coding: Write a program to find the largest element in an array. Explain the time complexity.",
    keywords: ["array", "loop", "largest", "maximum", "o(n)", "time complexity"],
  },
  {
    question:
      "Coding: How would you check whether a string is a palindrome? Explain your approach.",
    keywords: ["string", "palindrome", "reverse", "two pointer", "loop"],
  },
  {
    question:
      "Coding: Explain how you would find duplicate elements in an array.",
    keywords: ["array", "duplicate", "set", "hash", "frequency"],
  },
  {
    question:
      "Coding: Write or explain an algorithm to reverse a linked list.",
    keywords: ["linked list", "reverse", "pointer", "next", "head"],
  },
  {
    question:
      "Coding: What is binary search? Write its basic approach and state its complexity.",
    keywords: ["binary search", "sorted", "middle", "o(log n)", "complexity"],
  },
  {
    question:
      "Coding: Explain how you would count the frequency of each character in a string.",
    keywords: ["string", "frequency", "hash", "map", "count"],
  },
  {
    question:
      "Coding: Write a program to check whether a number is prime.",
    keywords: ["prime", "number", "loop", "division", "sqrt"],
  },
  {
    question:
      "Coding: Explain how you would sort an array and compare two sorting algorithms.",
    keywords: ["sorting", "array", "bubble", "merge", "quick", "complexity"],
  },
];

const commonTechnicalQuestions: Question[] = [
  {
    question: "Explain the engineering problem-solving approach you normally follow.",
    keywords: ["problem", "requirements", "analysis", "solution", "testing"],
  },
  {
    question: "How do you validate that an engineering solution is correct and reliable?",
    keywords: ["testing", "validation", "requirements", "performance", "reliability"],
  },
  {
    question: "Explain the difference between verification and validation.",
    keywords: ["verification", "validation", "requirements", "testing"],
  },
];

const branchQuestions: Record<EngineeringBranch, Question[]> = {
  "Computer Science Engineering": [
    { question: "What is the difference between a process and a thread?", keywords: ["process", "thread", "memory", "concurrency"] },
    { question: "Explain Big O notation and give an example of an O(n) algorithm.", keywords: ["big o", "complexity", "o(n)", "linear"] },
    { question: "What are primary keys and foreign keys in DBMS?", keywords: ["primary key", "foreign key", "database", "relationship"] },
    { question: "Explain the four pillars of object-oriented programming.", keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction"] },
    { question: "What is the difference between TCP and UDP?", keywords: ["tcp", "udp", "connection", "reliable", "network"] },
    { question: "What is an API and how does a REST API work?", keywords: ["api", "rest", "http", "request", "response"] },
  ],
  "Information Science / Information Technology": [
    { question: "What is the role of an operating system in a computer?", keywords: ["operating system", "process", "memory", "hardware"] },
    { question: "Explain normalization in relational databases.", keywords: ["normalization", "database", "redundancy", "normal form"] },
    { question: "What is the difference between authentication and authorization?", keywords: ["authentication", "authorization", "identity", "permission"] },
    { question: "Explain RESTful web services and common HTTP methods.", keywords: ["rest", "http", "get", "post", "api"] },
    { question: "What is software testing and why is it important?", keywords: ["testing", "bug", "quality", "software"] },
    { question: "How would you troubleshoot a slow application?", keywords: ["performance", "logs", "database", "profiling", "bottleneck"] },
  ],
  "Artificial Intelligence & Machine Learning": [
    { question: "What is the difference between supervised and unsupervised learning?", keywords: ["supervised", "unsupervised", "label", "training"] },
    { question: "Explain overfitting and how you can reduce it.", keywords: ["overfitting", "regularization", "validation", "training"] },
    { question: "What is the purpose of a confusion matrix?", keywords: ["confusion matrix", "precision", "recall", "classification"] },
    { question: "What is feature engineering and why is it important?", keywords: ["feature", "engineering", "data", "model"] },
    { question: "Explain the difference between classification and regression.", keywords: ["classification", "regression", "target", "prediction"] },
    { question: "What is cross-validation?", keywords: ["cross validation", "validation", "fold", "model"] },
  ],
  "Data Science": [
    { question: "What is the difference between mean, median, and mode?", keywords: ["mean", "median", "mode", "distribution"] },
    { question: "How do you handle missing data in a dataset?", keywords: ["missing", "data", "imputation", "remove"] },
    { question: "Explain correlation and why correlation does not necessarily imply causation.", keywords: ["correlation", "causation", "relationship"] },
    { question: "What is feature scaling and when is it required?", keywords: ["scaling", "normalization", "standardization", "feature"] },
    { question: "How would you evaluate a classification model?", keywords: ["accuracy", "precision", "recall", "f1", "roc"] },
    { question: "What steps are normally included in a data science workflow?", keywords: ["data", "cleaning", "analysis", "model", "evaluation"] },
  ],
  Cybersecurity: [
    { question: "What is the CIA triad in cybersecurity?", keywords: ["confidentiality", "integrity", "availability"] },
    { question: "What is the difference between authentication and authorization?", keywords: ["authentication", "authorization", "identity", "access"] },
    { question: "What is SQL injection and how can it be prevented?", keywords: ["sql injection", "parameterized", "input", "validation"] },
    { question: "What is the purpose of a firewall?", keywords: ["firewall", "traffic", "network", "rules"] },
    { question: "Explain the difference between symmetric and asymmetric encryption.", keywords: ["symmetric", "asymmetric", "encryption", "key"] },
    { question: "What is phishing and how can organizations reduce the risk?", keywords: ["phishing", "social engineering", "training", "email"] },
  ],
  "Electronics & Communication Engineering": [
    { question: "State Ohm's law and explain its practical significance.", keywords: ["ohm", "voltage", "current", "resistance"] },
    { question: "What is the difference between analog and digital signals?", keywords: ["analog", "digital", "signal", "continuous", "discrete"] },
    { question: "Explain the working principle of a diode.", keywords: ["diode", "pn junction", "current", "forward"] },
    { question: "What is modulation and why is it used in communication systems?", keywords: ["modulation", "carrier", "communication", "signal"] },
    { question: "What is the difference between microprocessor and microcontroller?", keywords: ["microprocessor", "microcontroller", "memory", "peripheral"] },
    { question: "What is an ADC and where is it used?", keywords: ["adc", "analog", "digital", "conversion"] },
  ],
  "Electrical & Electronics Engineering": [
    { question: "State Kirchhoff's current and voltage laws.", keywords: ["kirchhoff", "current", "voltage", "law"] },
    { question: "Explain the working principle of a transformer.", keywords: ["transformer", "induction", "primary", "secondary"] },
    { question: "What is power factor and why is it important?", keywords: ["power factor", "real power", "reactive", "efficiency"] },
    { question: "Explain the difference between AC and DC.", keywords: ["ac", "dc", "alternating", "direct"] },
    { question: "What is a three-phase electrical system?", keywords: ["three phase", "phase", "power", "balanced"] },
    { question: "What is the purpose of a circuit breaker?", keywords: ["circuit breaker", "protection", "current", "fault"] },
  ],
  "Mechanical Engineering": [
    { question: "Explain the first and second laws of thermodynamics.", keywords: ["thermodynamics", "energy", "entropy", "heat"] },
    { question: "What is the difference between stress and strain?", keywords: ["stress", "strain", "deformation", "force"] },
    { question: "Explain the working principle of an internal combustion engine.", keywords: ["engine", "combustion", "piston", "cycle"] },
    { question: "What is the difference between CNC and conventional machining?", keywords: ["cnc", "machining", "automation", "control"] },
    { question: "What is a bearing and why is it used?", keywords: ["bearing", "friction", "shaft", "load"] },
    { question: "Explain the purpose of a heat exchanger.", keywords: ["heat exchanger", "heat", "fluid", "transfer"] },
  ],
  "Civil Engineering": [
    { question: "What is the difference between cement and concrete?", keywords: ["cement", "concrete", "aggregate", "binder"] },
    { question: "What is the purpose of reinforcement in reinforced concrete?", keywords: ["reinforcement", "concrete", "steel", "tension"] },
    { question: "Explain the difference between dead load and live load.", keywords: ["dead load", "live load", "structure", "load"] },
    { question: "What is soil bearing capacity?", keywords: ["soil", "bearing capacity", "foundation", "load"] },
    { question: "What is surveying and why is it important in construction?", keywords: ["surveying", "construction", "measurement", "land"] },
    { question: "What factors should be considered when selecting a foundation?", keywords: ["foundation", "soil", "load", "depth", "structure"] },
  ],
  "Aerospace Engineering": [
    { question: "What are the four fundamental forces acting on an aircraft?", keywords: ["lift", "drag", "thrust", "weight"] },
    { question: "Explain Bernoulli's principle in the context of an airfoil.", keywords: ["bernoulli", "airfoil", "pressure", "lift"] },
    { question: "What is the difference between subsonic and supersonic flow?", keywords: ["subsonic", "supersonic", "mach", "speed"] },
    { question: "What is thrust and how is it generated by a jet engine?", keywords: ["thrust", "engine", "jet", "momentum"] },
    { question: "What is drag and what factors affect it?", keywords: ["drag", "air", "velocity", "aerodynamic"] },
    { question: "Why is material selection important in aerospace structures?", keywords: ["material", "weight", "strength", "temperature"] },
  ],
  "Chemical Engineering": [
    { question: "What is a mass balance and where is it used?", keywords: ["mass balance", "process", "input", "output"] },
    { question: "Explain the difference between batch and continuous processes.", keywords: ["batch", "continuous", "process", "production"] },
    { question: "What is heat transfer and what are its main modes?", keywords: ["conduction", "convection", "radiation", "heat"] },
    { question: "What is distillation and what property does it use for separation?", keywords: ["distillation", "boiling", "separation", "volatility"] },
    { question: "What is a chemical reactor?", keywords: ["reactor", "reaction", "conversion", "temperature"] },
    { question: "Why is process safety important in chemical plants?", keywords: ["safety", "hazard", "process", "risk"] },
  ],
  Biotechnology: [
    { question: "What is the central dogma of molecular biology?", keywords: ["dna", "rna", "protein", "transcription", "translation"] },
    { question: "What is PCR and what is it used for?", keywords: ["pcr", "dna", "amplification", "primers"] },
    { question: "Explain the difference between fermentation and cellular respiration.", keywords: ["fermentation", "respiration", "energy", "cell"] },
    { question: "What are enzymes and what factors affect their activity?", keywords: ["enzyme", "substrate", "temperature", "ph"] },
    { question: "What is recombinant DNA technology?", keywords: ["recombinant", "dna", "gene", "vector"] },
    { question: "What is bioreactor and why is it used?", keywords: ["bioreactor", "culture", "microorganism", "process"] },
  ],
  "Biomedical Engineering": [
    { question: "What is biomedical instrumentation?", keywords: ["instrumentation", "sensor", "medical", "measurement"] },
    { question: "What is the role of sensors in medical devices?", keywords: ["sensor", "signal", "measurement", "device"] },
    { question: "Explain the importance of biocompatibility in implants.", keywords: ["biocompatibility", "implant", "tissue", "material"] },
    { question: "What is ECG and what does it measure?", keywords: ["ecg", "heart", "electrical", "signal"] },
    { question: "What is medical signal processing?", keywords: ["signal", "filter", "noise", "medical"] },
    { question: "Why are safety standards important for medical devices?", keywords: ["safety", "medical device", "standard", "patient"] },
  ],
  "Automobile Engineering": [
    { question: "Explain the four strokes of a four-stroke engine.", keywords: ["intake", "compression", "power", "exhaust"] },
    { question: "What is the function of a clutch?", keywords: ["clutch", "engine", "transmission", "power"] },
    { question: "What is the purpose of a braking system?", keywords: ["brake", "friction", "vehicle", "safety"] },
    { question: "Explain the difference between petrol and diesel engines.", keywords: ["petrol", "diesel", "ignition", "compression"] },
    { question: "What is suspension and why is it required?", keywords: ["suspension", "shock", "comfort", "wheel"] },
    { question: "What are the major challenges in electric vehicles?", keywords: ["electric vehicle", "battery", "range", "charging"] },
  ],
  "Robotics & Automation": [
    { question: "What are the main components of a robotic system?", keywords: ["sensor", "actuator", "controller", "robot"] },
    { question: "What is feedback control?", keywords: ["feedback", "control", "sensor", "error"] },
    { question: "What is the difference between open-loop and closed-loop control?", keywords: ["open loop", "closed loop", "feedback", "control"] },
    { question: "What is an actuator?", keywords: ["actuator", "motion", "motor", "control"] },
    { question: "What is inverse kinematics in robotics?", keywords: ["inverse kinematics", "robot", "joint", "position"] },
    { question: "How can sensors improve an autonomous robotic system?", keywords: ["sensor", "autonomous", "environment", "feedback"] },
  ],
  "Industrial Engineering": [
    { question: "What is operations research?", keywords: ["operations research", "optimization", "decision", "model"] },
    { question: "What is lean manufacturing?", keywords: ["lean", "waste", "process", "efficiency"] },
    { question: "What is Six Sigma?", keywords: ["six sigma", "quality", "defect", "process"] },
    { question: "Explain the purpose of time and motion studies.", keywords: ["time study", "motion study", "productivity", "process"] },
    { question: "What is supply chain management?", keywords: ["supply chain", "inventory", "supplier", "logistics"] },
    { question: "How can process bottlenecks be identified and reduced?", keywords: ["bottleneck", "process", "capacity", "improvement"] },
  ],
  "Other Engineering": [
    ...commonTechnicalQuestions,
    {
      question: "Describe an important technical subject from your engineering branch and explain how it is applied in industry.",
      keywords: ["engineering", "subject", "application", "industry", "example"],
    },
    {
      question: "Explain a major project or laboratory work you completed during your engineering studies.",
      keywords: ["project", "laboratory", "engineering", "result", "role"],
    },
  ],
};


const languageOptions: ProgrammingLanguage[] = [
  "C", "C++", "Java", "Python", "JavaScript", "TypeScript", "SQL",
];

const languageQuestions: Record<ProgrammingLanguage, Question[]> = {
  C: [
    { question: "In C, what is a pointer and how is pointer arithmetic used?", keywords: ["pointer", "address", "memory", "pointer arithmetic"] },
    { question: "Explain malloc(), calloc(), realloc(), and free().", keywords: ["malloc", "calloc", "realloc", "free", "memory"] },
    { question: "Coding: Write a C program to reverse an array in-place.", keywords: ["array", "reverse", "loop", "pointer", "in-place"] },
    { question: "What is the difference between a structure and a union in C?", keywords: ["structure", "union", "memory", "struct"] },
    { question: "Coding: How would you check whether a string is a palindrome in C?", keywords: ["string", "palindrome", "loop", "character"] },
    { question: "What causes a segmentation fault in C and how would you debug it?", keywords: ["segmentation fault", "pointer", "memory", "debug"] },
  ],
  "C++": [
    { question: "Explain the four pillars of object-oriented programming in C++.", keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction"] },
    { question: "What is the difference between a pointer and a reference in C++?", keywords: ["pointer", "reference", "memory", "address"] },
    { question: "Coding: Explain how you would remove duplicates from a vector in C++.", keywords: ["vector", "duplicate", "set", "sort", "algorithm"] },
    { question: "What are constructors and destructors in C++?", keywords: ["constructor", "destructor", "object", "class"] },
    { question: "Explain the difference between stack and heap memory in C++.", keywords: ["stack", "heap", "memory", "allocation"] },
    { question: "What is STL and why is it useful in competitive programming?", keywords: ["stl", "vector", "map", "set", "algorithm"] },
  ],
  Java: [
    { question: "Explain the difference between JDK, JRE, and JVM.", keywords: ["jdk", "jre", "jvm", "java"] },
    { question: "Explain method overloading and method overriding in Java.", keywords: ["overloading", "overriding", "polymorphism", "method"] },
    { question: "Coding: How would you find duplicate elements in an integer array using Java?", keywords: ["array", "duplicate", "hashset", "map", "loop"] },
    { question: "What is the Java Collections Framework?", keywords: ["collections", "list", "set", "map", "java"] },
    { question: "Explain checked and unchecked exceptions in Java.", keywords: ["exception", "checked", "unchecked", "try", "catch"] },
    { question: "What is garbage collection in Java?", keywords: ["garbage collection", "heap", "memory", "object"] },
  ],
  Python: [
    { question: "What is the difference between a list, tuple, set, and dictionary in Python?", keywords: ["list", "tuple", "set", "dictionary", "mutable"] },
    { question: "Explain list comprehension and when you would use it.", keywords: ["list comprehension", "list", "loop", "python"] },
    { question: "Coding: Explain Python code to count word frequencies in a string.", keywords: ["string", "frequency", "dictionary", "count", "python"] },
    { question: "What are *args and **kwargs in Python?", keywords: ["args", "kwargs", "function", "arguments"] },
    { question: "Explain Python exception handling.", keywords: ["try", "except", "finally", "exception"] },
    { question: "What is a Python virtual environment and why is it useful?", keywords: ["virtual environment", "venv", "dependencies", "python"] },
  ],
  JavaScript: [
    { question: "Explain the difference between var, let, and const.", keywords: ["var", "let", "const", "scope"] },
    { question: "What is a closure in JavaScript?", keywords: ["closure", "scope", "function", "variable"] },
    { question: "Coding: How would you remove duplicate values from an array in JavaScript?", keywords: ["array", "duplicate", "set", "filter", "javascript"] },
    { question: "Explain promises and async/await in JavaScript.", keywords: ["promise", "async", "await", "asynchronous"] },
    { question: "What is the JavaScript event loop?", keywords: ["event loop", "call stack", "queue", "javascript"] },
    { question: "Explain the difference between == and ===.", keywords: ["==", "===", "type", "strict", "comparison"] },
  ],
  TypeScript: [
    { question: "Why would you use TypeScript instead of plain JavaScript?", keywords: ["typescript", "types", "javascript", "errors"] },
    { question: "Explain interfaces and type aliases in TypeScript.", keywords: ["interface", "type", "typescript"] },
    { question: "Coding: Define a TypeScript type for an array of users and explain it.", keywords: ["type", "array", "user", "typescript"] },
    { question: "What are generics in TypeScript?", keywords: ["generics", "type", "reusable", "typescript"] },
    { question: "What is type narrowing in TypeScript?", keywords: ["type narrowing", "typeof", "union", "typescript"] },
    { question: "How does TypeScript help catch errors before runtime?", keywords: ["compile", "type checking", "error", "typescript"] },
  ],
  SQL: [
    { question: "Explain the difference between WHERE and HAVING in SQL.", keywords: ["where", "having", "group by", "sql"] },
    { question: "Explain INNER JOIN, LEFT JOIN, and RIGHT JOIN.", keywords: ["inner join", "left join", "right join", "join"] },
    { question: "Coding: Write or explain a query to find the second-highest salary.", keywords: ["sql", "salary", "order by", "limit", "subquery"] },
    { question: "What is database normalization and why is it used?", keywords: ["normalization", "database", "redundancy", "normal form"] },
    { question: "What is an index and how can it improve query performance?", keywords: ["index", "query", "performance", "database"] },
    { question: "Explain GROUP BY and aggregate functions such as COUNT and AVG.", keywords: ["group by", "count", "avg", "aggregate"] },
  ],
};

function getResumeQuestions(resumeText: string): Question[] {
  const lower = resumeText.toLowerCase();
  const detectedSkills = [
    "java", "python", "javascript", "typescript", "react", "node.js",
    "node", "sql", "mongodb", "mysql", "c++", "c", "aws", "docker",
    "git", "machine learning", "data science", "cybersecurity",
    "html", "css",
  ].filter((skill) => lower.includes(skill));

  const skillText =
    detectedSkills.length > 0
      ? detectedSkills.join(", ")
      : "the technologies listed on your resume";

  return [
    {
      question: "Walk me through your resume and highlight the engineering experience you are most proud of.",
      keywords: ["resume", "experience", "project", "skill", "engineering"],
    },
    {
      question: `Your resume mentions ${skillText}. Which of these skills are you strongest in, and how have you demonstrated them?`,
      keywords: detectedSkills.length ? detectedSkills.slice(0, 5) : ["skill", "project", "experience"],
    },
    {
      question: "Choose one project from your resume. Explain the problem, your role, the technologies used, and the final result.",
      keywords: ["project", "problem", "role", "technology", "result"],
    },
    {
      question: "What was the most difficult technical decision you made in one of the projects on your resume?",
      keywords: ["technical", "decision", "project", "problem", "solution"],
    },
    {
      question: "If I asked you to improve your strongest project from the resume, what would you change and why?",
      keywords: ["project", "improve", "performance", "security", "scalability"],
    },
    {
      question: "Which achievement on your resume best proves that you can contribute to an engineering team?",
      keywords: ["achievement", "impact", "team", "result", "contribution"],
    },
  ];
}

function getQuestions(
  branch: EngineeringBranch,
  type: InterviewType,
  language: ProgrammingLanguage,
  resumeText: string
): Question[] {
  const technical = branchQuestions[branch] || commonTechnicalQuestions;
  const branchTechnical = [...technical, ...commonTechnicalQuestions].slice(0, 6);

  if (type === "Technical") {
    return [
      branchTechnical[0], codingQuestions[0],
      branchTechnical[1], codingQuestions[1],
      branchTechnical[2], codingQuestions[2],
      branchTechnical[3], codingQuestions[3],
      branchTechnical[4], codingQuestions[4],
    ];
  }

  if (type === "HR / Behavioral") {
    return [...commonHrQuestions, ...commonHrQuestions.slice(0, 2)];
  }

  if (type === "Language-Specific") {
    return languageQuestions[language];
  }

  if (type === "Resume-Related") {
    return getResumeQuestions(resumeText);
  }

  return [
    branchTechnical[0], codingQuestions[0], commonHrQuestions[0],
    branchTechnical[1], codingQuestions[1], commonHrQuestions[1],
    branchTechnical[2], codingQuestions[2], commonHrQuestions[2],
    branchTechnical[3],
  ];
}


const STORAGE_KEY = "careerpath_engineering_interview_history";

type InterviewHistoryItem = {
  id: number;
  score: number;
  branch: EngineeringBranch;
  type: InterviewType;
  date: string;
};

function getStoredHistory(): InterviewHistoryItem[] {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id || user?._id;

    if (!userId) return [];

    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is InterviewHistoryItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as InterviewHistoryItem).id === "number" &&
        typeof (item as InterviewHistoryItem).score === "number" &&
        typeof (item as InterviewHistoryItem).branch === "string" &&
        typeof (item as InterviewHistoryItem).type === "string" &&
        typeof (item as InterviewHistoryItem).date === "string"
    );
  } catch {
    return [];
  }
}

function saveInterview(
  score: number,
  branch: EngineeringBranch,
  type: InterviewType
) {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id || user?._id;

    if (!userId) return;

    const key = `${STORAGE_KEY}_${userId}`;
    const history = getStoredHistory();

    history.unshift({
      id: Date.now(),
      score,
      branch,
      type,
      date: new Date().toISOString(),
    });

    localStorage.setItem(key, JSON.stringify(history.slice(0, 20)));
  } catch {
    // Keep the interview usable if localStorage is unavailable.
  }
}

function evaluateAnswer(
  answer: string,
  question: Question
): Evaluation {
  const normalized = answer.trim().toLowerCase();

  if (!normalized) {
    return {
      score: 0,
      strengths: ["No answer was submitted."],
      improvements: [
        "Answer the question directly.",
        "Include an explanation and an engineering example where possible.",
      ],
      feedback:
        "No answer was provided. Try explaining your reasoning clearly.",
    };
  }

  const words = normalized.split(/\s+/).filter(Boolean);
  const matchedKeywords = question.keywords.filter((keyword) =>
    normalized.includes(keyword.toLowerCase())
  );

  const relevanceScore = Math.round(
    (matchedKeywords.length / Math.max(question.keywords.length, 1)) * 55
  );

  const lengthScore =
    words.length >= 80
      ? 25
      : words.length >= 40
        ? 20
        : words.length >= 20
          ? 12
          : 5;

  const clarityScore =
    words.length >= 30 && /[.!?]/.test(answer) ? 20 : 10;

  const score = Math.min(
    100,
    Math.max(10, relevanceScore + lengthScore + clarityScore)
  );

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (matchedKeywords.length > 0) {
    strengths.push(
      `You addressed ${matchedKeywords.length} important concept${matchedKeywords.length > 1 ? "s" : ""
      } from the question.`
    );
  }

  if (words.length >= 40) {
    strengths.push(
      "Your answer provides enough detail to demonstrate your reasoning."
    );
  } else {
    strengths.push("You gave a direct response to the question.");
  }

  if (/[.!?]/.test(answer)) {
    strengths.push("Your response is presented in complete statements.");
  }

  if (matchedKeywords.length < Math.ceil(question.keywords.length / 2)) {
    improvements.push(
      "Cover more of the important concepts related to the question."
    );
  }

  if (words.length < 40) {
    improvements.push(
      "Add an explanation, practical example, or engineering use case."
    );
  }

  if (score < 70) {
    improvements.push(
      "Structure the response as concept → explanation → example."
    );
  }

  if (improvements.length === 0) {
    improvements.push(
      "Add a real-world example or trade-off to make the answer stronger."
    );
  }

  const feedback =
    score >= 85
      ? "Strong answer. You covered the important concepts and communicated your understanding clearly."
      : score >= 70
        ? "Good answer. The main idea is clear; add more depth and practical examples to improve it."
        : score >= 50
          ? "Partially correct. Focus on the core concepts and explain them with a practical engineering example."
          : "The answer needs more development. Review the topic and practice explaining it step by step.";

  return {
    score,
    strengths,
    improvements,
    feedback,
  };
}

export default function Interview() {
  const [branch, setBranch] = useState<EngineeringBranch | "">("");
  const [interviewType, setInterviewType] =
    useState<InterviewType>("Technical");

  const [language, setLanguage] =
    useState<ProgrammingLanguage>("Java");

  const [resumeText, setResumeText] =
    useState("");

  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] =
    useState<Evaluation | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [history, setHistory] = useState(getStoredHistory);

  const questions = useMemo(
    () =>
      branch
        ? getQuestions(
          branch,
          interviewType,
          language,
          resumeText
        )
        : [],
    [branch, interviewType, language, resumeText]
  );

  const currentQuestion = questions[questionIndex];

  const averageScore =
    scores.length > 0
      ? Math.round(
        scores.reduce((sum, score) => sum + score, 0) /
        scores.length
      )
      : 0;

  const handleStart = () => {
    if (!branch) return;

    if (
      interviewType === "Resume-Related" &&
      !resumeText.trim()
    ) {
      return;
    }

    setStarted(true);
    setQuestionIndex(0);
    setAnswer("");
    setEvaluation(null);
    setScores([]);
    setFinished(false);
  };

  const handleSubmit = () => {
    if (!currentQuestion || !answer.trim()) return;

    const result = evaluateAnswer(
      answer,
      currentQuestion
    );

    setEvaluation(result);
    setScores((current) => [
      ...current,
      result.score,
    ]);
  };

  const handleNext = () => {
    if (!branch) return;

    if (
      questionIndex >=
      questions.length - 1
    ) {
      const finalScores = [
        ...scores,
      ];

      const finalAverage =
        finalScores.length > 0
          ? Math.round(
            finalScores.reduce(
              (sum, score) =>
                sum + score,
              0
            ) /
            finalScores.length
          )
          : 0;

      saveInterview(
        finalAverage,
        branch,
        interviewType
      );

      setHistory(
        getStoredHistory()
      );

      setFinished(true);
      return;
    }

    setQuestionIndex(
      (current) => current + 1
    );

    setAnswer("");
    setEvaluation(null);
  };

  const handleExit = () => {
    setStarted(false);
    setFinished(false);
    setEvaluation(null);
    setAnswer("");
    setScores([]);
  };

  const previousAverage =
    history.length > 0
      ? Math.round(
        history.reduce(
          (sum, item) => sum + item.score,
          0
        ) / history.length
      )
      : 0;

  const bestScore =
    history.length > 0
      ? Math.max(
        ...history.map((item) => item.score)
      )
      : 0;

  useEffect(() => {
    if (!started || finished) return;

    const handleBeforeUnload = (
      event: BeforeUnloadEvent
    ) => {
      if (answer.trim()) {
        event.preventDefault();
      }
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () =>
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
  }, [
    started,
    finished,
    answer,
  ]);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="border-b border-white/10 bg-[#080b18] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <GitBranch
                size={24}
                className="text-indigo-400"
              />

              <h1 className="text-2xl font-bold">
                Engineering Mock Interview
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-400">
              Practice branch-specific engineering
              interviews and improve your performance.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Engineering Practice
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {!started ? (
          <>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
                <Sparkles
                  size={30}
                  className="text-indigo-400"
                />
              </div>

              <h2 className="mt-5 text-3xl font-bold">
                Prepare for Your Engineering Interview
              </h2>

              <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-400">
                Select your engineering branch and interview
                type. Questions will be tailored to your
                engineering field.
              </p>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <GitBranch size={22} className="text-indigo-400" />
                    <h3 className="text-xl font-bold">
                      1. Select Your Engineering Branch
                    </h3>
                  </div>

                  <select
                    value={branch}
                    onChange={(event) =>
                      setBranch(event.target.value as EngineeringBranch)
                    }
                    className="mt-5 w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-4 text-white outline-none focus:border-indigo-500"
                  >
                    <option value="" disabled>
                      Select your engineering branch
                    </option>

                    {branchOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Mic size={22} className="text-indigo-400" />
                    <h3 className="text-xl font-bold">
                      2. Select Interview Type
                    </h3>
                  </div>

                  <select
                    value={interviewType}
                    onChange={(event) =>
                      setInterviewType(event.target.value as InterviewType)
                    }
                    className="mt-5 w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-4 text-white outline-none focus:border-indigo-500"
                  >
                    <option value="Technical">
                      Technical + Coding
                    </option>

                    <option value="HR / Behavioral">
                      HR / Behavioral
                    </option>

                    <option value="Mixed">
                      Mixed + Coding
                    </option>

                    <option value="Language-Specific">
                      Language-Specific
                    </option>

                    <option value="Resume-Related">
                      Resume-Related
                    </option>
                  </select>
                </div>
              </div>

              {interviewType === "Language-Specific" && (
                <div className="mt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                      #
                    </div>
                    <h3 className="font-semibold">
                      Select Programming Language
                    </h3>
                  </div>

                  <select
                    value={language}
                    onChange={(event) =>
                      setLanguage(
                        event.target.value as ProgrammingLanguage
                      )
                    }
                    className="mt-4 w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-4 text-white outline-none focus:border-indigo-500"
                  >
                    {languageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {interviewType === "Resume-Related" && (
                <div className="mt-8">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-indigo-400" />
                    <h3 className="font-semibold">
                      Add Your Resume Details
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Paste your resume text, skills, experience, or project
                    details. Questions will be generated from the information
                    you provide.
                  </p>

                  <textarea
                    value={resumeText}
                    onChange={(event) =>
                      setResumeText(event.target.value)
                    }
                    placeholder="Paste your resume text or important resume details here..."
                    className="mt-4 min-h-40 w-full resize-y rounded-xl border border-white/10 bg-[#0b1120] p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-indigo-500"
                  />
                </div>
              )}

              {branch && (
                <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
                  <p className="text-sm text-gray-400">Selected interview</p>
                  <p className="mt-1 font-semibold text-indigo-300">
                    {branch}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {interviewType === "Technical"
                      ? "Technical concepts + coding questions"
                      : interviewType === "Mixed"
                        ? "Technical + coding + HR questions"
                        : "Engineering-focused HR and behavioral questions"}{" "}
                    · {questions.length} questions
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handleStart}
                  disabled={
                    !branch ||
                    (interviewType === "Resume-Related" &&
                      !resumeText.trim())
                  }
                  className={`flex items-center gap-2 rounded-xl px-7 py-4 font-medium transition ${branch
                      ? "bg-indigo-600 hover:bg-indigo-500"
                      : "cursor-not-allowed bg-gray-700 text-gray-400"
                    }`}
                >
                  <Mic size={18} />
                  Start Interview
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">
              <div className="flex items-center gap-3">
                <Award
                  size={22}
                  className="text-yellow-400"
                />

                <h3 className="text-xl font-bold">
                  Previous Performance
                </h3>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <PerformanceCard
                  label="Interviews Completed"
                  value={history.length}
                />

                <PerformanceCard
                  label="Average Score"
                  value={
                    history.length
                      ? `${previousAverage}%`
                      : "—"
                  }
                />

                <PerformanceCard
                  label="Best Score"
                  value={
                    history.length
                      ? `${bestScore}%`
                      : "—"
                  }
                />
              </div>
            </div>
          </>
        ) : finished ? (
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/20">
                <Trophy
                  size={38}
                  className="text-yellow-400"
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                Interview Completed
              </h2>

              <p className="mt-3 text-gray-400">
                {branch} · {interviewType}
              </p>

              <div className="mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full border-8 border-indigo-500/30">
                <div>
                  <p className="text-3xl font-bold">
                    {averageScore}%
                  </p>

                  <p className="text-xs text-gray-500">
                    Overall Score
                  </p>
                </div>
              </div>

              <p className="mx-auto mt-8 max-w-2xl leading-7 text-gray-400">
                {averageScore >= 85
                  ? "Excellent performance. Continue practicing advanced engineering questions."
                  : averageScore >= 70
                    ? "Good performance. Focus on the improvement areas and continue practicing."
                    : "Keep practicing. Review the engineering concepts that were difficult and try another interview."}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500"
                >
                  <RotateCcw size={18} />
                  Try Again
                </button>

                <button
                  type="button"
                  onClick={handleExit}
                  className="rounded-xl border border-white/10 px-6 py-3 text-gray-300 hover:bg-white/5"
                >
                  Choose Another Branch
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
              <h3 className="text-xl font-bold">
                Question Performance
              </h3>

              <div className="mt-6 space-y-3">
                {scores.map(
                  (score, index) => (
                    <div
                      key={`${index}-${score}`}
                      className="flex items-center justify-between rounded-xl bg-[#0b1120] px-5 py-4"
                    >
                      <span className="text-gray-400">
                        Question {index + 1}
                      </span>

                      <span
                        className={
                          score >= 70
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {score}%
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
                <Mic
                  size={30}
                  className="text-indigo-400"
                />
              </div>

              <h2 className="mt-5 text-3xl font-bold">
                {branch}
              </h2>

              <p className="mt-2 text-indigo-300">
                {interviewType} Interview
                {interviewType === "Language-Specific"
                  ? ` · ${language}`
                  : ""}
              </p>

              <p className="mt-3 text-gray-400">
                Answer each question clearly and explain
                your reasoning.
              </p>
            </div>

            {currentQuestion && (
              <div className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-indigo-400">
                    Question{" "}
                    {questionIndex + 1} of{" "}
                    {questions.length}
                  </span>

                  {currentQuestion.question.startsWith("Coding:") && (
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                      Coding Question
                    </span>
                  )}

                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={16} />
                    ~20 min
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold leading-9">
                  {currentQuestion.question}
                </h3>

                <textarea
                  value={answer}
                  onChange={(event) =>
                    setAnswer(
                      event.target.value
                    )
                  }
                  placeholder="Type your answer here..."
                  disabled={Boolean(
                    evaluation
                  )}
                  className="mt-8 min-h-48 w-full resize-none rounded-2xl border border-white/10 bg-[#0b1120] p-5 text-white outline-none placeholder:text-gray-500 focus:border-indigo-500 disabled:opacity-70"
                />

                <div className="mt-3 flex justify-between text-xs text-gray-500">
                  <span>
                    {
                      answer
                        .trim()
                        .split(
                          /\s+/
                        )
                        .filter(
                          Boolean
                        ).length
                    }{" "}
                    words
                  </span>

                  <span>
                    Explain the concept and
                    include an example where
                    possible.
                  </span>
                </div>

                {!evaluation ? (
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={handleExit}
                      className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-400 hover:bg-white/5"
                    >
                      <XCircle size={17} />
                      Exit Interview
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!answer.trim()}
                      className={`flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition ${answer.trim()
                          ? "bg-indigo-600 hover:bg-indigo-500"
                          : "cursor-not-allowed bg-gray-700 text-gray-400"
                        }`}
                    >
                      Submit Answer
                      <ArrowRight
                        size={18}
                      />
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-sm text-gray-400">
                          Question Score
                        </p>

                        <p className="mt-1 text-4xl font-bold text-indigo-300">
                          {evaluation.score}%
                        </p>
                      </div>

                      <div className="max-w-2xl">
                        <p className="font-semibold">
                          Feedback
                        </p>

                        <p className="mt-2 leading-7 text-gray-400">
                          {
                            evaluation.feedback
                          }
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold text-green-400">
                          Strengths
                        </h4>

                        <ul className="mt-3 space-y-2 text-sm text-gray-400">
                          {evaluation.strengths.map(
                            (item) => (
                              <li
                                key={item}
                                className="flex gap-2"
                              >
                                <CheckCircle
                                  size={16}
                                  className="mt-0.5 shrink-0 text-green-400"
                                />
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-yellow-400">
                          Improve
                        </h4>

                        <ul className="mt-3 space-y-2 text-sm text-gray-400">
                          {evaluation.improvements.map(
                            (item) => (
                              <li
                                key={item}
                                className="flex gap-2"
                              >
                                <ArrowRight
                                  size={16}
                                  className="mt-0.5 shrink-0 text-yellow-400"
                                />
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={
                          handleNext
                        }
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500"
                      >
                        {questionIndex ===
                          questions.length -
                          1
                          ? "Finish Interview"
                          : "Next Question"}

                        <ArrowRight
                          size={18}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function PerformanceCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-[#0b1120] p-5">
      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}