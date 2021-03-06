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

function getBooks(){
  return knex('book')
    .select(
      'book.id as book_id',
       'book.title',
       'book.genre',
       'book.description',
       'book.cover_url',
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

function postAuthors(body){
  return knex('author')
    .insert(body)
    .returning('*')
}

function postBooks(body){
  return knex('book')
    .insert(body)
    .returning('*')
}

function deleteAuthor(id){
  return knex('author')
    .where('id', id)
    .del()
    .returning('*')
}

function deleteBook(id){
  return knex('book')
    .where('id', id)
    .del()
    .returning('*')
}


module.exports = {getAuthors, getBooks, bookAuthorJoin, authorBookJoin, postAuthors, postBooks, deleteAuthor, deleteBook }
