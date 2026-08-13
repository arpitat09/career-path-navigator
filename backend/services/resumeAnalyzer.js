import { CAREERS } from "../data/careers.js";

/*
=========================================================
CAREERPATH - RESUME ANALYZER
=========================================================

NO AI

This file handles:

1. Resume text cleaning
2. Name detection
3. Contact detection
4. Skill detection
5. Skill normalization
6. Resume section detection
7. ATS score calculation
8. Strength generation
9. Improvement generation
10. Career recommendation
11. Skills gap analysis
=========================================================
*/


/*
=========================================================
SUPPORTED SKILLS
=========================================================
*/

const SKILLS = [
  "HTML",
  "HTML5",

  "CSS",
  "CSS3",

  "JavaScript",
  "TypeScript",

  "React",
  "React.js",

  "Angular",
  "Vue",
  "Next.js",

  "Node.js",
  "NodeJS",

  "Express",
  "Express.js",

  "Python",
  "Java",
  "C",
  "C++",
  "C#",

  "SQL",
  "MySQL",
  "PostgreSQL",

  "MongoDB",
  "Firebase",
  "Supabase",

  "Git",
  "GitHub",

  "Docker",
  "Kubernetes",

  "AWS",
  "Azure",
  "GCP",

  "REST API",
  "REST APIs",
  "GraphQL",

  "Postman",

  "Figma",
  "Canva",

  "Tailwind CSS",
  "Bootstrap",

  "Vite",

  "Machine Learning",
  "Deep Learning",
  "Data Science",

  "Pandas",
  "NumPy",
  "TensorFlow",
  "PyTorch",

  "Spring Boot",
  "Django",
  "Flask",

  "Linux",

  "UI/UX",
  "UX/UI",

  "Excel",
  "Statistics",
  "Data Visualization",
  "User Research",
  "Wireframing",
  "Prototyping"
];


/*
=========================================================
TEXT CLEANING
=========================================================
*/

function cleanText(text) {
  return String(text || "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


/*
=========================================================
URL CLEANING
=========================================================
*/

function cleanUrl(url) {
  return String(url)
    .trim()
    .replace(/[),.;]+$/, "");
}


/*
=========================================================
CONTACT INFORMATION
=========================================================
*/

function extractContactInfo(text) {
  const emailMatch = text.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  );

  const phoneMatch = text.match(
    /(?:\+?\d[\d\s().-]{8,}\d)/
  );

  const linkedinMatch = text.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/[A-Za-z0-9._~:/?#@!$&'()*+,;=%-]+/i
  );

  const githubMatch = text.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9._~:/?#@!$&'()*+,;=%-]+/i
  );

  return {
    email: emailMatch
      ? emailMatch[0]
      : "",

    phone: phoneMatch
      ? phoneMatch[0].trim()
      : "",

    linkedin: linkedinMatch
      ? cleanUrl(linkedinMatch[0])
      : "",

    github: githubMatch
      ? cleanUrl(githubMatch[0])
      : ""
  };
}


/*
=========================================================
SKILL NORMALIZATION
=========================================================
*/

function normalizeSkill(skill) {
  const value =
    String(skill)
      .toLowerCase()
      .trim();

  /*
  React
  */

  if (
    value === "react" ||
    value === "react.js"
  ) {
    return "React";
  }

  /*
  Node.js
  */

  if (
    value === "node.js" ||
    value === "nodejs"
  ) {
    return "Node.js";
  }

  /*
  Express
  */

  if (
    value === "express" ||
    value === "express.js"
  ) {
    return "Express.js";
  }

  /*
  REST APIs
  */

  if (
    value === "rest api" ||
    value === "rest apis"
  ) {
    return "REST APIs";
  }

  /*
  HTML
  */

  if (
    value === "html" ||
    value === "html5"
  ) {
    return "HTML";
  }

  /*
  CSS
  */

  if (
    value === "css" ||
    value === "css3"
  ) {
    return "CSS";
  }

  /*
  UI/UX
  */

  if (
    value === "ui/ux" ||
    value === "ux/ui"
  ) {
    return "UI/UX";
  }

  /*
  SQL
  */

  if (
    value === "sql"
  ) {
    return "SQL";
  }

  /*
  MySQL
  */

  if (
    value === "mysql"
  ) {
    return "MySQL";
  }

  /*
  PostgreSQL
  */

  if (
    value === "postgresql"
  ) {
    return "PostgreSQL";
  }

  /*
  GitHub
  */

  if (
    value === "github"
  ) {
    return "GitHub";
  }

  return skill;
}


