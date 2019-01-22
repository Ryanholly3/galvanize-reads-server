const express = require('express')
const router = express.Router()
const knex = require('../db/connection')
const query = require('../queries/query')

router.get('/', (req, res) => {

  function getBooksForAuthors(){
		return query.getAuthors()
			.then(function(authors){
				return Promise.all(authors.map(async (author)=> {
						author.books = await query.bookAuthorJoin(author)
						return author
					})
				)
			}).then(authors => res.json({ authors }))
	}
	getBooksForAuthors()
})

router.post('/', (req, res, next) => {
    const body = req.body;
    return query.postAuthors(body)
      .then(author => {
        res.json({ author: author[0] });
    });
});

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    return query.deleteAuthor(id)
    	.then(author => {
        if(!author.length){
          next()
        } res.json({ author: author[0] });
    });
});

module.exports = router
