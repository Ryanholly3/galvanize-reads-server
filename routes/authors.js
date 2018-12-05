const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

router.get('/', (req, res) => {
  knex('author')
    .then(authors =>{
      res.json({ authors })
    })
})

router.post('/', (req, res, next) => {
    const body = req.body;
    knex('author')
      .insert(body)
      .returning('*')
      .then(author => {
        res.json({ author: author[0] });
    });
});

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    knex('author')
    	.where('id', id)
			.del()
    	.returning('*')
    	.then(author => {
        if(!author.length){
          next()
        } res.json({ author: author[0] });
    });
});

module.exports = router
