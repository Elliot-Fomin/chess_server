const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Variables to store game state
let latestMove = null
let latestOffer = null
let players = [] // Expecting an array of player names/objects

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Endpoint to update the latest move
app.post('/move', (req, res) => {
    console.log('Received move data:', req.body)
    latestMove = req.body
    res.status(200).send({ message: 'Move data received' })
})

app.delete('/move', (req, res) => {
    latestMove = null
    res.status(200).send({ message: 'Move data deleted' })
})

app.delete('/offer', (req, res) => {
    latestOffer = null
    res.status(200).send({ message: 'Offer data deleted' })
})

app.delete('/players', (req, res) => {
    players = []
    res.status(200).send({ message: 'Players data deleted' })
})




// Endpoint to update the latest offer
app.post('/offer', (req, res) => {
    console.log('Received offer data:', req.body)
    const offer = req.body
    if (offer !== null) {
        latestOffer = offer
        console.log(offer)
        res.status(200).send({ message: 'Offer data received' })
    } else {
        res.status(400).send({ message: 'Invalid offer data format' })
    }
})

// Endpoint to update the players list
app.post('/players', (req, res) => {
    console.log('Received players data:', req.body)
    if (Array.isArray(req.body)) { // Basic validation: check if it's an array
        players = req.body
        res.status(200).send({ message: 'Players data received' })
    } else {
        res.status(400).send({ message: 'Invalid players data format (expected array)' })
    }
})

// --- GET Endpoints --- 

// Consolidated endpoint for the browser to fetch the entire game state
app.get('/game-state', (req, res) => {
    res.json({
        players: players,
        latestMove: latestMove,
        latestOffer: latestOffer
    })
})

// Optional: Individual GET endpoints (can be removed if /game-state is sufficient)
app.get('/latest-move', (req, res) => {
    res.json(latestMove)
})

app.get('/latest-offer', (req, res) => { // Added missing GET for offer
    res.json(latestOffer)
})

app.get('/players', (req, res) => {
    res.json(players)
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} for connections from any interface`);
    // You'll need to find your actual IP to connect (see below)
});