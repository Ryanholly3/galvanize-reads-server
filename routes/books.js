const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
  knex('book')
    .then(books =>{
      res.json({ books })
    })
})


module.exports = router
