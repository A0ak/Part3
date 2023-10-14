const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'self' https://www.gstatic.com;");
    return next();
  });

const cors = require('cors')

app.use(cors())

app.use(express.json()) 

morgan.token('post', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

const path = require('path');
let dbPath = path.join(__dirname, '../db.json');
let persons = JSON.parse(fs.readFileSync(dbPath)).persons;

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).json({ error: 'Person not found' })
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const initialLength = persons.length
    persons = persons.filter(person => person.id !== id)

    if (persons.length < initialLength) {
        fs.writeFileSync('../db.json', JSON.stringify({ persons: persons }));
        response.status(204).end()
    } else {
        response.status(404).json({ error: 'Person not found' })
    }
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        id: uuidv4(),
        name: body.name,
        number: body.number
    };

    persons = persons.concat(person);

    fs.writeFileSync(dbPath, JSON.stringify({ persons: persons }));

    response.json(person);
});

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`Phonebook has info for ${persons.length} people<br/>${date}`);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
