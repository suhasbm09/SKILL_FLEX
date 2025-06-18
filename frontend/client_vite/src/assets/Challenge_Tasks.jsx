// src/utils/challengeTasks.js
export const challengeDetails = {
    "1": {
      name: "Algorithmic Problem Solving in JavaScript",
      symbol: "JS-DSA",
      tasks: [
        "Write a function `longestZeroSum(arr)` that returns the length of the longest subarray whose sum is zero in O(n) time.",
        "Implement `isBalancedParentheses(str)` to check balanced brackets in O(n) time."
      ]
    },
    "2": {
      name: "Query & Model Data with MongoDB",
      symbol: "DB-MDB",
      tasks: [
        "Design a Mongoose schema for a `User` with embedded `Post` documents and write a query to find all posts by a given user.",
        "Write an aggregation pipeline that returns the top 5 most active users by post count."
      ]
    },
    "3": {
      name: "Full-Stack App Deployment on AWS ECS",
      symbol: "AWS-ECS",
      tasks: [
        "Dockerize a Node.js Express app and push the image to AWS ECR.",
        "Write an ECS Task Definition JSON and Service configuration to run that container on Fargate."
      ]
    },
    "4": {
      name: "Efficient Software Delivery with Docker",
      symbol: "DCKR",
      tasks: [
        "Create a Dockerfile for a Flask API that installs dependencies and runs on port 5000.",
        "Write a `docker-compose.yml` to run the Flask API alongside a PostgreSQL container."
      ]
    },
    "5": {
      name: "Smart Contract Development on Solana",
      symbol: "SOL-ANCHOR",
      tasks: [
        "Mint SPL Tokens Using Anchor - Write an Anchor instruction that uses the token::MintTo CPI to mint SPL tokens to a user's associated token account.",
        "Explain Program Derived Addresses in Anchor - Explain what a PDA is, how it's generated with seeds and bump, and why it's used instead of regular keypairs."
      ]
    },
  };
  
export const skills = [
  { 
    id: 1, 
    title: 'Algorithmic Problem Solving in JavaScript',
    icon: '<FaCode />',
    difficulty: 'Intermediate',
    duration: '30 min',
    description: 'Master data structures and algorithms with JavaScript',
    color: 'from-blue-500 to-cyan-500',
    tags: ['JavaScript', 'Algorithms', 'Data Structures']
  },
  { 
    id: 2, 
    title: 'Query & Model Data with MongoDB',
    icon: '<FaDatabase />',
    difficulty: 'Advanced',
    duration: '45 min',
    description: 'Design efficient database schemas and queries',
    color: 'from-green-500 to-emerald-500',
    tags: ['MongoDB', 'Database Design', 'NoSQL']
  },
  { 
    id: 3, 
    title: 'Full-Stack App Deployment on AWS ECS',
    icon: '<FaCloud />',
    difficulty: 'Expert',
    duration: '60 min',
    description: 'Deploy scalable applications using container orchestration',
    color: 'from-orange-500 to-red-500',
    tags: ['AWS', 'ECS', 'Docker', 'DevOps']
  },
  { 
    id: 4, 
    title: 'Software Delivery with Docker',
    icon: '<FaDocker />',
    difficulty: 'Intermediate',
    duration: '40 min',
    description: 'Containerize applications for consistent deployment',
    color: 'from-blue-500 to-indigo-500',
    tags: ['Docker', 'Containers', 'CI/CD']
  },
  { 
    id: 5, 
    title: 'Smart Contract Dev on Solana',
    icon: '<FaLink />',
    difficulty: 'Expert',
    duration: '90 min',
    description: 'Build and deploy Solana programs with Anchor',
    color: 'from-purple-500 to-pink-500',
    tags: ['Solana', 'Anchor', 'Rust', 'Web3']
  }
];
  