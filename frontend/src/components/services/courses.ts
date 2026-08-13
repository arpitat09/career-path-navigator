export type PracticeQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type CourseLesson = {
  id: string;
  title: string;

  // IMPORTANT:
  // Every lesson has its OWN video.
  videoUrl: string;

  duration: string;

  writtenContent: string;

  questions: PracticeQuestion[];
};

export type CourseModule = {
  id: string;
  title: string;
  lessons: CourseLesson[];
};

export type CourseReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
};

export type Course = {
  id: string;
  career: string;
  title: string;
  description: string;

  price: number;

  level:
    | "Beginner"
    | "Intermediate"
    | "Advanced";

  duration: string;

  lessonsCount: number;
  modulesCount: number;
  projectsCount: number;

  thumbnail: string;

  whatYouLearn: string[];

  modules: CourseModule[];

  reviews: CourseReview[];
};


/* =========================================================
   YOUTUBE HELPER
   ========================================================= */

function youtube(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}


/* =========================================================
   LESSON CREATOR
   ========================================================= */

function getLessonContent(title: string): {
  writtenContent: string;
  questions: PracticeQuestion[];
} {
  const key = title.toLowerCase();

  const topics: Record<string, {
    intro: string;
    points: string[];
    example?: string;
  }> = {
    "introduction to html": {
      intro: "HTML (HyperText Markup Language) defines the structure and meaning of content on a web page. This lesson introduces elements, tags, attributes, nesting, and the basic structure of an HTML document.",
      points: ["HTML describes document structure rather than application logic.", "Elements are commonly written with an opening tag, content, and a closing tag.", "Attributes provide additional information such as href, src, alt, id, and class.", "A well-structured document normally contains html, head, and body sections."],
      example: "<h1>My Portfolio</h1>"
    },
    "html document structure": {
      intro: "An HTML document has a predictable structure that helps browsers parse the page correctly. The doctype declares HTML, the head contains metadata, and the body contains visible page content.",
      points: ["<!DOCTYPE html> tells the browser to use standards mode.", "The head contains metadata, title, links to stylesheets, and other non-page content.", "The body contains headings, paragraphs, images, forms, and other visible content.", "Correct nesting makes documents easier to maintain and accessible."],
      example: "<!DOCTYPE html>\n<html>\n<head><title>Page</title></head>\n<body><h1>Hello</h1></body>\n</html>"
    },
    "semantic html": {
      intro: "Semantic HTML uses elements that communicate the purpose of content. Elements such as header, nav, main, section, article, aside, and footer make documents easier for browsers, search engines, and assistive technologies to understand.",
      points: ["Use elements according to their meaning rather than their default appearance.", "main should contain the primary content of the page.", "nav represents major navigation links.", "article is appropriate for self-contained content such as a post or news item."],
      example: "<main><article><h2>Course</h2><p>Learn HTML.</p></article></main>"
    },
    "links and images": {
      intro: "HTML links connect documents and resources, while images add visual content. The anchor element uses href for its destination and the image element uses src for the image resource.",
      points: ["Use <a href=\"...\"> for navigation.", "Use descriptive link text instead of vague text such as 'click here'.", "Use alt text to describe meaningful images for accessibility.", "Width and height can help reserve layout space for images."],
      example: "<a href=\"/courses\">View courses</a>\n<img src=\"course.jpg\" alt=\"Programming course\">"
    },
    "forms and user input": {
      intro: "HTML forms collect information from users. Form controls such as input, textarea, select, and button can be grouped and labeled so the browser and assistive technologies understand the data being requested.",
      points: ["The form element defines a submission area.", "Labels should be associated with their controls.", "Input type changes the expected data and browser behavior.", "Client-side validation improves user experience but should not replace server-side validation."],
      example: "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" required>"
    },
    "introduction to css": {
      intro: "CSS (Cascading Style Sheets) controls the presentation of HTML. It can change colors, typography, spacing, borders, layout, and responsive behavior without changing the document structure.",
      points: ["CSS rules contain selectors and declarations.", "A declaration has a property and a value.", "Styles can be written inline, in a style element, or in an external stylesheet.", "The cascade determines which applicable rule wins when several rules target the same element."],
      example: "body { font-family: sans-serif; margin: 0; }"
    },
    "css selectors and properties": {
      intro: "CSS selectors identify the elements to style, while properties describe the visual change. Understanding element, class, ID, attribute, descendant, child, and pseudo-class selectors is essential for maintainable stylesheets.",
      points: ["Class selectors are reusable across multiple elements.", "ID selectors are intended for a unique element and have high specificity.", "Combinators express relationships between elements.", "Pseudo-classes such as :hover represent a state of an element."],
      example: ".card:hover { transform: translateY(-2px); }"
    },
    "css box model": {
      intro: "Every CSS element is laid out as a box made of content, padding, border, and margin. Understanding these four areas explains why an element occupies a particular amount of space.",
      points: ["Content is the actual text or child content area.", "Padding creates space inside the border.", "Border surrounds the padding and content.", "Margin creates space outside the border.", "box-sizing: border-box makes declared width and height include padding and border."],
      example: ".card { box-sizing: border-box; padding: 20px; border: 1px solid; }"
    },
    "typography and colors": {
      intro: "Typography and color establish hierarchy, readability, and visual identity. CSS provides control over font family, size, weight, line height, letter spacing, foreground color, and background color.",
      points: ["Use readable font sizes and line heights for body text.", "Font weight can establish hierarchy without excessive decoration.", "Color contrast should be sufficient for readable text.", "Reusable color variables help keep a design consistent."],
      example: ":root { --primary: #4f46e5; }\nh1 { color: var(--primary); }"
    },
    "spacing and positioning": {
      intro: "CSS spacing controls the distance between and inside elements. Positioning determines how an element participates in normal flow or is positioned relative to another box or the viewport.",
      points: ["Use padding for internal spacing and margin for external spacing.", "Flexbox and Grid are usually preferable to manual absolute positioning for page layout.", "position: relative establishes a containing block for absolutely positioned descendants.", "Fixed and sticky positioning can keep important controls visible during scrolling."],
      example: ".container { max-width: 1100px; margin: 0 auto; padding: 24px; }"
    },
    "flexbox": {
      intro: "Flexbox is a one-dimensional layout system designed for arranging items in rows or columns. It is especially useful for navigation bars, card rows, alignment, and distributing available space.",
      points: ["display: flex creates a flex container.", "flex-direction chooses the main axis.", "justify-content controls distribution along the main axis.", "align-items controls alignment on the cross axis.", "gap creates consistent spacing between flex items."],
      example: ".nav { display: flex; align-items: center; justify-content: space-between; gap: 16px; }"
    },
    "css grid": {
      intro: "CSS Grid is a two-dimensional layout system for rows and columns. It is useful for page structures, dashboards, galleries, and responsive card layouts.",
      points: ["grid-template-columns defines column tracks.", "grid-template-rows defines row tracks.", "gap controls spacing between tracks.", "repeat() reduces repetitive track definitions.", "minmax() helps create flexible responsive tracks."],
      example: ".grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }"
    },
    "responsive web design": {
      intro: "Responsive web design allows an interface to adapt to different screen sizes. It combines flexible layouts, relative units, responsive images, and media queries.",
      points: ["Start with layouts that work on small screens and progressively enhance them.", "Use flexible widths instead of fixed page dimensions.", "Use media queries when the layout needs to change at a breakpoint.", "Test navigation, text, cards, and forms at multiple viewport sizes."],
      example: "@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }"
    },
    "media queries": {
      intro: "Media queries apply CSS only when a specified condition is true, such as a viewport width. They are a core mechanism for adapting layouts and typography to different devices.",
      points: ["Use min-width or max-width conditions to define responsive ranges.", "Keep breakpoints based on content rather than specific device names.", "Avoid creating too many breakpoints.", "Combine media queries with flexible layouts rather than relying on them for everything."],
      example: "@media (max-width: 640px) { .sidebar { display: none; } }"
    },
    "javascript introduction": {
      intro: "JavaScript is a programming language used to add behavior and application logic to web pages and many other environments. This lesson introduces statements, expressions, variables, functions, and the browser runtime.",
      points: ["JavaScript executes statements and evaluates expressions.", "Variables store references to values.", "Functions group reusable behavior.", "JavaScript can interact with the DOM, browser APIs, servers, and external services."],
      example: "const greeting = 'Hello';\nconsole.log(greeting);"
    },
    "variables and data types": {
      intro: "JavaScript variables hold values and references. The language includes primitive types such as string, number, boolean, undefined, null, bigint, and symbol, along with objects.",
      points: ["Use const when a binding does not need reassignment.", "Use let when reassignment is required.", "Avoid var in modern code unless there is a specific reason.", "Use typeof carefully because some JavaScript values have historical quirks."],
      example: "const name = 'Arpita';\nlet score = 10;\nscore += 5;"
    },
    "functions": {
      intro: "Functions package reusable behavior and can receive inputs through parameters and produce outputs through return values. JavaScript supports declarations, expressions, arrow functions, callbacks, and higher-order functions.",
      points: ["Parameters define inputs to a function.", "return sends a value back to the caller.", "Arrow functions provide concise syntax and lexical this behavior.", "Functions can be passed as values to other functions."],
      example: "const add = (a, b) => a + b;"
    },
    "arrays": {
      intro: "Arrays store ordered collections of values. JavaScript provides methods such as map, filter, find, reduce, some, every, push, and slice for manipulating and querying arrays.",
      points: ["Array indexes start at zero.", "map creates a transformed array.", "filter keeps elements that satisfy a condition.", "reduce combines elements into an accumulated result."],
      example: "const doubled = [1, 2, 3].map(n => n * 2);"
    },
    "objects": {
      intro: "Objects represent collections of related properties and behavior. Properties can be accessed with dot or bracket notation, and objects are commonly used to represent application data.",
      points: ["Object properties can contain primitive values, arrays, functions, or other objects.", "Dot notation is convenient when the property name is known.", "Bracket notation supports computed or dynamic property names.", "Destructuring can extract selected properties into variables."],
      example: "const user = { name: 'Arpita', role: 'Developer' };\nconsole.log(user.name);"
    },
    "promises": {
      intro: "A Promise represents the eventual result of an asynchronous operation. It can be pending, fulfilled, or rejected and can be consumed with then/catch/finally or async/await.",
      points: ["A fulfilled promise produces a value.", "A rejected promise produces an error reason.", "then handles successful results and can return another promise.", "catch handles failures in a promise chain."],
      example: "fetch('/api/courses').then(response => response.json()).catch(console.error);"
    },
    "async and await": {
      intro: "async and await provide readable syntax for working with Promises. An async function always returns a Promise, while await pauses that function until the awaited Promise settles.",
      points: ["Use try/catch to handle errors around awaited operations.", "await does not block the entire JavaScript runtime.", "Independent asynchronous tasks can often be started together with Promise.all.", "Keep asynchronous functions focused and handle failures explicitly."],
      example: "async function load() {\n  const response = await fetch('/api/data');\n  return response.json();\n}"
    },
    "fetch api": {
      intro: "The Fetch API provides a modern interface for making HTTP requests from JavaScript. A typical request checks the response, converts the body to JSON or text, and handles network or HTTP errors.",
      points: ["fetch returns a Promise.", "response.ok indicates whether the HTTP status is in the successful range.", "response.json() asynchronously parses JSON data.", "POST and other methods can send headers and request bodies."],
      example: "const response = await fetch('/api/courses');\nif (!response.ok) throw new Error('Request failed');\nconst data = await response.json();"
    },
    "introduction to react": {
      intro: "React is a library for building user interfaces from reusable components. Components receive data, render UI, and can respond to state changes and user interactions.",
      points: ["React applications are composed of components.", "JSX describes UI using JavaScript syntax.", "Props pass data from a parent to a child component.", "State stores information that can change during a component's lifetime."],
      example: "function Welcome({ name }) { return <h1>Hello {name}</h1>; }"
    },
    "react components": {
      intro: "React components are reusable units of UI. A component can accept props, maintain state, render other components, and encapsulate part of an application's behavior.",
      points: ["Keep components focused on a clear responsibility.", "Props should be treated as read-only inputs.", "Component composition helps avoid duplicated UI.", "A component re-renders when relevant props or state change."],
      example: "function Card({ title }) { return <section><h2>{title}</h2></section>; }"
    },
    "jsx": {
      intro: "JSX is a syntax extension commonly used with React to describe UI. It looks similar to HTML but is transformed into JavaScript and follows JavaScript expression rules.",
      points: ["Use className instead of class for CSS classes.", "JavaScript expressions can be placed inside curly braces.", "Components must return a valid JSX tree.", "Lists should provide stable keys to their rendered items."],
      example: "const element = <button disabled={loading}>Save</button>;"
    },
    "props": {
      intro: "Props are inputs passed from a parent component to a child component. They allow components to be configured without hard-coding data inside the component.",
      points: ["Props are read-only from the receiving component's perspective.", "Props can contain strings, numbers, objects, arrays, functions, or JSX.", "Callback props let children request actions from parents.", "Avoid duplicating state when a value can be derived from props."],
      example: "<CourseCard title=\"React\" price={699} />"
    },
    "usestate": {
      intro: "useState is a React Hook used to store local component state. Updating state schedules a re-render with the new value.",
      points: ["Call Hooks at the top level of a component or custom Hook.", "Use the setter returned by useState to update state.", "When the next value depends on the previous value, use the functional updater form.", "State updates should be treated as immutable data changes."],
      example: "const [count, setCount] = useState(0);\nsetCount(c => c + 1);"
    },
    "useeffect": {
      intro: "useEffect synchronizes a component with an external system such as a network request, subscription, timer, or browser API. Its dependency list controls when the effect is re-run.",
      points: ["Effects run after rendering.", "Return a cleanup function when an external resource needs cleanup.", "Keep derived calculations in render instead of using an unnecessary effect.", "Dependencies should reflect values used by the effect."],
      example: "useEffect(() => { document.title = `Courses`; }, []);"
    },
    "react router": {
      intro: "React Router provides client-side routing for React applications. Routes map URL paths to components and allow navigation without a full browser reload.",
      points: ["Route paths should represent meaningful application locations.", "Link and NavLink provide declarative navigation.", "Route parameters can identify dynamic resources.", "Nested routes can share layouts and parent UI."],
      example: "<Route path=\"/courses/:courseId\" element={<Course />} />"
    },
    "introduction to node.js": {
      intro: "Node.js is a JavaScript runtime built around the V8 engine and designed for running JavaScript outside the browser. It is widely used for APIs, command-line tools, automation, and backend services.",
      points: ["Node.js provides server-side access to files, networking, and processes.", "npm manages packages and project scripts.", "Node uses an event-driven model for many I/O operations.", "Environment variables are commonly used for configuration and secrets."],
      example: "import http from 'node:http';\nhttp.createServer((req, res) => res.end('OK')).listen(5000);"
    },
    "express introduction": {
      intro: "Express is a web framework for Node.js that simplifies routing, middleware, request handling, and API development.",
      points: ["An Express application is composed of middleware and routes.", "req contains request information and res sends the response.", "Middleware can validate, authenticate, log, or transform requests.", "Routers help organize related endpoints into separate modules."],
      example: "app.get('/api/courses', (req, res) => res.json(courses));"
    },
    "middleware": {
      intro: "Express middleware functions run during the request-response lifecycle. They can inspect a request, modify it, terminate the response, or call next() to continue.",
      points: ["Middleware order matters.", "Authentication middleware can protect selected routes.", "Error middleware uses the Express error-handling signature.", "Keep middleware small and focused."],
      example: "app.use((req, res, next) => { console.log(req.method); next(); });"
    },
    "rest api": {
      intro: "A REST-style API exposes resources through HTTP endpoints. Clients use methods such as GET, POST, PUT/PATCH, and DELETE to read or change server-side data.",
      points: ["GET is normally used to retrieve resources.", "POST commonly creates a new resource.", "PUT/PATCH updates resources.", "DELETE removes a resource.", "Use meaningful status codes and consistent response shapes."],
      example: "GET /api/courses/123\nPOST /api/courses"
    },
    "jwt authentication": {
      intro: "JSON Web Tokens can carry signed claims that a server can verify. In an authentication flow, a server issues a token after successful login and uses it to authorize later requests.",
      points: ["A JWT is commonly composed of header, payload, and signature.", "Signing verifies that the token was produced by a trusted issuer.", "Do not place sensitive secrets directly in the payload.", "Use secure storage and transport appropriate to the application."],
      example: "Authorization: Bearer <token>"
    },
    "introduction to mongodb": {
      intro: "MongoDB is a document-oriented database that stores data as BSON documents inside collections. It is useful when application data maps naturally to flexible document structures.",
      points: ["A database contains collections.", "A collection contains documents.", "Documents can contain nested objects and arrays.", "MongoDB provides CRUD operations for creating, reading, updating, and deleting documents."],
      example: "db.courses.find({ level: 'Beginner' })"
    },
    "crud operations": {
      intro: "CRUD represents Create, Read, Update, and Delete operations. These operations form the basic data-access layer of most database-backed applications.",
      points: ["Create inserts new documents.", "Read queries existing documents.", "Update changes matching documents.", "Delete removes matching documents.", "Always validate input before writing application data."],
      example: "db.users.updateOne({ email }, { $set: { name } })"
    },
    "mongoose": {
      intro: "Mongoose is an ODM for MongoDB and Node.js. It provides schemas, models, validation, middleware, and convenient methods for working with MongoDB documents.",
      points: ["Schemas describe expected document structure.", "Models provide an interface for querying collections.", "Validation can reject invalid application data.", "Populate can resolve references between documents when appropriate."],
      example: "const User = mongoose.model('User', userSchema);"
    },
    "introduction to typescript": {
      intro: "TypeScript adds a static type system to JavaScript. It helps detect many mistakes during development and makes large codebases easier to understand and refactor.",
      points: ["Type annotations describe expected values.", "TypeScript checks code before it is emitted as JavaScript.", "Interfaces and type aliases describe structured data.", "Generics allow reusable type-safe abstractions."],
      example: "type User = { id: string; name: string };"
    },
    "generics": {
      intro: "Generics allow a function, class, or type to work with multiple data types while preserving type information. They are useful when the relationship between input and output types matters.",
      points: ["A type parameter represents a type chosen by the caller.", "Generics reduce unnecessary any usage.", "Constraints can restrict a generic to values with required properties.", "Generic utility functions can be reused across many data types."],
      example: "function first<T>(items: T[]): T { return items[0]; }"
    },
    "introduction to next.js": {
      intro: "Next.js is a React framework for building full-stack web applications. It provides routing, rendering strategies, server capabilities, optimization, and deployment-oriented conventions.",
      points: ["Next.js provides file-system based routing in the App Router.", "Server and client components have different responsibilities.", "Next.js can render pages on the server and cache or revalidate data.", "Built-in image and font features can improve performance."],
      example: "export default function Page() { return <h1>Dashboard</h1>; }"
    },
    "http fundamentals": {
      intro: "HTTP is the protocol used for communication between clients and web servers. Requests contain a method, URL, headers, and sometimes a body; responses contain a status code, headers, and optionally a body.",
      points: ["GET commonly retrieves data.", "POST commonly sends data for creation or processing.", "Headers carry metadata such as content type and authorization.", "Status codes communicate the result of a request."],
      example: "GET /api/courses HTTP/1.1"
    },
    "introduction to java": {
      intro: "Java is a statically typed, object-oriented programming language commonly used for backend systems, Android applications, enterprise software, and many other applications.",
      points: ["Java source code is compiled into bytecode.", "The JVM executes Java bytecode.", "Classes define state and behavior.", "The compiler catches many type errors before execution."],
      example: "public class Main { public static void main(String[] args) { System.out.println(\"Hello\"); } }"
    },
    "classes and objects": {
      intro: "A Java class defines the fields and methods that describe a type. An object is an instance of a class created at runtime.",
      points: ["Fields represent object state.", "Methods represent behavior.", "Constructors initialize new objects.", "Encapsulation controls access to internal state."],
      example: "class User { String name; void greet() { System.out.println(name); } }"
    },
    "inheritance": {
      intro: "Inheritance allows a Java class to derive fields and behavior from another class. It models an is-a relationship and supports overriding inherited methods.",
      points: ["extends creates a class-subclass relationship.", "A subclass can add or override behavior.", "Use inheritance when the relationship is genuinely hierarchical.", "Composition is often preferable when behavior should be assembled rather than inherited."],
      example: "class Admin extends User { }"
    },
    "introduction to spring boot": {
      intro: "Spring Boot simplifies the creation of production-oriented Java applications by providing auto-configuration, dependency management, embedded servers, and conventions for Spring applications.",
      points: ["Spring Boot applications can start with an embedded server.", "Dependency injection connects application components.", "Configuration can be externalized through properties and environment variables.", "Starters simplify common dependency sets."],
      example: "@SpringBootApplication\npublic class Application { public static void main(String[] args) { SpringApplication.run(Application.class, args); } }"
    },
    "introduction to sql": {
      intro: "SQL is used to query and manipulate relational data. Tables contain rows and columns, and SQL statements can retrieve, insert, update, aggregate, and delete data.",
      points: ["SELECT retrieves data.", "WHERE filters rows.", "ORDER BY sorts results.", "GROUP BY creates groups for aggregation.", "JOIN combines related rows from multiple tables."],
      example: "SELECT name, email FROM users WHERE active = true ORDER BY name;"
    },
    "sql joins": {
      intro: "SQL joins combine rows from related tables. INNER JOIN returns matching rows, while LEFT JOIN keeps all rows from the left table even when there is no match.",
      points: ["Join conditions normally compare related keys.", "INNER JOIN returns only matching records.", "LEFT JOIN preserves all left-side records.", "Poor join conditions can create duplicate or unexpectedly large result sets."],
      example: "SELECT u.name, o.id FROM users u JOIN orders o ON o.user_id = u.id;"
    },
    "introduction to power bi": {
      intro: "Power BI is a business intelligence platform for connecting to data, transforming it, modeling relationships, creating calculations, and building interactive reports and dashboards.",
      points: ["Power Query is used for data transformation.", "The model contains tables and relationships.", "DAX creates measures and calculated expressions.", "Visuals communicate trends, comparisons, and key metrics."],
      example: "Build a sales dashboard showing revenue, orders, regions, and monthly trends."
    },
    "python introduction": {
      intro: "Python is a high-level programming language known for readable syntax and a large ecosystem. It is widely used in automation, web development, data analysis, AI, and machine learning.",
      points: ["Python uses indentation to define code blocks.", "Variables are dynamically typed references to objects.", "Functions package reusable behavior.", "Packages such as NumPy and pandas extend Python for data work."],
      example: "name = 'Arpita'\nprint(f'Hello {name}')"
    },
    "numpy": {
      intro: "NumPy provides efficient multidimensional arrays and numerical operations for Python. It is a foundation for many scientific computing and machine-learning libraries.",
      points: ["ndarray represents an N-dimensional array.", "Vectorized operations reduce explicit Python loops for many numerical tasks.", "Shapes describe array dimensions.", "Broadcasting allows compatible arrays to participate in operations without manually repeating data."],
      example: "import numpy as np\na = np.array([1, 2, 3])\nresult = a * 2"
    },
    "pandas": {
      intro: "pandas provides Series and DataFrame structures for tabular data analysis. It supports filtering, grouping, joining, reshaping, missing-value handling, and importing common data formats.",
      points: ["A DataFrame represents labeled tabular data.", "loc and iloc select rows and columns.", "groupby supports grouped analysis.", "isna and fillna help manage missing values."],
      example: "df[df['score'] >= 60].groupby('department')['score'].mean()"
    },
    "introduction to machine learning": {
      intro: "Machine learning trains algorithms to learn patterns from data and use those patterns to make predictions or decisions. A typical workflow includes data preparation, training, validation, evaluation, and deployment.",
      points: ["Supervised learning uses labeled examples.", "Unsupervised learning finds structure without target labels.", "Training data is used to fit model parameters.", "Evaluation should use data that was not used to fit the model."],
      example: "features → preprocessing → model training → validation → evaluation"
    },
    "linear regression": {
      intro: "Linear regression models a numeric target as a linear combination of input features. It is commonly used as a baseline for regression problems and for understanding relationships between variables.",
      points: ["The model learns coefficients for input features.", "Predictions are continuous numeric values.", "Mean squared error is a common regression loss.", "Feature scaling can matter for some optimization approaches."],
      example: "prediction = intercept + coefficient1*x1 + coefficient2*x2"
    },
    "classification": {
      intro: "Classification predicts a discrete category rather than a continuous number. Common examples include spam detection, disease categories, fraud detection, and attack classification.",
      points: ["Binary classification has two classes.", "Multiclass classification has more than two classes.", "Accuracy can be misleading for highly imbalanced datasets.", "Precision, recall, F1-score, and a confusion matrix provide additional insight."],
      example: "network sample → model → normal / scan / intrusion"
    },
    "clustering": {
      intro: "Clustering groups observations according to similarity without requiring labeled target classes. It is an unsupervised learning technique useful for exploration and segmentation.",
      points: ["Clusters are discovered from feature similarity.", "K-means requires a chosen number of clusters.", "Feature scaling can strongly affect distance-based clustering.", "Cluster quality should be interpreted using both metrics and domain knowledge."],
      example: "customer features → clustering → customer segments"
    },
    "introduction to figma": {
      intro: "Figma is a collaborative interface design tool used to create wireframes, high-fidelity screens, components, prototypes, and design systems.",
      points: ["Frames define design surfaces and screen boundaries.", "Layers organize visual objects.", "Components allow reusable interface elements.", "Prototypes connect screens and interactions for testing flows."],
      example: "Create a mobile login screen using a frame, text, inputs, button, and component styles."
    },
    "color theory": {
      intro: "Color theory helps designers choose colors that communicate hierarchy, brand identity, and meaning. A practical interface palette normally defines primary, secondary, surface, text, and feedback colors.",
      points: ["Contrast affects readability and accessibility.", "Color should not be the only signal for important states.", "A limited palette usually creates stronger visual consistency.", "Test colors against real interface backgrounds rather than isolated swatches."],
      example: "primary + neutral surfaces + success/warning/error states"
    },
    "introduction to ux": {
      intro: "User experience design focuses on how people perceive, understand, and use a product. UX work combines research, information architecture, interaction design, visual design, prototyping, and testing.",
      points: ["Start with user needs and problems rather than visual decoration.", "Research helps validate assumptions.", "Usability testing reveals where users struggle.", "Good UX balances user needs, business goals, and technical constraints."],
      example: "problem → research → ideas → prototype → test → iterate"
    },
    "user research": {
      intro: "User research gathers evidence about users, their goals, behaviors, needs, and pain points. Research methods include interviews, surveys, observation, usability tests, and analysis of existing product data.",
      points: ["Define research questions before choosing a method.", "Avoid leading questions that push participants toward an expected answer.", "Look for patterns across participants rather than relying on one opinion.", "Document findings separately from assumptions and interpretations."],
      example: "Research question: Why do new users abandon the onboarding flow?"
    },
    "wireframing": {
      intro: "Wireframes are simplified representations of interface structure. They focus on content hierarchy, layout, navigation, and interaction before visual styling becomes detailed.",
      points: ["Use wireframes to explore structure quickly.", "Prioritize content and user flow over decoration.", "Annotate important interactions when the behavior is not obvious.", "Test wireframes early so expensive visual work is not built on weak structure."],
      example: "header → search → filters → result cards → pagination"
    }
  };

  type LessonTopic = {
    intro: string;
    points: string[];
    example?: string;
  };

  const topicMap = topics as Record<string, LessonTopic>;

  let topic: LessonTopic | undefined = topicMap[key];

  if (!topic) {
    const matchedKey = Object.keys(topicMap).find((candidate) =>
      key.includes(candidate) || candidate.includes(key)
    );

    topic = matchedKey ? topicMap[matchedKey] : undefined;
  }

  if (!topic) {
    topic = {
      intro: `${title} is a focused lesson in the CareerPath AI course. The purpose of this lesson is to understand the concept, connect it to practical development work, and apply it through examples and practice.`,
      points: [
        `Understand the terminology and purpose of ${title}.`,
        `Identify where ${title} is used in real applications.`,
        `Study the examples presented in the video lecture.`,
        `Apply the concept in a small practical exercise.`,
      ],
    };
  }

  const writtenContent = `${title}\n\n${topic.intro}\n\nKey concepts:\n\n${topic.points.map((point) => `• ${point}`).join("\n")}\n\n${topic.example ? `Example:\n\n${topic.example}\n\n` : ""}Learning workflow:\n\n• Watch the complete video lecture.\n• Read this written explanation and revise the key concepts.\n• Try the example yourself instead of only copying it.\n• Complete the practice questions.\n• Mark the lesson complete after finishing the learning activities.`;

  const questions: PracticeQuestion[] = [
    {
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-q1`,
      question: `Which statement best describes ${title}?`,
      options: [
        topic.points[0],
        "It is only useful for documentation and has no practical use.",
        "It replaces every other technology used in the application.",
        "It should never be used in a real project.",
      ],
      correctAnswer: 0,
      explanation: topic.points[0],
    },
    {
      id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-q2`,
      question: `Which is an important learning point for ${title}?`,
      options: [
        topic.points[1],
        "Skip the concept and rely only on generated code.",
        "Use the concept without understanding its purpose.",
        "Avoid testing the concept in practice.",
      ],
      correctAnswer: 0,
      explanation: topic.points[1],
    },
  ];

  return { writtenContent, questions };
}


