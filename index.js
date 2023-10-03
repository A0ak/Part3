const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

morgan.token('post', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

let persons = JSON.parse(fs.readFileSync('db.json')).persons;


app.get('/api/persons', (request, response) => {
    let persons = JSON.parse(fs.readFileSync('db.json')).persons;
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    let persons = JSON.parse(fs.readFileSync('db.json')).persons;
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
});

app.delete('/api/persons/:id', (request, response) => {
    let persons = JSON.parse(fs.readFileSync('db.json')).persons;
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    fs.writeFileSync('db.json', JSON.stringify({ persons: persons }));

    response.status(204).end()
});

app.post('/api/persons', (request, response) => {
    let persons = JSON.parse(fs.readFileSync('db.json')).persons;
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

    const id = Math.floor(Math.random() * 10000);

    const person = {
        id: id,
        name: body.name,
        number: body.number
    };

    persons = persons.concat(person);

    fs.writeFileSync('db.json', JSON.stringify({ persons: persons }));

    response.json(person);
});

app.get('/info', (request, response) => {
    let persons = JSON.parse(fs.readFileSync('db.json')).persons;
    const date = new Date();
    response.send(`Phonebook has info for ${persons.length} people<br/>${date}`);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});