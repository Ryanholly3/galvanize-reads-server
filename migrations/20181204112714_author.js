
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', function(table) {
        table.increments();
        table.string('first_name', 20);
        table.string('last_name', 20);
        table.text('biography');
        table.text('portrait_url');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('author');
};
