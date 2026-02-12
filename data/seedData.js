export const seedUsers = [
  {
    name: "Mrs. Adebayo",
    email: "teacher@jss2math.local",
    role: "teacher",
    password: "teacher123"
  },
  {
    name: "Chika",
    email: "student@jss2math.local",
    role: "student",
    password: "student123"
  }
];

export const seedTopics = [
  {
    name: "Statistics",
    level: "JSS 2",
    summary: "Collect, organize, and interpret data using tables, charts, and averages.",
    lessons: [
      {
        title: "Introduction to Data",
        type: "text",
        description: "Understand data types and how to collect them.",
        contentUrl: "https://example.com/lessons/data-intro",
        durationMins: 10
      },
      {
        title: "Bar Charts",
        type: "animation",
        description: "Animated walkthrough of building bar charts.",
        contentUrl: "https://example.com/lessons/bar-charts",
        durationMins: 8
      },
      {
        title: "Mean, Median, Mode",
        type: "video",
        description: "Video lesson on measures of central tendency.",
        contentUrl: "https://example.com/lessons/mmm",
        durationMins: 12
      },
      {
        title: "Statistics Quiz 1",
        type: "quiz",
        description: "Short quiz to check understanding.",
        contentUrl: "https://example.com/quizzes/statistics-1",
        durationMins: 5
      }
    ]
  },
  {
    name: "Algebra",
    level: "JSS 2",
    summary: "Simplify expressions and solve simple equations.",
    lessons: [
      {
        title: "Algebraic Expressions",
        type: "text",
        description: "Identify terms, coefficients, and variables.",
        contentUrl: "https://example.com/lessons/algebraic-expressions",
        durationMins: 9
      },
      {
        title: "Like Terms",
        type: "animation",
        description: "Combine like terms with guided animation.",
        contentUrl: "https://example.com/lessons/like-terms",
        durationMins: 7
      },
      {
        title: "Simple Equations",
        type: "video",
        description: "Solve equations in one variable.",
        contentUrl: "https://example.com/lessons/simple-equations",
        durationMins: 11
      },
      {
        title: "Algebra Quiz 1",
        type: "quiz",
        description: "Practice simplifying expressions.",
        contentUrl: "https://example.com/quizzes/algebra-1",
        durationMins: 6
      }
    ]
  },
  {
    name: "Geometry",
    level: "JSS 2",
    summary: "Understand shapes, angles, and properties of polygons.",
    lessons: [
      {
        title: "Angles and Lines",
        type: "video",
        description: "Basic angle types and line relationships.",
        contentUrl: "https://example.com/lessons/angles",
        durationMins: 10
      },
      {
        title: "Triangle Properties",
        type: "text",
        description: "Sum of angles and triangle types.",
        contentUrl: "https://example.com/lessons/triangles",
        durationMins: 8
      }
    ]
  },
  {
    name: "Number Sense",
    level: "JSS 2",
    summary: "Factors, multiples, and rational numbers.",
    lessons: [
      {
        title: "Factors & Multiples",
        type: "animation",
        description: "Interactive factor tree animation.",
        contentUrl: "https://example.com/lessons/factors",
        durationMins: 7
      },
      {
        title: "Fractions Review",
        type: "video",
        description: "Equivalent fractions and simplification.",
        contentUrl: "https://example.com/lessons/fractions",
        durationMins: 9
      }
    ]
  }
];
