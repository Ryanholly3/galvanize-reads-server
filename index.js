const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const bodyParser = require('body-parser')
const authorPath = require('./routes/authors')
const bookPath = require('./routes/books')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
	res.send('Galvanize Reads API!')
})

app.use('/authors', authorPath)
app.use('/books', bookPath)


// error handling
app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res.status(404).send({ error: 'Not found!', status: 404, url: req.originalUrl });
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
    console.error('ERROR', err);
    const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined;
    res.status(500).send({ error: err.message, stack, url: req.originalUrl });
}


app.listen(port, () => console.log(`Running on port ${port}`))
