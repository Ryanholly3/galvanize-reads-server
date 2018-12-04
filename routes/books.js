const express = require('express')
const router = express.Router()
const knex = require('../db/connection')


router.get('/', (req, res) => {
  res.send('books route, under construction')
}


module.exports = router
