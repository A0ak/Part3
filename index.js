const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'dist')));

morgan.token('post', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

let dbPath = path.resolve(__dirname, '..', 'db.json');
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
        fs.writeFileSync(dbPath, JSON.stringify({ persons: persons }));
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

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
