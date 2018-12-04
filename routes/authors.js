const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
  knex('author')
    .then(authors =>{
      res.json({ authors })
    })
})

module.exports = router
