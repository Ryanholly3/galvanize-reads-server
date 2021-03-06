const express = require('express')
const router = express.Router()
const knex = require('../db/connection')
const query = require('../queries/query')

router.get('/', (req, res) => {

  function getAuthorsForBook(){
		return query.getBooks()
			.then(function(books){
				return Promise.all(books.map(async (book)=> {
						book.authors = await query.authorBookJoin(book)
						return book
					})
				)
			}).then(books => res.json({ books }))
	}
	getAuthorsForBook()
})


router.post('/', (req, res, next) => {
    const body = req.body;
    return query.postBooks(body)
      .then(book => {
        res.json({ book: book[0] });
      });
});

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    return query.deleteBook(id)
    	.then(book => {
        if(!book.length){
          next()
        } res.json({ book: book[0] });
    });
});


module.exports = router
