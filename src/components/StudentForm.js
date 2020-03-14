import React, { useState } from 'react';

export default function SchoolForm({ schools, createStudent }) {
  const [student, setStudent] = useState({
    name: '',
    students_schoolid_fkey: '',
  });
  const onChange = e => {
    const changed = {};
    changed[e.target.name] = e.target.value;
    setStudent({ ...student, ...changed });
  };

  const onSubmit = e => {
    e.preventDefault();
    createStudent(student);
    setStudent({
      name: '',
      students_schoolid_fkey: '',
    });
  };
  return (
    <section>
      <h3>Create Student</h3>
      <form onSubmit={onSubmit}>
        <input name="name" value={student.name} onChange={onChange} />
        {student.name}
        <select value="" name="students_schoolid_fkey" onChange={onChange}>
          <option defaultValue value="">
            --Select School--
          </option>
          {schools.map(school => {
            return (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            );
          })}
        </select>
        <button>Create</button>
      </form>
    </section>
  );
}
