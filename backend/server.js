const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const db = require('../src/mongo.js');


var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(cors());
app.use(express.json());
morgan.token('post', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post', { stream: accessLogStream }))


app.get('/api/persons', (request, response) => {
    db.getAllPersons().then(persons => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    db.getPerson(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).json({ error: 'Person not found' })
        }
    });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    db.deletePerson(id).then(() => {
        response.status(204).end()
    }).catch(error => {
        response.status(404).json({ error: 'Person not found' })
    });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        });
    }

    db.createPerson(body).then(person => {
        response.json(person);
    }).catch(error => {
        response.status(400).json({
            error: 'name must be unique'
        });
    });
});

app.get('/info', (request, response) => {
    db.getAllPersons().then(persons => {
        const date = new Date();
        response.send(`Phonebook has info for ${persons.length} people<br/>${date}`);
    });
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

