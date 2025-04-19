const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json())

let rooms = []

const createRoomRouter = require('./routes/room') 

app.get('/:id/create', (req, res) => {
    if (!rooms.some(room => room.id === req.params.id)) {
        const router = createRoomRouter()
        rooms.push({
            id: req.params.id,
            router: router
        })
        res.json({message: "Room created"})
    }
    else{
        res.json({message: "Room already exists"})
    }
    
})

app.get('/:id/delete', (req, res) => {
    if (rooms.some(room => room.id === req.params.id)) {
        rooms = rooms.filter(room => room.id !== req.params.id)
        res.json({message: "Room deleted"})
    }
    else{
        res.json({message: "Room not found"})
    }
})

app.get('/', (req, res) => {
    const roomIds = rooms.map(room => room.id)
    res.send(`Available rooms: ${roomIds.join(', ')}`)
})


app.use('/:id', (req, res, next) => {
    const id = req.params.id
    const room = rooms.find(room => room.id === id)

    if (room) {
        // Room found, pass the request to its specific router
        const router = room.router
        router(req, res, next)
    }
    else {
        // Room not found for this ID, let Express handle it (likely a 404)
        next()
    }
})


app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} for connections from any interface`)
    // You'll need to find your actual IP to connect (see below)
})