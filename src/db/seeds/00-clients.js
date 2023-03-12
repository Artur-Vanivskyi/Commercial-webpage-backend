/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const clients = require("./00-clients.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE clients RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("clients").insert(clients);
    });
};
