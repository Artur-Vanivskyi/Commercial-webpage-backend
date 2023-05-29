const knex = require("../db/connection");

function list() {
  return knex("clients").select("*")
}

function create(client) {
  return knex("clients")
    .insert(client, "*")
    .then((createdClient) => createdClient[0]);
}

module.exports = {
  list,
  create,
};
