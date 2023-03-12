/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("clients", (table) => {
    table.increments("clients_id").primary();
    table.string("full_name").notNullable();
    table.string("mobile_number").notNullable();
    table.string("email").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("clients");
};
