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
import UpdateSchoolForm from './components/UpdateSchoolForm';

const App = () => {
  const [students, setStudents] = useState([]);
  const [reviseStudent, setReviseStudent] = useState({
    name: '',
    students_schoolid_fkey: '',
  });
  const [reviseSchool, setReviseSchool] = useState({
    name: '',
  });
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState([]);
  const [params, setParams] = useState(qs.parse(getHash()));

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(getHash()));
    });
    setParams(qs.parse(getHash()));
  }, []);

  const createSchool = async schoolName => {
    try {
      const created = (await axios.post('/api/schools', schoolName)).data;
      setSchools([...schools, created]);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const createStudent = async studentName => {
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
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const updateSchool = async school => {
    try {
      const updated = (await axios.put(`/api/schools/${school.id}`, school))
        .data;
      const updatedSchools = schools.map(school => {
        if (school.id !== updated.id) {
          return school;
        } else {
          return updated;
        }
      });
      setSchools(updatedSchools);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  //deletefunc
  const destroyStudent = async studentToDestroyId => {
    try {
      await axios.delete(`/api/students/${studentToDestroyId}`);
      const updated = students.filter(
        student => student.id !== studentToDestroyId
      );
      setStudents(updated);
      setError('');
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const destroySchool = async schoolToDestroyId => {
    try {
      await axios.delete(`/api/schools/${schoolToDestroyId}`);
      const updated = schools.filter(school => school.id !== schoolToDestroyId);
      setSchools(updated);
      setError('');
    } catch (ex) {
      setError(ex.response.data.error);
    }
  };

  useEffect(() => {
    axios.get('/api/students').then(response => setStudents(response.data));
    axios.get('/api/schools').then(response => setSchools(response.data));
  }, []);

  return (
    <div>
      <Header students={students} schools={schools} params={params} />
      {!params.view && (
        <div className="forms">
          <SchoolForm
            setSchools={setSchools}
            error={error}
            createSchool={createSchool}
          />
          <StudentForm
            error={error}
            schools={schools}
            createStudent={createStudent}
          />
        </div>
      )}
      <div className="card ">
        {!params.view && (
          <UnenrolledStudentList
            students={students}
            params={params}
            reviseStudent={reviseStudent}
            setReviseStudent={setReviseStudent}
          />
        )}
        {!params.view && (
          <SchoolCard
            students={students}
            schools={schools}
            params={params}
            updateStudent={updateStudent}
            reviseStudent={reviseStudent}
            setReviseStudent={setReviseStudent}
            setReviseSchool={setReviseSchool}
          />
        )}
      </div>
      {params.view === 'school' && (
        <UpdateSchoolForm
          error={error}
          updateSchool={updateSchool}
          schools={schools}
          createStudent={createStudent}
          reviseSchool={reviseSchool}
          setReviseSchool={setReviseSchool}
          destroySchool={destroySchool}
        />
      )}
      {params.view === 'student' && (
        <UpdateStudentForm
          error={error}
          updateStudent={updateStudent}
          schools={schools}
          createStudent={createStudent}
          reviseStudent={reviseStudent}
          setReviseStudent={setReviseStudent}
          destroyStudent={destroyStudent}
        />
      )}
    </div>
  );
};

export default App;
