const http = require('http')
const url = require('url')

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

const app = http.createServer((request, response) => {
    const reqUrl = url.parse(request.url, true)
    const id = reqUrl.pathname.split('/').pop()

    if (reqUrl.pathname.startsWith('/api/persons') && request.method === 'GET') {
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
    } else if (reqUrl.pathname === '/info' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(`Phonebook has info for ${persons.length} people<br/>${new Date()}`);
    } else {
        response.writeHead(200, { 'Content-Type': 'text/plain' })
        response.end('Hello World')
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)