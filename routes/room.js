const express = require('express')
const path = require('path')

module.exports = () => {
    const router = express.Router()

    let latestMove = null
    let latestOffer = null
    let players = []

    router.use(express.json())

    // Serve the HTML file
    router.get('/', (req, res) => {
        // Assuming index.html is in the parent 'myapp' directory, not 'routes'
        res.sendFile(path.join(__dirname, '..', 'index.html')) // Go up one directory
    })

    // Endpoint to update the latest move
    router.post('/move', (req, res) => {
        console.log('Received move data:', req.body)
        latestMove = req.body // Directly update room state
        res.status(200).send({ message: 'Move data received' })
    })

    router.delete('/move', (req, res) => {
        latestMove = null // Directly update room state
        res.status(200).send({ message: 'Move data deleted' })
    })

    router.delete('/offer', (req, res) => {
        latestOffer = null // Directly update room state
        res.status(200).send({ message: 'Offer data deleted' })
    })

    router.delete('/players', (req, res) => {
        players = []
        res.status(200).send({ message: 'Players data deleted' })
    })




    // Endpoint to update the latest offer
    router.post('/offer', (req, res) => {
        console.log('Received offer data:', req.body)
        const offer = req.body
        if (offer !== null) {
            latestOffer = offer // Directly update room state
            console.log(offer)
            res.status(200).send({ message: 'Offer data received' })
        } else {
            res.status(400).send({ message: 'Invalid offer data format' })
        }
    })

    // Endpoint to update the players list
    router.post('/players', (req, res) => {
        console.log('Received players data:', req.body)
        if (Array.isArray(req.body)) { // Basic validation: check if it's an array

            players = req.body // Directly update room state
            res.status(200).send({ message: 'Players data received' })
        } else {
            res.status(400).send({ message: 'Invalid players data format (expected array)' })
        }
    })


    router.get('/game-state', (req, res) => {
        const roomState = {
            players: players,
            latestMove: latestMove,
            latestOffer: latestOffer
        }
        res.json(roomState)
    })


    router.get('/latest-move', (req, res) => {
        res.json(latestMove) // Send room-specific state
    })

    router.get('/latest-offer', (req, res) => { 
        res.json(latestOffer) // Send room-specific state
    })

    router.get('/players', (req, res) => {
        res.json(players) // Send room-specific state
    })

    return router
}