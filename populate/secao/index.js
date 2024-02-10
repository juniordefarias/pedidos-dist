const dotenv = require('dotenv');

dotenv.config();

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

client.connect();

const fs = require('fs');

// section
const data = fs.readFileSync('populate/secao/secao.txt', 'utf-8');

const rows = data.split('\r\n');

rows.forEach((row) => {
  const columns = row.split(',');

  client.query(`
    INSERT INTO secao------------(
      id,
      descricao,
      eliminado
    )
    VALUES($1 ,$2, $3)
  `, [
    Number(columns[0]),
    columns[1]?.replace(/"/g, ''),
    columns[2]?.replace(/"/g, ''),
  ])
    .catch(console.error);

  console.log(
    Number(columns[0]),
    columns[1]?.replace(/"/g, ''),
    columns[2]?.replace(/"/g, ''),
  );
});

console.log('section table is done');
