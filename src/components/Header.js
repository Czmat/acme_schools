import React from 'react';

export default function Header({ schools, students, params }) {
  return (
    <div>
      <h1>
        <a href={`#`} className={params.view === 'home' ? 'selected' : ''}>
          Acme Schools
        </a>
      </h1>
      <ul>
        <li>{schools.length} Schools</li>
        <li>
          {students.length} Student (
          {students.filter(student => student.students_schoolid_fkey).length}{' '}
          enrolled)
        </li>
      </ul>
    </div>
  );
}
