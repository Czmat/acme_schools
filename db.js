const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgress://localhost/acme_schools'
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS students;
  DROP TABLE IF EXISTS schools;
  CREATE TABLE schools(
    id UUID PRIMARY KEY default uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    CHECK (char_length(name)> 0)
    );
    CREATE TABLE students(
      id UUID PRIMARY KEY default uuid_generate_v4(),
      name VARCHAR(255) NOT NULL UNIQUE,
      students_schoolid_fkey UUID REFERENCES schools(id),
      CHECK (char_length(name)> 0)
      );
      --CREATE UNIQUE INDEX ON students(students_schoolid_fkey);
    INSERT INTO schools(name) values('UCLA');
    INSERT INTO schools(name) values('NYU');
    INSERT INTO students(name) values('lucy');
    INSERT INTO students(name) values('moe');
  `;
  await client.query(SQL);
};

const readStudents = async () => {
  return (await client.query('SELECT * from students')).rows;
};

const readSchools = async () => {
  return (await client.query('SELECT * from schools')).rows;
};

const createStudent = async student => {
  return (
    await client.query(
      'INSERT INTO students(name, students_schoolid_fkey) values($1, $2) returning *',
      [student.name, student.students_schoolid_fkey || null]
    )
  ).rows[0];
};

const createSchool = async school => {
  return (
    await client.query('INSERT INTO schools(name) values($1) returning *', [
      school.name,
    ])
  ).rows[0];
};

//update
const updateStudent = async student => {
  const SQL =
    'UPDATE students set name=$1, students_schoolid_fkey=$2 WHERE id=$3 returning *';
  const response = await client.query(SQL, [
    student.name,
    student.students_schoolid_fkey || null,
    student.id,
  ]);
  return response.rows[0];
};

const updateSchool = async school => {
  const SQL = 'UPDATE schools set name=$1 WHERE id=$2 returning *';
  const response = await client.query(SQL, [school.name, school.id]);
  return response.rows[0];
};

//delete
const deleteStudent = async id => {
  const SQL = 'DELETE FROM students WHERE id=$1';
  await client.query(SQL, [id]);
};

const deleteSchool = async id => {
  const SQL = 'DELETE FROM schools WHERE id=$1';
  await client.query(SQL, [id]);
};

module.exports = {
  sync,
  readStudents,
  readSchools,
  createStudent,
  createSchool,
  updateStudent,
  deleteStudent,
  updateSchool,
  deleteSchool,
};
