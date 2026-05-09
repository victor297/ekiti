export const seedUsers = [
  {
    name: "Mrs. Adebayo",
    email: "teacher@jss2math.local",
    role: "teacher",
    password: "teacher123",
    gender: "female"
  },
  {
    name: "Chika",
    email: "student@jss2math.local",
    role: "student",
    password: "student123",
    gender: "female"
  }
];

export const seedTopics = [
  {
    name: "Week 1: STATISTICS 1 (Data Presentation)",
    level: "JSS 2",
    summary: "Collection and organization of data. The Data Detective module.",
    lessons: [
      {
        title: "Introduction: The 'Why?' (Hook)",
        type: "interactive",
        customId: "week1_hook",
        description: "Have you ever wondered how data is used in real life? Watch this short intro video to find out.",
        durationMins: 5
      },
      {
        title: "Step 1: Defining Data",
        type: "interactive",
        customId: "week1_step1_defining",
        description: "Learn what data is and practice categorizing discrete and continuous data.",
        durationMins: 5
      },
      {
        title: "Step 2: How to Collect Data",
        type: "interactive",
        customId: "week1_step2_collect",
        description: "Explore the different ways data can be collected: Observation, Interview, Questionnaires.",
        durationMins: 5
      },
      {
        title: "Step 3: Organizing Data (The Tally System)",
        type: "interactive",
        customId: "week1_step3_tally",
        description: "Raw data is messy. Use the tally system to organize it quickly and accurately.",
        durationMins: 10
      },
      {
        title: "Step 4: The Frequency Table",
        type: "interactive",
        customId: "week1_step4_freq_table",
        description: "Watch how tallies are converted into a frequency table to make data understandable.",
        durationMins: 5
      },
      {
        title: "Step 5: Evaluation (Objective Quiz)",
        type: "interactive",
        customId: "week1_step5_quiz",
        description: "Test your understanding of data collection, tally systems, and frequencies.",
        durationMins: 5
      },
      {
        title: "The Practice Challenge: The Canteen Order",
        type: "interactive",
        customId: "week1_challenge",
        description: "Help the Principal fulfill lunch orders for 30 athletes by analyzing the raw data.",
        durationMins: 10
      }
    ]
  },
  {
    name: "Week 2: STATISTICS 1 (Data Presentation)",
    level: "JSS 2",
    summary: "Presentation of Data (Pictograms, Bar Charts, and Pie Charts). The Data Artist module.",
    lessons: [
      {
        title: "Introduction: From Tables to Pictures",
        type: "interactive",
        customId: "week2_intro",
        description: "Compare a boring table with a vibrant bar chart.",
        durationMins: 5
      },
      {
        title: "Step 1: The Pictogram",
        type: "interactive",
        customId: "week2_step1_pictogram",
        description: "Learn how to use pictures or symbols to represent data with a key.",
        durationMins: 10
      },
      {
        title: "Step 2: The Bar Chart",
        type: "interactive",
        customId: "week2_step2_barchart",
        description: "The Comparison King. Build a bar chart dynamically.",
        durationMins: 10
      },
      {
        title: "Step 3: The Pie Chart",
        type: "interactive",
        customId: "week2_step3_piechart",
        description: "Learn how to calculate sectors in degrees for a Pie Chart.",
        durationMins: 5
      },
      {
        title: "Step 4: The Ekiti Harvest",
        type: "interactive",
        customId: "week2_step4_practice",
        description: "Interactive Pie Chart practice using town harvest data.",
        durationMins: 5
      },
      {
        title: "Evaluation: Objective Quiz",
        type: "interactive",
        customId: "week2_step5_quiz",
        description: "The Final Boss. Test your knowledge on data presentation.",
        durationMins: 5
      },
      {
        title: "Summary & Reward",
        type: "interactive",
        customId: "week2_summary",
        description: "Claim your Data Viz Pro badge.",
        durationMins: 5
      }
    ]
  },
  {
    name: "Week 3: STATISTICS 2 (Graphical Representation)",
    level: "JSS 2",
    summary: "Plotting pie charts; interpreting data and stating their usefulness in everyday life. The Master Storyteller module.",
    lessons: [
      {
        title: "Introduction: The Power of the 'Circle'",
        type: "interactive",
        customId: "week3_intro",
        description: "A Bar Chart shows how many, but a Pie Chart shows the share of the whole.",
        durationMins: 5
      },
      {
        title: "Step 1: How to Plot a Pie Chart",
        type: "interactive",
        customId: "week3_step1_plot",
        description: "The 4 steps to draw a pie chart: Sum, Calculate, Draw, Measure.",
        durationMins: 10
      },
      {
        title: "Step 2: Interpreting the Slices",
        type: "interactive",
        customId: "week3_step2_interpret",
        description: "Learn the rules of thumb (180 deg, 90 deg, Mode) just by looking at the size.",
        durationMins: 5
      },
      {
        title: "Step 3: Statistics in Everyday Life",
        type: "interactive",
        customId: "week3_step3_everyday",
        description: "Real-world applications in Government Budgets, Agriculture, Climate, and Business.",
        durationMins: 5
      },
      {
        title: "Interactive Practice: The Ekiti Election",
        type: "interactive",
        customId: "week3_step4_practice",
        description: "Mock election. Drag a line across the circle to cut a 180° slice and use the digital protractor.",
        durationMins: 10
      },
      {
        title: "Evaluation: Final Objective Quiz",
        type: "interactive",
        customId: "week3_step5_quiz",
        description: "Test your skills on plotting and interpreting pie charts.",
        durationMins: 5
      },
      {
        title: "Summary & The Graduation",
        type: "interactive",
        customId: "week3_summary",
        description: "Earn 'The Ekiti Analyst' badge.",
        durationMins: 5
      }
    ]
  },
  {
    name: "Week 4: PROBABILITY",
    level: "JSS 2",
    summary: "Introduction to Probability. The Game of Chance module.",
    lessons: [
      {
        title: "The Hook: Will it Rain in Ado-Ekiti Today?",
        type: "interactive",
        customId: "week4_hook",
        description: "Life is full of 'maybe'. Let's turn that maybe into a number.",
        durationMins: 5
      },
      {
        title: "Step 1: Defining Probability",
        type: "interactive",
        customId: "week4_step1_def",
        description: "Learn the probability scale from 0 (Impossible) to 1 (Certain).",
        durationMins: 5
      },
      {
        title: "Step 2: The Formula for Success",
        type: "interactive",
        customId: "week4_step2_formula",
        description: "Calculate probabilities using the required vs total outcomes formula.",
        durationMins: 10
      },
      {
        title: "Step 3: Importance in Daily Life",
        type: "interactive",
        customId: "week4_step3_daily",
        description: "Why does probability matter in Agriculture, Games, Health, and Business?",
        durationMins: 5
      },
      {
        title: "Interactive Activity: The Virtual Coin Toss",
        type: "interactive",
        customId: "week4_step4_activity",
        description: "Flip a digital coin 10 times to test the Even Chance theory.",
        durationMins: 10
      },
      {
        title: "Evaluation: Probability Quiz",
        type: "interactive",
        customId: "week4_step5_quiz",
        description: "Test your understanding of Probability basics.",
        durationMins: 5
      },
      {
        title: "Summary & Next Steps",
        type: "interactive",
        customId: "week4_summary",
        description: "You've mastered the basics! Review what you learned.",
        durationMins: 5
      }
    ]
  },
  {
    name: "Week 5: PROBABILITY",
    level: "JSS 2",
    summary: "Generating events using ludo and tossing of coins. The Probability Lab module.",
    lessons: [
      {
        title: "The Hook: The Ludo Battle",
        type: "interactive",
        customId: "week5_hook",
        description: "Why does getting a '6' in Ludo take forever? Is it bad luck or math?",
        durationMins: 5
      },
      {
        title: "Step 1: Understanding Events and Outcomes",
        type: "interactive",
        customId: "week5_step1_vocab",
        description: "Learn the vocabulary of Probability such as Sample Space.",
        durationMins: 5
      },
      {
        title: "Step 2: Tossing the 1 Naira Coin",
        type: "interactive",
        customId: "week5_step2_coin",
        description: "Virtual simulator testing the 2-Way Chance theory.",
        durationMins: 10
      },
      {
        title: "Step 3: The Ludo Die",
        type: "interactive",
        customId: "week5_step3_die",
        description: "Interactive dice roller explaining 6-Way Chance probability.",
        durationMins: 10
      },
      {
        title: "Step 4: Real-Life Chances in Ekiti",
        type: "interactive",
        customId: "week5_step4_real",
        description: "Swipe through local events and categorize them as Certain, Likely, or Impossible.",
        durationMins: 5
      },
      {
        title: "Evaluation: Game Master Quiz",
        type: "interactive",
        customId: "week5_step5_quiz",
        description: "Test your skills on coins, dice, and sample spaces.",
        durationMins: 5
      },
      {
        title: "Interaction: The 30-Second Challenge",
        type: "interactive",
        customId: "week5_interaction",
        description: "Roll the digital die rapidly for 30 seconds and calculate your experimental probability.",
        durationMins: 5
      }
    ]
  },
  {
    name: "Week 6: PROBABILITY",
    level: "JSS 2",
    summary: "Solving simple probability problems and experimental probability. The Probability Lab module.",
    lessons: [
      {
        title: "Introduction: The Luck vs. Logic Challenge",
        type: "interactive",
        customId: "week6_hook",
        description: "Which bag of sweets is logically the better choice? Find out why.",
        durationMins: 5
      },
      {
        title: "Step 1: The Master Formula (Revision)",
        type: "interactive",
        customId: "week6_step1_formula",
        description: "Revise the core ratio equation for successful probability.",
        durationMins: 5
      },
      {
        title: "Step 2: Solving The Marble Bag Problem",
        type: "interactive",
        customId: "week6_step2_marble",
        description: "Drag and drop logic to calculate picking a Red marble.",
        durationMins: 10
      },
      {
        title: "Step 3: Experimental vs. Theoretical Probability",
        type: "interactive",
        customId: "week6_step3_experimental",
        description: "Understanding The Law of Large Numbers.",
        durationMins: 5
      },
      {
        title: "Step 4: The 'Spin the Wheel' Challenge",
        type: "interactive",
        customId: "week6_step4_spinner",
        description: "Calculate spinner probabilities and use the Simplify Me tool.",
        durationMins: 10
      },
      {
        title: "Evaluation: The Data Scientist Quiz",
        type: "interactive",
        customId: "week6_step5_quiz",
        description: "Final evaluation covering formulas and experimental scenarios.",
        durationMins: 5
      },
      {
        title: "Summary & Rewards",
        type: "interactive",
        customId: "week6_summary",
        description: "Earn the Probability Architect badge.",
        durationMins: 5
      }
    ]
  }
];
