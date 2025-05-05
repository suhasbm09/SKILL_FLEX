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
  