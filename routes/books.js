const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

function getBooks(){
  return knex('book')
    .select(
      'book.id as book_id',
       'book.title',
       'book.description',
       'book.cover_url',
     )
}

function authorBookJoin(book){
  return knex('author_book')
    .select(
      'author.id as author_id',
      'author.first_name',
      'author.last_name'
    )
    .innerJoin('author', 'author.id', 'author_book.author_id')
    .whereIn('author_book.book_id', [book.book_id])
}


router.get('/', (req, res) => {

  function getAuthorsForBook(){
		return getBooks()
			.then(function(books){
				return Promise.all(books.map(async (book)=> {
						book.authors = await authorBookJoin(book)
						return book
					})
				)
			}).then(books => res.json({ books }))
	}
	getAuthorsForBook()
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

router.delete('/:id', (req, res, next) => {
		const id = req.params.id
    knex('book')
    	.where('id', id)
			.del()
    	.returning('*')
    	.then(book => {
        if(!book.length){
          next()
        } res.json({ book: book[0] });
    });
});


module.exports = router
