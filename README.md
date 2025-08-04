# Open Chat App

An open forum chat application built with **Next.js**, **Stream**, and **GitHub authentication**.

This app allows users to participate in real-time conversations after signing in securely.

## Features

- Real-time group chat with Stream API  
- GitHub-based authentication  
- MySQL database integration  
- Easy setup and development experience  

## Getting Started

To run the project locally, follow these steps:

First Clone the Repositery by running  

`git clone https://github.com/your-username/Chat-App.git`  

after that run  

`npm install`  

and then you have to setup you environment variable as  

GITHUB_ID=  
GITHUB_SECRET=  
NEXT_PUBLIC_URL=http://localhost:3000  
NEXTAUTH_SECRET=  
NEXT_PUBLIC_STREAM_API_KEY=  
STREAM_API_SECRET=  
DB_NAME=  
DB_HOST=  
DB_USER=  
DB_PASS= 
  
Fill all these creditential by creating an account on getstream.io, create a new app, and copy the API key and secret.

GitHub Auth: Go to GitHub > Settings > Developer settings > OAuth Apps and create a new app to get your client ID and secret.

MySQL Database: For development, you can use MySQL Workbench for easy setup.  

and after completing SetUp you can run  
  
`npm run dev`  
  
This will start server on port 3000.  
  
## Your Contribution  
We welcome contributions that improve this app.  

Whether it's bug fixes, feature enhancements, or code cleanup, feel free to open a pull request!