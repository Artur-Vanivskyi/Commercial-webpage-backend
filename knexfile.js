require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL,
  DATABASE_URL_DEVELOPMENT,
  DATABASE_URL_TEST,
  DATABASE_URL_PREVIEW,
} = process.env;


module.exports = {
  development: {
    client: "postgresql",
    pool: {
      min: 1,
      max: 5,
    },
    connection: "postgres://vfbqdxag:AfocCgr0GVV_KJfIwXiVXiOmMs7AGKKr@isilo.db.elephantsql.com/vfbqdxag",
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    },
  },

  test: {
    client: "postgresql",
    connection: "postgres://ebhroter:Wqa9wLit0nn8LcsEOWlFFcD75ZL64YMy@isilo.db.elephantsql.com/ebhroter",
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    },
  },

  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: "postgres://lyjvmhev:29Jj2eGE-ZaHObpCrI7EUtCKoAqung9t@isilo.db.elephantsql.com/lyjvmhev",
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    },
  },

  production: {
    client: "postgresql",
    connection: "postgres://uhiowzsb:RuFupDHyxN5Gb13qWGQ6LQmTT0vP54s2@isilo.db.elephantsql.com/uhiowzsb",
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    },
  },
};