/*
=========================================================
SKILL DETECTION
=========================================================
*/

function detectSkills(text) {
  const lowerText =
    text.toLowerCase();

  const detected = [];

  for (
    const skill of SKILLS
  ) {
    const lowerSkill =
      skill.toLowerCase();

    /*
    Escape regex characters.
    */

    const escapedSkill =
      lowerSkill.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    /*
    Word-aware matching.

    This prevents things such as:
    "java" being detected inside
    "javascript".
    */

    const pattern =
      new RegExp(
        `(^|[^a-z0-9+#])${escapedSkill}(?=$|[^a-z0-9+#])`,
        "i"
      );

    if (
      pattern.test(lowerText)
    ) {
      detected.push(
        normalizeSkill(skill)
      );
    }
  }

  /*
  Remove duplicate skills.
  */

  return [
    ...new Set(detected)
  ];
}


/*
=========================================================
SECTION DETECTION
=========================================================
*/

function detectSections(text) {
  const lowerText =
    text.toLowerCase();

  return {
    summary:
      /(^|\n)\s*(summary|professional summary|profile|objective|career objective)\s*:?\s*(\n|$)/i.test(
        lowerText
      ),

    education:
      /(^|\n)\s*(education|academic background|academic qualifications|educational qualification)\s*:?\s*(\n|$)/i.test(
        lowerText
      ),

    experience:
      /(^|\n)\s*(experience|work experience|professional experience|employment|internship experience)\s*:?\s*(\n|$)/i.test(
        lowerText
      ),

    skills:
      /(^|\n)\s*(skills|technical skills|technical skill|technologies|core skills|technical expertise)\s*:?\s*(\n|$)/i.test(
        lowerText
      ),

    projects:
      /(^|\n)\s*(projects|personal projects|academic projects|project experience|major projects)\s*:?\s*(\n|$)/i.test(
        lowerText
      ),

    certifications:
      /(^|\n)\s*(certifications|certification|courses|licenses|achievements)\s*:?\s*(\n|$)/i.test(
        lowerText
      )
  };
}


/*
=========================================================
NAME DETECTION
=========================================================
*/

function extractName(text) {
  const lines =
    text
      .split("\n")
      .map((line) =>
        line.trim()
      )
      .filter(Boolean);

  /*
  The name is normally near
  the beginning of the resume.
  */

  for (
    let i = 0;
    i < Math.min(
      lines.length,
      10
    );
    i++
  ) {
    const line =
      lines[i];

    /*
    Ignore URLs.
    */

    if (
      /https?:\/\//i.test(
        line
      )
    ) {
      continue;
    }

    /*
    Ignore email addresses.
    */

    if (
      /@/.test(line)
    ) {
      continue;
    }

    /*
    Ignore common headings.
    */

    if (
      /resume|curriculum vitae|cv|objective|summary|education|skills|experience|projects|certifications/i.test(
        line
      )
    ) {
      continue;
    }

    /*
    Candidate name.
    */

    if (
      line.length >= 3 &&
      line.length <= 60 &&
      /^[A-Za-z][A-Za-z .'-]+$/.test(
        line
      )
    ) {
      return line;
    }
  }

  return "";
}


/*
=========================================================
ATS SCORE
=========================================================
*/

function calculateATSScore({
  contact,
  sections,
  skills,
  text
}) {
  let score = 0;

  /*
  -------------------------------------
  Contact Information = 20
  -------------------------------------
  */

  if (
    contact.email
  ) {
    score += 5;
  }

  if (
    contact.phone
  ) {
    score += 5;
  }

  if (
    contact.linkedin
  ) {
    score += 5;
  }

  if (
    contact.github
  ) {
    score += 5;
  }


  /*
  -------------------------------------
  Resume Sections = 40
  -------------------------------------
  */

  if (
    sections.summary
  ) {
    score += 5;
  }

  if (
    sections.education
  ) {
    score += 8;
  }

  if (
    sections.skills
  ) {
    score += 8;
  }

  if (
    sections.experience
  ) {
    score += 8;
  }

  if (
    sections.projects
  ) {
    score += 8;
  }

  if (
    sections.certifications
  ) {
    score += 3;
  }


  /*
  -------------------------------------
  Skills = 20
  -------------------------------------
  */

  if (
    skills.length >= 10
  ) {
    score += 20;
  } else if (
    skills.length >= 7
  ) {
    score += 16;
  } else if (
    skills.length >= 5
  ) {
    score += 12;
  } else if (
    skills.length >= 3
  ) {
    score += 8;
  } else if (
    skills.length > 0
  ) {
    score += 4;
  }


  /*
  -------------------------------------
  Content Length = 10
  -------------------------------------
  */

  if (
    text.length >= 3000
  ) {
    score += 10;
  } else if (
    text.length >= 2000
  ) {
    score += 8;
  } else if (
    text.length >= 1000
  ) {
    score += 5;
  }


  /*
  -------------------------------------
  Bullet Usage = 10
  -------------------------------------
  */

  const bulletCount =
    (
      text.match(
        /(^|\n)\s*[-•*]/g
      ) || []
    ).length;

  if (
    bulletCount >= 8
  ) {
    score += 10;
  } else if (
    bulletCount >= 4
  ) {
    score += 7;
  } else if (
    bulletCount >= 1
  ) {
    score += 4;
  }


  return Math.min(
    100,
    score
  );
}


