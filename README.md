# 3.4: Phonebook backend step 4

The changes that have been made:

## index.js

1. I moved the request.method === 'GET' control inside the reqUrl.pathname.startsWith('/api/persons') control. This allows the server to respond differently to different types of requests to the /api/persons URL.

2. I added a new control: request.method === 'DELETE'. This check allows the server to respond to DELETE requests to the /api/persons URL.
3. In response to DELETE requests, the server deletes a specific contact. This is accomplished by finding and extracting a specific person in the persons array. If the person is not found, the server returns a 'Person not found' message. If the contact is successfully deleted, the server returns a 'Deleted person with id {id}' message, where {id} is the ID of the deleted person.

The code block corresponding to these changes is:
  ```
     if (reqUrl.pathname.startsWith('/api/persons')) {
        if (request.method === 'GET') {
            if (id === 'persons') {
                response.writeHead(200, { 'Content-Type': 'text/plain' })
                let responseText = '';
                for (let person of persons) {
                    responseText += `- id: ${person.id}\n  name: ${person.name}\n  number: ${person.number}\n`;
                }
                response.end(responseText);
            } else {
                const person = persons.find(p => p.id === Number(id))
                if (person) {
                    response.writeHead(200, { 'Content-Type': 'text/plain' })
                    response.end(`- id: ${person.id}\n  name: ${person.name}\n  number: ${person.number}\n`)
                } else {
                    response.writeHead(404, { 'Content-Type': 'text/plain' })
                    response.end('Person not found')
                }
            }
        } else if (request.method === 'DELETE') {
            const index = persons.findIndex(p => p.id === Number(id))
            if (index !== -1) {
                persons.splice(index, 1)
                response.writeHead(200, { 'Content-Type': 'text/plain' })
                response.end(`Deleted person with id ${id}`)
            } else {
                response.writeHead(404, { 'Content-Type': 'text/plain' })
                response.end('Person not found')
            }
        }
    }
    ```


## Testing that the added functionality works with the Postman or Visual Studio Code REST client:

- A new request is created in the Postman or Visual Studio Code REST client. This is usually done by clicking a "New Request" or similar button.
- The type of the request is set to DELETE.
- The URL of the request is set to http://localhost:3001/api/persons/{id}, where {id} is the ID of the person you want to delete. For example, to delete a person with ID 1, the URL would be http://localhost:3001/api/persons/1.
- The request is sent by clicking "Send" or a similar button.
- If the person was successfully deleted, the response will be Deleted person with id {id}. If the person is not found, the response will be Person not found.
