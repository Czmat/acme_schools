import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { getHash } from './utils/Utils';
import Header from './components/Header';
import SchoolForm from './components/SchoolForm';
import StudentForm from './components/StudentForm';
import UnenrolledStudentList from './components/UnenrolledStudentList';
import SchoolCard from './components/SchoolCard';
import UpdateStudentForm from './components/UpdateStudentForm';

const App = () => {
  // const [student, setStudent] = useState({
  //   name: '',
  //   students_schoolid_fkey: '',
  // });
  // console.log(student);
  const [students, setStudents] = useState([]);
  const [reviseStudent, setReviseStudent] = useState({
    name: '',
    students_schoolid_fkey: '',
  });
  console.log(reviseStudent, 'app');
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState([]);
  const [params, setParams] = useState([]);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(getHash()));
    });
    setParams(qs.parse(getHash()));
  }, []);

  const createSchool = async schoolName => {
    console.log(schoolName);
    try {
      const created = (await axios.post('/api/schools', schoolName)).data;
      setSchools([...schools, created]);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const createStudent = async studentName => {
    console.log(studentName);
    try {
      const created = (await axios.post('/api/students', studentName)).data;
      setStudents([...students, created]);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const updateStudent = async student => {
    try {
      const updated = (await axios.put(`/api/students/${student.id}`, student))
        .data;

      const updatedStudents = students.map(student => {
        if (student.id !== updated.id) {
          return student;
        } else {
          return updated;
        }
      });
      setStudents(updatedStudents);
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  useEffect(() => {
    axios.get('/api/students').then(response => setStudents(response.data));
    axios.get('/api/schools').then(response => setSchools(response.data));
  }, []);

  return (
    <div>
      <Header students={students} schools={schools} params={params} />
      {!!error && <div className="error">{error}</div>}
      <div className="forms">
        <SchoolForm setSchools={setSchools} createSchool={createSchool} />
        <StudentForm
          schools={schools}
          createStudent={createStudent}
          // student={student}
          // setStudent={setStudent}
        />
        <UpdateStudentForm
          updateStudent={updateStudent}
          schools={schools}
          createStudent={createStudent}
          reviseStudent={reviseStudent}
          setReviseStudent={setReviseStudent}
        />
      </div>
      <div className="student-card school-card">
        <UnenrolledStudentList
          students={students}
          params={params}
          reviseStudent={reviseStudent}
          setReviseStudent={setReviseStudent}
        />
        <SchoolCard
          students={students}
          schools={schools}
          params={params}
          updateStudent={updateStudent}
          reviseStudent={reviseStudent}
          setReviseStudent={setReviseStudent}
        />
      </div>
      {/* <div>Students</div>
      <ul>
        {students.map(student => {
          return <li key={student.id}>{student.name}</li>;
        })}
      </ul> */}
      {/* <div>Schools</div>
      <ul>
        {schools.map(school => {
          return <li key={school.id}>{school.name}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default App;
