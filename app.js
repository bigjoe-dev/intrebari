const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000
const questions = require('./intrebari.json')

app.use('/', express.static(path.join(__dirname, './public')))

app.get('/question', (req, res) => {
    const rndIndex = randomIntFromInterval(0, questions.length - 1);
    res.json(questions[rndIndex])
})

app.listen(port, () => console.log(`Listening on port ${port}`))

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}