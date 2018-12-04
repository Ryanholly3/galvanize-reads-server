
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book', function(table) {
        table.increments();
        table.string('title', 20);
        table.string('genre', 20);
        table.text('description');
        table.text('cover_url');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book');
};
