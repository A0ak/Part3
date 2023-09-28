# 3.1: Phonebook backend step 1

A Node.js server that responds to HTTP requests.

## index.js

1. `const http = require('http')`: Imports Node.js' built-in http module, which provides functionality for creating HTTP servers and making HTTP requests.
2. `let persons = [...]`:It is an array of objects representing a person, each containing an id, name and number.
3. `const app = http.createServer((request, response) => {...})`:  This line creates an HTTP server. The function passed to createServer is a request listener that is called every time the server receives a request.
4. Inside the request listener:
   - `if (request.url === '/api/persons' && request.method === 'GET') {...}` :If the URL of the request is '/api/persons' and the HTTP method is 'GET', the server returns a list of people in response. Each contact is formatted as a string and appended to responseText, then sent as a response.
   - `else {...}` : If the URL of the request is not '/api/persons' or the HTTP method is not 'GET', the server responds 'Hello World'.
5. `const PORT = 3001` : Sets the port number the server will listen on.
6. `app.listen(PORT)` : Starts the server and allows listening for requests on the specified port
7. `console.log(Server running on port ${PORT})` : It logs a message to the console stating that the server is running and on which port it is.

In summary, this server responds to 'GET' requests at '/api/persons' with a list of contacts and responds to all other requests with 'Hello World'.

## package.json

The `package.json` file is the configuration file of the Node.js project. It determines the configuration and dependencies of the project. Any changes made to this file will affect how the project runs and what packages it needs. The information it contains and the changes made are as follows:

1. `"name": "part3"`: The name of the project is 'part3'.
2. `"version": "1.0.0"`: The version of the project is determined as '1.0.0'.
3. `"main": "index.js"`: The main entry point of the project is determined as the 'index.js' file.
4. `"scripts"`: In this section, some commands related to the project are defined.
   - `"start": "node index.js"`: The 'start' command is used to run the 'index.js' file.
   - `"dev": "nodemon index.js"`: The 'dev' command is used to run the 'index.js' file with nodemon. Nodemon detects the changes made to the file and automatically restarts the server.
   - `"test": "echo \"Error: no test specified\" && exit 1"`: The 'test' command gives an error message because no test has been specified yet.
5. `"dependencies": {"express": "^4.18.2"}`: This project has a dependency named 'express'. Express is a fast, open-source, minimalist web application framework for Node.js.
6. `"devDependencies": {"nodemon": "^3.0.1"}`: This project has a development dependency named 'nodemon'. When developing Node.js applications, Nodemon tracks file changes and automatically restarts the application.


## .gitignore

Right now I'm only adding files that I don't want to be tracked by 'git'. I don't know any other feature.

## package-lock.json

This file provides a complete and precise snapshot of our application's dependencies, and this snapshot ensures that our project always runs the same way.
