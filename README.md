# 3.9: Phonebook Backend Step 9

Since the libraries and tools I explain below are listed in the package.json file, all dependencies can be installed in a single step with the npm install command. ESLint is also included in the package.json file, but I did not use ESLint in this step.

Technologies and libraries used and npm commands to install these libraries and tools used:

## React

`npm install react` 
JavaScript library used to create the user interface of the phone book application.

## React-Dom

`npm install react-dom`
This library is used to render React components to DOM. In our project, it was used to render the App component to the root div.

## Axios

`npm install axios`
It is used to perform HTTP requests. It was used to perform API requests of the phonebook application.

## UUID

`npm install uuid`
It was used to assign a unique ID to each new person. Contacts were created with unique IDs rather than sequential IDs as 1, 2, 3...

## Express

`npm install express`
It was used to create the API server.

## Morgan

`npm install morgan`
This library is used to create HTTP request logs. It was used to create request logs of the API server.

## FS

It is a built-in module of Node.js and does not need to be installed separately.
This Node.js built-in module provides access to the file system. In the project, I used it to read and write people's data.

## CORS

`npm install cors`
 This Node.js middleware is used to configure Cross-Origin Resource Sharing (CORS) settings. In the project, it was used to enable the API server to respond to requests from different origins.

 ## Concurrently

 `npm install concurrently`
This library is used to run multiple commands simultaneously. In this project, it was used to run React app and API server simultaneously. 

The command to open the server page: `npm run server`
The command to open the user page: `npm run start`

## Nodemon

`npm install nodemon`
This tool tracks changes made to files and automatically restarts Node.js when changes occur.

## Vite

`npm install vite`
This tool is a configuration-free build tool for modern web projects.

## Json-server

`npm install json-server`
This tool is used to mock REST API. It was used as the backend of the phone book application.

