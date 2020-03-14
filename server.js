const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

//gets
app.get('/api/students', (req, res, next) => {
  db.readStudents()
    .then(students => res.send(students))
    .catch(next);
});

app.get('/api/schools', (req, res, next) => {
  db.readSchools()
    .then(schools => res.send(schools))
    .catch(next);
});

//posts
app.post('/api/students', (req, res, next) => {
  console.log(req.body);
  db.createStudent(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.post('/api/schools', (req, res, next) => {
  console.log(req.body);
  db.createSchool(req.body)
    .then(school => res.send(school))
    .catch(next);
});

//puts
app.put('/api/students/:id', (req, res, next) => {
  console.log(req.body, req.params.id);
  db.updateStudent(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.put('/api/schools/:id', (req, res, next) => {
  console.log(req.body, req.params.id);
  db.updateSchool(req.body)
    .then(school => res.send(school))
    .catch(next);
});

//delete
app.delete('/api/students/:id', (req, res, next) => {
  const id = req.params.id;
  db.deleteStudent(id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/schools/:id', (req, res, next) => {
  const id = req.params.id;
  db.deleteSchool(id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

//error
app.use((req, res, next) => {
  next({ status: 404, message: `page not found - ${req.method} - ${req.url}` });
});

app.use((err, req, res, next) => {
  console.log(err.toString());
  res.status(err.status || 500).send({ error: err.toString() });
});

const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(ex => console.log(ex));
