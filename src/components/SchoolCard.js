import React from 'react';
import qs from 'qs';

export default function SchoolCard({
  students,
  schools,
  params,
  updateStudent,
  setReviseStudent,
  setReviseSchool,
}) {
  const handleSelectOnChange = (e, schoolId) => {
    const updated = students.find(s => s.id === e.target.value);
    updated.students_schoolid_fkey = schoolId;
    updateStudent(updated);
  };

  const handleUnenrollBtn = (e, student) => {
    const updated = { ...student, students_schoolid_fkey: '' };
    updateStudent(updated);
  };

  return (
    <div className="school-card">
      {schools.map(school => {
        return (
          <div key={school.id}>
            <h3>
              <a
                href={`#${qs.stringify({ view: 'school' })}`}
                className={params.view === 'school' ? 'selected' : ''}
                onClick={() => setReviseSchool(school)}
              >
                {school.name}
              </a>
            </h3>
            <select value="" onChange={e => handleSelectOnChange(e, school.id)}>
              <option defaultValue value="">
                --enroll a student--
              </option>
              {students
                .filter(s => s.students_schoolid_fkey !== school.id)
                .map((student, idx) => {
                  return (
                    <option key={idx} value={student.id}>
                      {student.name}
                    </option>
                  );
                })}
            </select>
            <ul>
              {students
                .filter(s => s.students_schoolid_fkey === school.id)
                .map((student, idx) => {
                  return (
                    <li key={idx}>
                      <a
                        href={`#${qs.stringify({ view: 'student' })}`}
                        className={params.view === 'student' ? 'selected' : ''}
                        onClick={() => setReviseStudent(student)}
                      >
                        {student.name}
                      </a>
                      <button onClick={e => handleUnenrollBtn(e, student)}>
                        Unenroll
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
