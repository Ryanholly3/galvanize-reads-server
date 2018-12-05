const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

function getAuthors(){
  return knex('author')
    .select(
      'author.id as author_id',
       'author.first_name',
       'author.last_name',
       'author.biography',
       'author.portrait_url',
     )
}

function bookAuthorJoin(author){
  return knex('author_book')
    .select(
      'book.id as book_id',
      'book.title',
    )
    .innerJoin('book', 'book.id', 'author_book.book_id')
    .whereIn('author_book.author_id', [author.author_id])
}


router.get('/', (req, res) => {

  function getBooksForAuthors(){
		return getAuthors()
			.then(function(authors){
				return Promise.all(authors.map(async (author)=> {
						author.books = await bookAuthorJoin(author)
						return author
					})
				)
			}).then(authors => res.json({ authors }))
	}
	getBooksForAuthors()
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
