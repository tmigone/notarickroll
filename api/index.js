const express = require('express')
const bodyParser = require('body-parser')
const tall = require('tall').default

let app = express()
app.use(bodyParser.json())

let knownOffenders = [
    'dQw4w9WgXcQ',
    'oHg5SJYRHA0'
]

app.post('*', async (req, res) => {
    try {
        let unshortenedUrl = await tall(req.body.url)
        res.json({
            short: req.body.url,
            url: unshortenedUrl,
            rolled: knownOffenders.some(offender => unshortenedUrl.includes(offender))
        })
    } catch (error) {
        res.json({
            rolled: false,
            error: error.message
        })
    }
})

app.listen()