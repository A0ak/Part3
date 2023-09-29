# 3.2: Phonebook backend step 2

Changes made in the second step:

## index.js

1. `else if (request.url === '/info' && request.method === 'GET') {...}`: Adds the ability for the server to respond to requests to the '/info' URL. This response includes the number of people in the contacts list and the current date and time.


2. `const PORT = process.env.PORT || 3001`: I set the PORT variable to read from environment variables.

## package.json

I modified the package.json file as follows:

"scripts": {
  "start": "cross-env PORT=3001 node index.js",
  "dev": "cross-env PORT=3002 nodemon index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}

I made this change for:
 
We want to start the application simultaneously with both npm start and npm run dev commands. Running the same programs in two instances of the same application may cause a conflict.
We can use different ports to run the application simultaneously in both development (with nodemon) and production (with node) modes. For this, I changed the scripts in the package.json file to achieve this goal.  
This solution works on a Unix-based system or a Windows system with Windows Subsystem for Linux (WSL).
Since I was using a standard Windows command prompt, I used the `cross-env` package to set environment variables. I installed the relevant package using the `npm install --save-dev cross-env` command.

In this way, when you run the npm start command, the application will run on port 3001, and when you run the npm run dev command, the application will run on port 3002.


