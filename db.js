const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgress://localhost/acme_schools'
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id UUID PRIMARY KEY default uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    CHECK (char_length(name)> 0)
    );
    INSERT INTO users(name) values('lucy');
    INSERT INTO users(name) values('moe');
  `;
  await client.query(SQL);
};

const readUsers = async () => {
  return (await client.query('SELECT * from users')).rows;
};

module.exports = {
  sync,
  readUsers,
};
