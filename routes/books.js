const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
  knex('book')
    .then(books =>{
      res.json({ books })
    })
})

router.post('/', (req, res, next) => {
    const body = req.body;
    knex('book')
      .insert(body)
      .returning('*')
      .then(book => {
        res.json({ book: book[0] });
    });
});


module.exports = router