import React from 'react';
import qs from 'qs';

export default function UnenrolledStudentList({
  students,
  params,
  setReviseStudent,
}) {
  return (
    <div className="unenrolled-students">
      <h3>Unenrolled Students</h3>
      <ul>
        {students
          .filter(s => !s.students_schoolid_fkey)
          .map(student => {
            return (
              <li key={student.id}>
                <a
                  href={`#${qs.stringify({ view: 'student' })}`}
                  className={params.view === 'student' ? 'selected' : ''}
                  onClick={() => setReviseStudent(student)}
                >
                  {student.name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