function createLesson(
  id: string,
  title: string,
  videoId: string,
  duration = "20 min"
): CourseLesson {
  const content = getLessonContent(title);

  return {
    id,
    title,
    videoUrl: youtube(videoId),
    duration,
    writtenContent: content.writtenContent,
    questions: content.questions,
  };
}


/* =========================================================
   MODULE CREATOR
   ========================================================= */

function createModule(
  id: string,
  title: string,
  lessons: {
    title: string;
    videoId: string;
    duration?: string;
  }[]
): CourseModule {
  return {
    id,
    title,

    lessons: lessons.map((lesson, index) =>
      createLesson(
        `${id}-lesson-${index + 1}`,
        lesson.title,
        lesson.videoId,
        lesson.duration
      )
    ),
  };
}


/* =========================================================
   COURSE CREATOR
   ========================================================= */

function createCourse(data: {
  id: string;
  career: string;
  title: string;
  description: string;

  price: number;

  level:
    | "Beginner"
    | "Intermediate"
    | "Advanced";

  duration: string;

  projectsCount: number;

  thumbnail: string;

  whatYouLearn: string[];

  moduleData: {
    id: string;
    title: string;

    lessons: {
      title: string;
      videoId: string;
      duration?: string;
    }[];
  }[];

  reviews?: CourseReview[];
}): Course {
  const modules = data.moduleData.map(
    (module) =>
      createModule(
        module.id,
        module.title,
        module.lessons
      )
  );

  const lessonsCount = modules.reduce(
    (total, module) =>
      total + module.lessons.length,
    0
  );

  return {
    id: data.id,
    career: data.career,
    title: data.title,
    description: data.description,
    price: data.price,
    level: data.level,
    duration: data.duration,
    projectsCount: data.projectsCount,
    thumbnail: data.thumbnail,
    whatYouLearn: data.whatYouLearn,

    modules,

    lessonsCount,

    modulesCount: modules.length,

    reviews: data.reviews || [],
  };
}