/*
=========================================================
STRENGTHS
=========================================================
*/

function generateStrengths({
  contact,
  sections,
  skills
}) {
  const strengths = [];

  if (
    skills.length >= 10
  ) {
    strengths.push(
      `Strong technical skill coverage with ${skills.length} detected skills.`
    );
  } else if (
    skills.length >= 5
  ) {
    strengths.push(
      `Good technical skill coverage with ${skills.length} detected skills.`
    );
  } else if (
    skills.length > 0
  ) {
    strengths.push(
      `Technical skills detected: ${skills.join(", ")}.`
    );
  }

  if (
    sections.projects
  ) {
    strengths.push(
      "Projects section is present."
    );
  }

  if (
    sections.experience
  ) {
    strengths.push(
      "Experience section is present."
    );
  }

  if (
    sections.education
  ) {
    strengths.push(
      "Education section is clearly included."
    );
  }

  if (
    contact.linkedin &&
    contact.github
  ) {
    strengths.push(
      "Both LinkedIn and GitHub profiles are included."
    );
  } else if (
    contact.linkedin
  ) {
    strengths.push(
      "LinkedIn profile is included."
    );
  } else if (
    contact.github
  ) {
    strengths.push(
      "GitHub profile is included."
    );
  }

  return strengths.slice(
    0,
    5
  );
}


/*
=========================================================
IMPROVEMENTS
=========================================================
*/

function generateImprovements({
  contact,
  sections,
  skills,
  text
}) {
  const improvements = [];

  /*
  Contact
  */

  if (
    !contact.email
  ) {
    improvements.push(
      "Add a professional email address."
    );
  }

  if (
    !contact.phone
  ) {
    improvements.push(
      "Add a contact phone number."
    );
  }

  if (
    !contact.linkedin
  ) {
    improvements.push(
      "Add your LinkedIn profile URL."
    );
  }

  if (
    !contact.github
  ) {
    improvements.push(
      "Add your GitHub profile if you have relevant technical projects."
    );
  }


  /*
  Sections
  */

  if (
    !sections.summary
  ) {
    improvements.push(
      "Add a short professional summary targeted to your desired role."
    );
  }

  if (
    !sections.skills
  ) {
    improvements.push(
      "Add a dedicated technical skills section."
    );
  }

  if (
    !sections.projects
  ) {
    improvements.push(
      "Add relevant academic or personal projects."
    );
  }

  if (
    !sections.experience
  ) {
    improvements.push(
      "Add internships, work experience, or relevant practical experience."
    );
  }

  if (
    !sections.education
  ) {
    improvements.push(
      "Add your educational qualifications."
    );
  }


  /*
  Skills
  */

  if (
    skills.length < 5
  ) {
    improvements.push(
      "Add more relevant technical skills that match your target career."
    );
  }


  /*
  Content
  */

  if (
    text.length < 1000
  ) {
    improvements.push(
      "Add more relevant details to your resume."
    );
  }


  return improvements.slice(
    0,
    6
  );
}


/*
=========================================================
CAREER SKILL MATCHING
=========================================================
*/

/*
Some skills are related.

For example:

MySQL → SQL
PostgreSQL → SQL

React.js → React
NodeJS → Node.js

These relationships help career
matching become more realistic.
*/

const SKILL_ALIASES = {
  "mysql": [
    "mysql",
    "sql"
  ],

  "postgresql": [
    "postgresql",
    "sql"
  ],

  "react": [
    "react",
    "react.js"
  ],

  "node.js": [
    "node.js",
    "nodejs"
  ],

  "express.js": [
    "express",
    "express.js"
  ],

  "rest apis": [
    "rest api",
    "rest apis"
  ],

  "ui/ux": [
    "ui/ux",
    "ux/ui"
  ]
};


