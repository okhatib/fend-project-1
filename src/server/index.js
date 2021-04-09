var path = require('path')
const express = require('express')

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8085, function () {
    console.log('Example app listening on port 8085!')
})

app.get('/getKey', function (req, res) {
    res.send({key: process.env.API_KEY})
})
