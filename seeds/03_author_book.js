
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "author_book"; ALTER SEQUENCE author_book_id_seq RESTART WITH 9;')
    .then(function () {
      return knex('author_book').insert([
      {
        id: 1,
        author_id: 1,
        book_id: 1
      },{
        id: 2,
        author_id: 2,
        book_id: 1
      },{
        id: 3,
        author_id: 3,
        book_id: 1
      },{
        id: 4,
        author_id: 4,
        book_id: 2
      },{
        id: 5,
        author_id: 5,
        book_id: 3
      },{
        id: 6,
        author_id: 6,
        book_id: 4
      },{
        id: 7,
        author_id: 6,
        book_id: 5
      },{
        id: 8,
        author_id: 6,
        book_id: 6
      }
    ]);
  });
};
