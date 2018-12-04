
exports.up = function(knex, Promise) {
  return knex.schema.createTable('book', function(table) {
        table.increments();
        table.string('title', 50);
        table.string('genre', 50);
        table.text('description');
        table.text('cover_url');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book');
};