/* =========================================================
   COURSE CATALOG
   ========================================================= */

export const courses: Course[] = [

  /* =======================================================
     1. HTML & CSS
     ======================================================= */

  createCourse({
    id: "html-css-mastery",

    career: "Full Stack Developer",

    title: "HTML & CSS Mastery",

    description:
      "Master HTML and CSS through structured video lectures, written lessons, practice questions and projects.",

    price: 399,

    level: "Beginner",

    duration: "4 Weeks",

    projectsCount: 2,

    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",

    whatYouLearn: [
      "HTML fundamentals",
      "Semantic HTML",
      "Forms",
      "CSS fundamentals",
      "Box Model",
      "Flexbox",
      "CSS Grid",
      "Responsive Design",
    ],

    moduleData: [

      {
        id: "html-foundations",

        title:
          "Module 1 — HTML Foundations",

        lessons: [

          {
            title:
              "Introduction to HTML",

            videoId:
              "a_iQb1lnAEQ",

            duration:
              "20 min",
          },

          {
            title:
              "HTML Document Structure",

            videoId:
              "UB1O30fR-EE",

            duration:
              "18 min",
          },

          {
            title:
              "Semantic HTML",

            videoId:
              "kX3TfdUqpuU",

            duration:
              "22 min",
          },

          {
            title:
              "Links and Images",

            videoId:
              "4dprtEzUNU8",

            duration:
              "17 min",
          },

          {
            title:
              "Forms and User Input",

            videoId:
              "fNcJuPIZ2WE",

            duration:
              "24 min",
          },
        ],
      },

      {
        id: "css-foundations",

        title:
          "Module 2 — CSS Foundations",

        lessons: [

          {
            title:
              "Introduction to CSS",

            videoId:
              "1Rs2ND1ryYc",

            duration:
              "20 min",
          },

          {
            title:
              "CSS Selectors and Properties",

            videoId:
              "l1mER1bV0N0",

            duration:
              "22 min",
          },

          {
            title:
              "CSS Box Model",

            videoId:
              "zec1mWwx6Q8",

            duration:
              "20 min",
          },

          {
            title:
              "Typography and Colors",

            videoId:
              "1PnVor36_40",

            duration:
              "18 min",
          },

          {
            title:
              "Spacing and Positioning",

            videoId:
              "j6sJ9V4xX1Y",

            duration:
              "20 min",
          },
        ],
      },

      {
        id: "modern-layouts",

        title:
          "Module 3 — Modern CSS Layouts",

        lessons: [

          {
            title:
              "Flexbox",

            videoId:
              "kRS5ficucNM",

            duration:
              "56 min",
          },

          {
            title:
              "CSS Grid",

            videoId:
              "EiNiSFIPIQE",

            duration:
              "35 min",
          },

          {
            title:
              "Responsive Web Design",

            videoId:
              "srvUrASNj0s",

            duration:
              "40 min",
          },

          {
            title:
              "Media Queries",

            videoId:
              "yU7jJ3NbPdA",

            duration:
              "25 min",
          },

          {
            title:
              "Responsive Portfolio Project",

            videoId:
              "ldwlOzRvYOU",

            duration:
              "60 min",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     2. JAVASCRIPT
     ======================================================= */

  createCourse({
    id: "javascript-mastery",

    career: "Full Stack Developer",

    title: "JavaScript Mastery",

    description:
      "Learn modern JavaScript from fundamentals through asynchronous programming and APIs.",

    price: 599,

    level: "Intermediate",

    duration: "6 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479",

    whatYouLearn: [
      "Variables",
      "Data Types",
      "Functions",
      "Arrays",
      "Objects",
      "DOM",
      "Events",
      "Promises",
      "Async/Await",
      "Fetch API",
    ],

    moduleData: [

      {
        id: "javascript-foundations",

        title:
          "Module 1 — JavaScript Foundations",

        lessons: [

          {
            title:
              "JavaScript Introduction",

            videoId:
              "W6NZfCO5SIk",
          },

          {
            title:
              "Variables and Data Types",

            videoId:
              "9emXNbMrGNI",
          },

          {
            title:
              "Operators and Expressions",

            videoId:
              "5e5qPZ7yK9A",
          },

          {
            title:
              "Conditional Statements",

            videoId:
              "IsG4Xd6LlsM",
          },

          {
            title:
              "Loops",

            videoId:
              "s9wW2PpJsmQ",
          },
        ],
      },

      {
        id: "javascript-core",

        title:
          "Module 2 — Core JavaScript",

        lessons: [

          {
            title:
              "Functions",

            videoId:
              "N8ap4k_1QEQ",
          },

          {
            title:
              "Scope",

            videoId:
              "SBwoFkRjZvE",
          },

          {
            title:
              "Arrays",

            videoId:
              "oigfaZ5ApsM",
          },

          {
            title:
              "Objects",

            videoId:
              "PPZ1o1B8g4I",
          },

          {
            title:
              "Destructuring",

            videoId:
              "NIq3qLaHCIs",
          },
        ],
      },

      {
        id: "javascript-browser",

        title:
          "Module 3 — Browser JavaScript",

        lessons: [

          {
            title:
              "DOM Manipulation",

            videoId:
              "0ik6X4DJKCc",
          },

          {
            title:
              "JavaScript Events",

            videoId:
              "XF1_MlZ5l6M",
          },

          {
            title:
              "Forms with JavaScript",

            videoId:
              "2nZiB1JItbI",
          },

          {
            title:
              "Local Storage",

            videoId:
              "AUOzvFzdIk4",
          },

          {
            title:
              "Browser APIs",

            videoId:
              "r2S7j54I68c",
          },
        ],
      },

      {
        id: "javascript-async",

        title:
          "Module 4 — Asynchronous JavaScript",

        lessons: [

          {
            title:
              "Callbacks",

            videoId:
              "rRgD1yVwIvE",
          },

          {
            title:
              "Promises",

            videoId:
              "DHvZLI7Db8E",
          },

          {
            title:
              "Async and Await",

            videoId:
              "V_Kr9OSfDeU",
          },

          {
            title:
              "Fetch API",

            videoId:
              "cuEtnrL9-H0",
          },

          {
            title:
              "JavaScript API Project",

            videoId:
              "ec8vSKJuZTk",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     3. REACT
     ======================================================= */

  createCourse({
    id: "react-development",

    career: "Frontend Developer",

    title: "React.js Development",

    description:
      "Build modern React applications using components, props, state, hooks, routing and APIs.",

    price: 699,

    level: "Intermediate",

    duration: "6 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",

    whatYouLearn: [
      "React fundamentals",
      "JSX",
      "Components",
      "Props",
      "State",
      "Hooks",
      "React Router",
      "APIs",
      "Forms",
      "Projects",
    ],

    moduleData: [

      {
        id: "react-foundations",

        title:
          "Module 1 — React Foundations",

        lessons: [

          {
            title:
              "Introduction to React",

            videoId:
              "Tn6-PIqc4UM",
          },

          {
            title:
              "React Components",

            videoId:
              "Y2hgEGPzTZY",
          },

          {
            title:
              "JSX",

            videoId:
              "7fPXIu5TN3w",
          },

          {
            title:
              "Props",

            videoId:
              "ghrT3t9XhE8",
          },

          {
            title:
              "State",

            videoId:
              "O6P86uwfdR0",
          },
        ],
      },

      {
        id: "react-hooks",

        title:
          "Module 2 — React Hooks",

        lessons: [

          {
            title:
              "useState",

            videoId:
              "O6P86uwfdR0",
          },

          {
            title:
              "useEffect",

            videoId:
              "0ZJgIjIuY7U",
          },

          {
            title:
              "useContext",

            videoId:
              "5LrDIWkK_Bc",
          },

          {
            title:
              "useRef",

            videoId:
              "t2ypzz6gJm0",
          },

          {
            title:
              "Custom Hooks",

            videoId:
              "J-g9ZJha8FE",
          },
        ],
      },

      {
        id: "react-applications",

        title:
          "Module 3 — React Applications",

        lessons: [

          {
            title:
              "React Router",

            videoId:
              "Ul3y1LXxzdU",
          },

          {
            title:
              "React Forms",

            videoId:
              "Dorf8i6lCuk",
          },

          {
            title:
              "API Integration",

            videoId:
              "bYFYzj1q3cQ",
          },

          {
            title:
              "Authentication",

            videoId:
              "X3qyxo_UTR4",
          },

          {
            title:
              "React Project",

            videoId:
              "bMknfKXIFA8",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     4. NODE + EXPRESS
     ======================================================= */

  createCourse({
    id: "node-express-backend",

    career: "Backend Developer",

    title: "Node.js & Express Backend Development",

    description:
      "Build REST APIs and secure backend applications using Node.js and Express.",

    price: 699,

    level: "Intermediate",

    duration: "6 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",

    whatYouLearn: [
      "Node.js",
      "NPM",
      "Express",
      "Routing",
      "Middleware",
      "REST APIs",
      "JWT",
      "Authentication",
      "Error handling",
    ],

    moduleData: [

      {
        id: "node-foundations",

        title:
          "Module 1 — Node.js",

        lessons: [

          {
            title:
              "Introduction to Node.js",

            videoId:
              "Oe421EPjeBE",
          },

          {
            title:
              "Node Modules",

            videoId:
              "oTuphCkX9gM",
          },

          {
            title:
              "NPM",

            videoId:
              "jHDhaSSKmB0",
          },

          {
            title:
              "File System",

            videoId:
              "U57kU3114Jg",
          },

          {
            title:
              "Environment Variables",

            videoId:
              "5Nq3R8qV4ZQ",
          },
        ],
      },

      {
        id: "express",

        title:
          "Module 2 — Express.js",

        lessons: [

          {
            title:
              "Express Introduction",

            videoId:
              "SccSCuHhOw0",
          },

          {
            title:
              "Express Routing",

            videoId:
              "bM9Qv0k7b8U",
          },

          {
            title:
              "Middleware",

            videoId:
              "zq9G4Qj1lZU",
          },

          {
            title:
              "REST API",

            videoId:
              "fgTGADljAeg",
          },

          {
            title:
              "Error Handling",

            videoId:
              "L72fhGm1tfE",
          },
        ],
      },

      {
        id: "node-auth",

        title:
          "Module 3 — Authentication",

        lessons: [

          {
            title:
              "User Authentication",

            videoId:
              "X8AnVQG0u3U",
          },

          {
            title:
              "Password Hashing",

            videoId:
              "Ud5xKCYQTjM",
          },

          {
            title:
              "JWT Authentication",

            videoId:
              "mbsmsi7l3r4",
          },

          {
            title:
              "Protected Routes",

            videoId:
              "2jqok-WgelI",
          },

          {
            title:
              "Backend Project",

            videoId:
              "qwfE7fSVaZM",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     5. MONGODB
     ======================================================= */

  createCourse({
    id: "mongodb-database",

    career: "Full Stack Developer",

    title: "MongoDB & Database Development",

    description:
      "Learn MongoDB, CRUD operations, queries, indexes, Mongoose and database design.",

    price: 499,

    level: "Intermediate",

    duration: "4 Weeks",

    projectsCount: 2,

    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",

    whatYouLearn: [
      "MongoDB",
      "Documents",
      "Collections",
      "CRUD",
      "Queries",
      "Indexes",
      "Mongoose",
      "Data modeling",
    ],

    moduleData: [

      {
        id: "mongodb-foundations",

        title:
          "Module 1 — MongoDB Foundations",

        lessons: [

          {
            title:
              "Introduction to MongoDB",

            videoId:
              "Www6cTUymCY",
          },

          {
            title:
              "Databases and Collections",

            videoId:
              "ofme2o29B4U",
          },

          {
            title:
              "MongoDB Documents",

            videoId:
              "c2M-rlkkT5o",
          },

          {
            title:
              "CRUD Operations",

            videoId:
              "yE2WjQnM4NQ",
          },

          {
            title:
              "MongoDB Queries",

            videoId:
              "nrD1JYkG3fM",
          },
        ],
      },

      {
        id: "mongodb-advanced",

        title:
          "Module 2 — MongoDB Development",

        lessons: [

          {
            title:
              "Indexes",

            videoId:
              "w3R9tV4N7aM",
          },

          {
            title:
              "Data Modeling",

            videoId:
              "pWbMrx5rVBE",
          },

          {
            title:
              "Mongoose",

            videoId:
              "DZBGEVgL2eE",
          },

          {
            title:
              "MongoDB with Node.js",

            videoId:
              "9OfL9H6AmhQ",
          },

          {
            title:
              "MongoDB Project",

            videoId:
              "W1Kzu2gV6zY",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     6. TYPESCRIPT
     ======================================================= */

  createCourse({
    id: "typescript-modern",

    career: "Frontend Developer",

    title: "TypeScript for Modern Development",

    description:
      "Build scalable applications with TypeScript and strong static typing.",

    price: 499,

    level: "Intermediate",

    duration: "4 Weeks",

    projectsCount: 2,

    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea",

    whatYouLearn: [
      "Types",
      "Interfaces",
      "Functions",
      "Generics",
      "Classes",
      "Utility Types",
      "React with TypeScript",
    ],

    moduleData: [

      {
        id: "typescript-foundations",

        title:
          "Module 1 — TypeScript Foundations",

        lessons: [

          {
            title:
              "Introduction to TypeScript",

            videoId:
              "gp5H0Vw39yw",
          },

          {
            title:
              "TypeScript Types",

            videoId:
              "ahCwqrYpIuM",
          },

          {
            title:
              "Functions in TypeScript",

            videoId:
              "d56mG7DezGs",
          },

          {
            title:
              "Interfaces",

            videoId:
              "eYz8B2D0D4I",
          },

          {
            title:
              "TypeScript Objects",

            videoId:
              "1C7F4m0pF7M",
          },
        ],
      },

      {
        id: "typescript-advanced",

        title:
          "Module 2 — Advanced TypeScript",

        lessons: [

          {
            title:
              "Generics",

            videoId:
              "IOzkOXSz9gE",
          },

          {
            title:
              "Union Types",

            videoId:
              "G2U5e3K9p0Y",
          },

          {
            title:
              "Utility Types",

            videoId:
              "D9D4J5mV9V4",
          },

          {
            title:
              "Classes",

            videoId:
              "8A6teukP5jY",
          },

          {
            title:
              "React with TypeScript",

            videoId:
              "TPACABQTHvM",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     7. NEXT.JS
     ======================================================= */

  createCourse({
    id: "nextjs-development",

    career: "Frontend Developer",

    title: "Next.js Development",

    description:
      "Build modern production-ready applications with Next.js.",

    price: 799,

    level: "Advanced",

    duration: "6 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1558655146-d09347e92766",

    whatYouLearn: [
      "Next.js",
      "Routing",
      "Layouts",
      "Server Components",
      "Data Fetching",
      "Authentication",
      "Deployment",
    ],

    moduleData: [

      {
        id: "next-foundations",

        title:
          "Module 1 — Next.js Foundations",

        lessons: [

          {
            title:
              "Introduction to Next.js",

            videoId:
              "wm5gMKuwSYk",
          },

          {
            title:
              "Next.js Project Structure",

            videoId:
              "843o2t5j1Q4",
          },

          {
            title:
              "Next.js Routing",

            videoId:
              "ge9K7K7D7g8",
          },

          {
            title:
              "Layouts",

            videoId:
              "QF7G7K6H6Yw",
          },

          {
            title:
              "Components",

            videoId:
              "ZVnjOPwW4ZA",
          },
        ],
      },

      {
        id: "next-production",

        title:
          "Module 2 — Production Applications",

        lessons: [

          {
            title:
              "Data Fetching",

            videoId:
              "VBlSe8tvg4U",
          },

          {
            title:
              "Authentication",

            videoId:
              "Jr0iJpM9G7M",
          },

          {
            title:
              "API Routes",

            videoId:
              "f2c2n5m6d7A",
          },

          {
            title:
              "Optimization",

            videoId:
              "f1r7F9R9r5U",
          },

          {
            title:
              "Next.js Project",

            videoId:
              "wm5gMKuwSYk",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     8. REST API
     ======================================================= */

  createCourse({
    id: "backend-api-development",

    career: "Backend Developer",

    title: "REST API & Backend Engineering",

    description:
      "Learn professional REST API design, authentication, validation, testing and deployment.",

    price: 699,

    level: "Intermediate",

    duration: "5 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",

    whatYouLearn: [
      "HTTP",
      "REST",
      "API endpoints",
      "Authentication",
      "Authorization",
      "JWT",
      "Validation",
      "Testing",
    ],

    moduleData: [

      {
        id: "api-foundations",

        title:
          "Module 1 — API Foundations",

        lessons: [

          {
            title:
              "HTTP Fundamentals",

            videoId:
              "iYM2zFP3Zn0",
          },

          {
            title:
              "REST Architecture",

            videoId:
              "Q-BpqyOT3a8",
          },

          {
            title:
              "HTTP Methods",

            videoId:
              "R8_veQiYBjI",
          },

          {
            title:
              "Status Codes",

            videoId:
              "ZVhJg3qG9JY",
          },

          {
            title:
              "API Endpoints",

            videoId:
              "fgTGADljAeg",
          },
        ],
      },

      {
        id: "api-security",

        title:
          "Module 2 — Secure APIs",

        lessons: [

          {
            title:
              "Authentication",

            videoId:
              "2jqok-WgelI",
          },

          {
            title:
              "Authorization",

            videoId:
              "P7Z7Y2Y5dW4",
          },

          {
            title:
              "JWT",

            videoId:
              "mbsmsi7l3r4",
          },

          {
            title:
              "Validation",

            videoId:
              "D8M5g5N6s4E",
          },

          {
            title:
              "API Security",

            videoId:
              "zq9G4Qj1lZU",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     9. CORE JAVA
     ======================================================= */

  createCourse({
    id: "core-java",

    career: "Java Developer",

    title: "Core Java Programming",

    description:
      "Build strong Java programming fundamentals and object-oriented programming skills.",

    price: 699,

    level: "Beginner",

    duration: "8 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

    whatYouLearn: [
      "Java syntax",
      "Variables",
      "Loops",
      "Classes",
      "Objects",
      "Inheritance",
      "Interfaces",
      "Collections",
      "Exceptions",
    ],

    moduleData: [

      {
        id: "java-foundations",

        title:
          "Module 1 — Java Foundations",

        lessons: [

          {
            title:
              "Introduction to Java",

            videoId:
              "A74TOX803D0",
          },

          {
            title:
              "Variables and Data Types",

            videoId:
              "grEKMHGYyns",
          },

          {
            title:
              "Operators",

            videoId:
              "v7gIu6f3vJQ",
          },

          {
            title:
              "Conditional Statements",

            videoId:
              "eP_7D8M9K9Y",
          },

          {
            title:
              "Loops",

            videoId:
              "lJZLatP7Y6c",
          },
        ],
      },

      {
        id: "java-oop",

        title:
          "Module 2 — Object-Oriented Java",

        lessons: [

          {
            title:
              "Classes and Objects",

            videoId:
              "IUqKuGNasdM",
          },

          {
            title:
              "Constructors",

            videoId:
              "6T_HgnjoYwM",
          },

          {
            title:
              "Inheritance",

            videoId:
              "Zs342ePFvRI",
          },

          {
            title:
              "Polymorphism",

            videoId:
              "Y3J6tQ0ZJ5Y",
          },

          {
            title:
              "Interfaces",

            videoId:
              "R1G9m5J0J7Y",
          },
        ],
      },

      {
        id: "java-collections",

        title:
          "Module 3 — Java Collections",

        lessons: [

          {
            title:
              "ArrayList",

            videoId:
              "A4cA0kY2vZ0",
          },

          {
            title:
              "LinkedList",

            videoId:
              "e2Y2J5g4R5A",
          },

          {
            title:
              "HashMap",

            videoId:
              "r3T5v6G8B9M",
          },

          {
            title:
              "HashSet",

            videoId:
              "J3Q8r7W5M2Y",
          },

          {
            title:
              "Collections Practice",

            videoId:
              "A74TOX803D0",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     10. SPRING BOOT
     ======================================================= */

  createCourse({
    id: "spring-boot",

    career: "Java Developer",

    title: "Spring Boot Backend Development",

    description:
      "Build professional Java REST APIs and backend applications using Spring Boot.",

    price: 899,

    level: "Advanced",

    duration: "8 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",

    whatYouLearn: [
      "Spring Boot",
      "Dependency Injection",
      "REST APIs",
      "Spring Data",
      "JPA",
      "Validation",
      "Security",
      "Testing",
    ],

    moduleData: [

      {
        id: "spring-foundations",

        title:
          "Module 1 — Spring Boot Foundations",

        lessons: [

          {
            title:
              "Introduction to Spring Boot",

            videoId:
              "Cw0J6jYJtzw",
          },

          {
            title:
              "Project Structure",

            videoId:
              "9SGDpanrc8U",
          },

          {
            title:
              "Dependency Injection",

            videoId:
              "GQk2sKJ6L4A",
          },

          {
            title:
              "Controllers",

            videoId:
              "x6w8V9T5M7Y",
          },

          {
            title:
              "Services",

            videoId:
              "d8Q8m6P5K4Y",
          },
        ],
      },

      {
        id: "spring-data",

        title:
          "Module 2 — Spring Data",

        lessons: [

          {
            title:
              "REST APIs",

            videoId:
              "9SGDpanrc8U",
          },

          {
            title:
              "Spring Data JPA",

            videoId:
              "x1X2Y3Z4A5B",
          },

          {
            title:
              "Database Integration",

            videoId:
              "B6C7D8E9F0G",
          },

          {
            title:
              "Validation",

            videoId:
              "H1I2J3K4L5M",
          },

          {
            title:
              "Exception Handling",

            videoId:
              "N6O7P8Q9R0S",
          },
        ],
      },

      {
        id: "spring-security",

        title:
          "Module 3 — Security & Project",

        lessons: [

          {
            title:
              "Authentication",

            videoId:
              "T1U2V3W4X5Y",
          },

          {
            title:
              "Authorization",

            videoId:
              "Z6A7B8C9D0E",
          },

          {
            title:
              "JWT Authentication",

            videoId:
              "F1G2H3I4J5K",
          },

          {
            title:
              "Testing",

            videoId:
              "L6M7N8O9P0Q",
          },

          {
            title:
              "Spring Boot Project",

            videoId:
              "Cw0J6jYJtzw",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     11. SQL
     ======================================================= */

  createCourse({
    id: "sql-data-analysis",

    career: "Data Analyst",

    title: "SQL for Data Analysis",

    description:
      "Learn SQL from fundamentals to advanced data analysis queries.",

    price: 599,

    level: "Beginner",

    duration: "5 Weeks",

    projectsCount: 2,

    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",

    whatYouLearn: [
      "SELECT",
      "Filtering",
      "Functions",
      "GROUP BY",
      "Joins",
      "Subqueries",
      "CTEs",
      "Window Functions",
    ],

    moduleData: [

      {
        id: "sql-foundations",

        title:
          "Module 1 — SQL Foundations",

        lessons: [

          {
            title:
              "Introduction to SQL",

            videoId:
              "HXV3zeQKqGY",
          },

          {
            title:
              "SELECT Statements",

            videoId:
              "7S_tz1z_5bA",
          },

          {
            title:
              "Filtering Data",

            videoId:
              "KZ5d5D7R5UQ",
          },

          {
            title:
              "Sorting Data",

            videoId:
              "D9R8Q3S5L4A",
          },

          {
            title:
              "SQL Functions",

            videoId:
              "5hzZtqCNQKk",
          },
        ],
      },

      {
        id: "sql-analysis",

        title:
          "Module 2 — Data Analysis",

        lessons: [

          {
            title:
              "GROUP BY",

            videoId:
              "JYdK4V7L3XQ",
          },

          {
            title:
              "SQL Joins",

            videoId:
              "D2xUEYR-GIY",
          },

          {
            title:
              "Subqueries",

            videoId:
              "nJIEZh7G4Yg",
          },

          {
            title:
              "CTEs",

            videoId:
              "D2xUEYR-GIY",
          },

          {
            title:
              "Window Functions",

            videoId:
              "D2xUEYR-GIY",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     12. POWER BI
     ======================================================= */

  createCourse({
    id: "power-bi",

    career: "Data Analyst",

    title: "Power BI Data Analytics",

    description:
      "Learn data transformation, modeling, DAX and interactive dashboards using Power BI.",

    price: 699,

    level: "Intermediate",

    duration: "5 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72",

    whatYouLearn: [
      "Power BI",
      "Data Import",
      "Power Query",
      "Data Modeling",
      "Relationships",
      "DAX",
      "Dashboards",
      "KPIs",
    ],

    moduleData: [

      {
        id: "powerbi-foundations",

        title:
          "Module 1 — Power BI Foundations",

        lessons: [

          {
            title:
              "Introduction to Power BI",

            videoId:
              "AGrl-H87pRU",
          },

          {
            title:
              "Importing Data",

            videoId:
              "R9bFjZ8kY4Q",
          },

          {
            title:
              "Power Query",

            videoId:
              "4qZ9K2m7P8A",
          },

          {
            title:
              "Data Cleaning",

            videoId:
              "L5J6K7M8N9O",
          },

          {
            title:
              "Basic Visualizations",

            videoId:
              "Y2Z3A4B5C6D",
          },
        ],
      },

      {
        id: "powerbi-analysis",

        title:
          "Module 2 — Data Modeling & DAX",

        lessons: [

          {
            title:
              "Data Modeling",

            videoId:
              "F7G8H9I0J1K",
          },

          {
            title:
              "Relationships",

            videoId:
              "L2M3N4O5P6Q",
          },

          {
            title:
              "DAX Fundamentals",

            videoId:
              "R7S8T9U0V1W",
          },

          {
            title:
              "Calculated Columns",

            videoId:
              "X2Y3Z4A5B6C",
          },

          {
            title:
              "Measures",

            videoId:
              "D7E8F9G0H1I",
          },
        ],
      },

      {
        id: "powerbi-project",

        title:
          "Module 3 — Dashboard Project",

        lessons: [

          {
            title:
              "Dashboard Design",

            videoId:
              "J2K3L4M5N6O",
          },

          {
            title:
              "Interactive Reports",

            videoId:
              "P7Q8R9S0T1U",
          },

          {
            title:
              "Business KPIs",

            videoId:
              "V2W3X4Y5Z6A",
          },

          {
            title:
              "Publishing Reports",

            videoId:
              "B7C8D9E0F1G",
          },

          {
            title:
              "Final Power BI Project",

            videoId:
              "H2I3J4K5L6M",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     13. PYTHON
     ======================================================= */

  createCourse({
    id: "python-ai",

    career: "AI / ML Engineer",

    title: "Python for AI & Machine Learning",

    description:
      "Learn Python programming and the core tools required for AI and machine learning.",

    price: 699,

    level: "Beginner",

    duration: "6 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",

    whatYouLearn: [
      "Python",
      "Variables",
      "Functions",
      "OOP",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Data Analysis",
    ],

    moduleData: [

      {
        id: "python-foundations",

        title:
          "Module 1 — Python Foundations",

        lessons: [

          {
            title:
              "Python Introduction",

            videoId:
              "rfscVS0vtbw",
          },

          {
            title:
              "Variables and Data Types",

            videoId:
              "kqtD5dpn9C8",
          },

          {
            title:
              "Conditions and Loops",

            videoId:
              "94UHCEmprCY",
          },

          {
            title:
              "Functions",

            videoId:
              "9Os0o3wzS_I",
          },

          {
            title:
              "Modules",

            videoId:
              "CqvZ3vGoGs0",
          },
        ],
      },

      {
        id: "python-data",

        title:
          "Module 2 — Python for Data",

        lessons: [

          {
            title:
              "NumPy",

            videoId:
              "QUT1VHiLmmI",
          },

          {
            title:
              "Pandas",

            videoId:
              "vmEHCJofslg",
          },

          {
            title:
              "Data Cleaning",

            videoId:
              "i7v4BPlM4Vw",
          },

          {
            title:
              "Matplotlib",

            videoId:
              "3Xc3CA655Y4",
          },

          {
            title:
              "Data Analysis",

            videoId:
              "r-uOLxNrNk8",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     14. MACHINE LEARNING
     ======================================================= */

  createCourse({
    id: "machine-learning",

    career: "AI / ML Engineer",

    title: "Machine Learning Engineering",

    description:
      "Learn machine learning from preprocessing through supervised, unsupervised learning and model evaluation.",

    price: 999,

    level: "Advanced",

    duration: "10 Weeks",

    projectsCount: 4,

    thumbnail:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b",

    whatYouLearn: [
      "Machine Learning",
      "Preprocessing",
      "Feature Engineering",
      "Regression",
      "Classification",
      "Decision Trees",
      "Random Forest",
      "Clustering",
      "Evaluation",
    ],

    moduleData: [

      {
        id: "ml-foundations",

        title:
          "Module 1 — ML Foundations",

        lessons: [

          {
            title:
              "Introduction to Machine Learning",

            videoId:
              "NWONeJKn6kc",
          },

          {
            title:
              "Datasets",

            videoId:
              "T6s2WJ4Yq5A",
          },

          {
            title:
              "Data Preprocessing",

            videoId:
              "0Lt9w-BxKFQ",
          },

          {
            title:
              "Feature Engineering",

            videoId:
              "dR9A3c5H7KQ",
          },

          {
            title:
              "Train Test Split",

            videoId:
              "fwY9Qv96DJY",
          },
        ],
      },

      {
        id: "ml-supervised",

        title:
          "Module 2 — Supervised Learning",

        lessons: [

          {
            title:
              "Linear Regression",

            videoId:
              "7ArmBVF2dCs",
          },

          {
            title:
              "Logistic Regression",

            videoId:
              "yIYKR4sgzI8",
          },

          {
            title:
              "Decision Trees",

            videoId:
              "7VeUPuFGJHk",
          },

          {
            title:
              "Random Forest",

            videoId:
              "J4Wdy0Wc_xQ",
          },

          {
            title:
              "Classification",

            videoId:
              "AIRB4q4R2qE",
          },
        ],
      },

      {
        id: "ml-unsupervised",

        title:
          "Module 3 — Unsupervised Learning",

        lessons: [

          {
            title:
              "Clustering",

            videoId:
              "4b5d3muPQmA",
          },

          {
            title:
              "K-Means",

            videoId:
              "4b5d3muPQmA",
          },

          {
            title:
              "Dimensionality Reduction",

            videoId:
              "FgakZw6K1QQ",
          },

          {
            title:
              "Anomaly Detection",

            videoId:
              "0dQfW0Q5N2E",
          },

          {
            title:
              "Model Evaluation",

            videoId:
              "HdlDYng8g9s",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     15. FIGMA UI DESIGN
     ======================================================= */

  createCourse({
    id: "figma-ui-design",

    career: "UI / UX Designer",

    title: "UI Design with Figma",

    description:
      "Learn Figma, UI principles, design systems, components, responsive layouts and prototypes.",

    price: 599,

    level: "Beginner",

    duration: "5 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb",

    whatYouLearn: [
      "Figma",
      "Frames",
      "Layers",
      "Typography",
      "Color",
      "Components",
      "Auto Layout",
      "Prototypes",
      "Design Systems",
    ],

    moduleData: [

      {
        id: "figma-foundations",

        title:
          "Module 1 — Figma Foundations",

        lessons: [

          {
            title:
              "Introduction to Figma",

            videoId:
              "s4nbdYhpdLQ",
          },

          {
            title:
              "Frames and Layers",

            videoId:
              "FTFaQWZBqQ8",
          },

          {
            title:
              "Shapes and Objects",

            videoId:
              "3v9w79NhsfI",
          },

          {
            title:
              "Text and Typography",

            videoId:
              "tR5F5e5s9Q0",
          },

          {
            title:
              "Figma Workspace",

            videoId:
              "dXf5s5H5Y5Y",
          },
        ],
      },

      {
        id: "ui-principles",

        title:
          "Module 2 — UI Design Principles",

        lessons: [

          {
            title:
              "Color Theory",

            videoId:
              "AvgCkHrcj90",
          },

          {
            title:
              "Typography",

            videoId:
              "Q8F3QjJ5r8M",
          },

          {
            title:
              "Spacing",

            videoId:
              "hQX4J6M8N0P",
          },

          {
            title:
              "Visual Hierarchy",

            videoId:
              "z5X8Q2K4M6N",
          },

          {
            title:
              "Responsive UI Design",

            videoId:
              "5Q9F7T3M8L2",
          },
        ],
      },

      {
        id: "design-system",

        title:
          "Module 3 — Design Systems",

        lessons: [

          {
            title:
              "Components",

            videoId:
              "k74Ir2P4NqY",
          },

          {
            title:
              "Variants",

            videoId:
              "Q3D9Y4R6T8U",
          },

          {
            title:
              "Auto Layout",

            videoId:
              "T5U7V9W2X4Y",
          },

          {
            title:
              "Design Tokens",

            videoId:
              "A6B8C0D2E4F",
          },

          {
            title:
              "Design Systems",

            videoId:
              "G7H9I1J3K5L",
          },
        ],
      },
    ],

    reviews: [],
  }),


  /* =======================================================
     16. UX RESEARCH
     ======================================================= */

  createCourse({
    id: "ux-research",

    career: "UI / UX Designer",

    title: "UX Research & Product Design",

    description:
      "Learn user research, interviews, personas, journeys, information architecture, wireframes and usability testing.",

    price: 699,

    level: "Intermediate",

    duration: "6 Weeks",

    projectsCount: 3,

    thumbnail:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d",

    whatYouLearn: [
      "UX research",
      "User interviews",
      "Personas",
      "User journeys",
      "Information architecture",
      "Wireframes",
      "Usability testing",
      "Product design",
    ],

    moduleData: [

      {
        id: "ux-foundations",

        title:
          "Module 1 — UX Foundations",

        lessons: [

          {
            title:
              "Introduction to UX",

            videoId:
              "Ovj4hFxko7c",
          },

          {
            title:
              "Design Thinking",

            videoId:
              "aQh9R2L4M6N",
          },

          {
            title:
              "User Problems",

            videoId:
              "B7C9D1E3F5G",
          },

          {
            title:
              "User Research",

            videoId:
              "H8I0J2K4L6M",
          },

          {
            title:
              "User Interviews",

            videoId:
              "N7O9P1Q3R5S",
          },
        ],
      },

      {
        id: "ux-process",

        title:
          "Module 2 — UX Process",

        lessons: [

          {
            title:
              "Personas",

            videoId:
              "T6U8V0W2X4Y",
          },

          {
            title:
              "User Journeys",

            videoId:
              "Z5A7B9C1D3E",
          },

          {
            title:
              "Information Architecture",

            videoId:
              "F4G6H8I0J2K",
          },

          {
            title:
              "Wireframing",

            videoId:
              "L3M5N7O9P1Q",
          },

          {
            title:
              "Prototyping",

            videoId:
              "R2S4T6U8V0W",
          },
        ],
      },

      {
        id: "ux-project",

        title:
          "Module 3 — Product Design Project",

        lessons: [

          {
            title:
              "Usability Testing",

            videoId:
              "X1Y3Z5A7B9C",
          },

          {
            title:
              "Design Iteration",

            videoId:
              "D2E4F6G8H0I",
          },

          {
            title:
              "High Fidelity Design",

            videoId:
              "J1K3L5M7N9O",
          },

          {
            title:
              "UX Case Study",

            videoId:
              "P0Q2R4S6T8U",
          },

          {
            title:
              "Final UX Project",

            videoId:
              "V9W1X3Y5Z7A",
          },
        ],
      },
    ],

    reviews: [],
  }),
];


/* =========================================================
   COURSE HELPERS
   ========================================================= */

export function getCourseById(
  courseId: string
): Course | undefined {
  return courses.find(
    (course) => course.id === courseId
  );
}


export function getCoursesByCareer(
  career: string
): Course[] {
  return courses.filter(
    (course) => course.career === career
  );
}


export function getAllCareers(): string[] {
  return [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Java Developer",
    "Data Analyst",
    "AI / ML Engineer",
    "UI / UX Designer",
  ];
}