/*
=========================================================
CHECK WHETHER A REQUIRED SKILL EXISTS
=========================================================
*/

function hasMatchingSkill(
  detectedSkills,
  requiredSkill
) {
  const detected =
    detectedSkills.map(
      (skill) =>
        skill.toLowerCase()
    );

  const required =
    requiredSkill.toLowerCase();

  /*
  Direct match.
  */

  if (
    detected.includes(
      required
    )
  ) {
    return true;
  }

  /*
  Alias match.
  */

  for (
    const [
      key,
      aliases
    ] of Object.entries(
      SKILL_ALIASES
    )
  ) {
    if (
      aliases.includes(
        required
      )
    ) {
      for (
        const detectedSkill
          of detected
      ) {
        if (
          aliases.includes(
            detectedSkill
          )
        ) {
          return true;
        }
      }
    }
  }

  return false;
}


/*
=========================================================
CAREER MATCH CALCULATION
=========================================================
*/

function calculateCareerMatches(
  detectedSkills
) {
  const careers =
    Array.isArray(CAREERS)
      ? CAREERS
      : [];

  return careers
    .map(
      (career) => {
        const matchedSkills = [];
        const missingSkills = [];

        for (
          const requiredSkill
            of career.skills
        ) {
          if (
            hasMatchingSkill(
              detectedSkills,
              requiredSkill
            )
          ) {
            matchedSkills.push(
              requiredSkill
            );
          } else {
            missingSkills.push(
              requiredSkill
            );
          }
        }

        const totalSkills =
          career.skills.length;

        const matchPercentage =
          totalSkills === 0
            ? 0
            : Math.round(
                (
                  matchedSkills.length /
                  totalSkills
                ) * 100
              );

        return {
          id:
            career.id,

          career:
            career.title,

          description:
            career.description,

          match:
            matchPercentage,

          matchedSkills,

          missingSkills,

          totalRequiredSkills:
            totalSkills,

          matchedSkillCount:
            matchedSkills.length
        };
      }
    )
    .sort(
      (a, b) =>
        b.match - a.match
    );
}


/*
=========================================================
SKILLS GAP
=========================================================
*/

function getSkillsGap(
  detectedSkills,
  careerId
) {
  const career =
    CAREERS.find(
      (item) =>
        item.id === careerId
    );

  if (!career) {
    return null;
  }

  const matched = [];
  const missing = [];

  for (
    const requiredSkill
      of career.skills
  ) {
    if (
      hasMatchingSkill(
        detectedSkills,
        requiredSkill
      )
    ) {
      matched.push(
        requiredSkill
      );
    } else {
      missing.push(
        requiredSkill
      );
    }
  }

  const match =
    career.skills.length === 0
      ? 0
      : Math.round(
          (
            matched.length /
            career.skills.length
          ) * 100
        );

  return {
    career:
      career.title,

    careerId:
      career.id,

    match,

    matched,

    missing
  };
}


/*
=========================================================
MAIN ANALYZER
=========================================================
*/

export function analyzeResumeText(
  rawText
) {
  /*
  Clean extracted PDF text.
  */

  const text =
    cleanText(
      rawText
    );


  /*
  Contact information.
  */

  const contact =
    extractContactInfo(
      text
    );


  /*
  Skills.
  */

  const skills =
    detectSkills(
      text
    );


  /*
  Resume sections.
  */

  const sections =
    detectSections(
      text
    );


  /*
  Candidate name.
  */

  const name =
    extractName(
      text
    );


  /*
  ATS score.
  */

  const atsScore =
    calculateATSScore({
      contact,
      sections,
      skills,
      text
    });


  /*
  Strengths.
  */

  const strengths =
    generateStrengths({
      contact,
      sections,
      skills
    });


  /*
  Improvements.
  */

  const improvements =
    generateImprovements({
      contact,
      sections,
      skills,
      text
    });


  /*
  Career recommendations.
  */

  const careerRecommendations =
    calculateCareerMatches(
      skills
    );


  /*
  Select highest matching career.
  */

  const topCareer =
    careerRecommendations.length > 0
      ? careerRecommendations[0]
      : null;


  /*
  Skills gap for top career.
  */

  const skillsGap =
    topCareer
      ? getSkillsGap(
          skills,
          topCareer.id
        )
      : null;


  /*
  Final analysis.
  */

  return {
    name,

    contact,

    skills,

    sections,

    atsScore,

    strengths,

    improvements,

    textLength:
      text.length,

    skillCount:
      skills.length,

    careerRecommendations,

    skillsGap
  };
}