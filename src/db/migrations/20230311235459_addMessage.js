exports.up = function (knex) {
  return knex.schema.table("clients", (table) => {
    table.string("message").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("clients", (table) => {
    table.dropColumn("message");
  });
};
