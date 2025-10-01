const express = require('express')
const app = express()

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    number = persons.length
    time = new Date()
    response.send(`
        <p>Phonebook has info for ${number} people</p>
        <p>${time}</p>
        `)
})

/*app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        name: body.name,
        number: body.number,
        id: body.id
    }
})*/

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})