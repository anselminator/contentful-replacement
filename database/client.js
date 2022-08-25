const { Pool } = require("pg");

const { ELEPHANT_CONN } = process.env;

const pool = new Pool({
    connectionString: ELEPHANT_CONN,
});
console.log("connection to elephantSQL available on: ", ELEPHANT_CONN);

module.exports = {
    query: (text, params) => pool.query(text, params),
};