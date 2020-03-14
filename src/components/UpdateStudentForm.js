import React from 'react';

export default function UpdateStudentForm({
  reviseStudent,
  setReviseStudent,
  error,
  schools,
  updateStudent,
  destroyStudent,
}) {
  const onChange = e => {
    const changed = {};
    changed[e.target.name] = e.target.value;
    setReviseStudent({ ...reviseStudent, ...changed });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    updateStudent(reviseStudent);
  };

  const deleteStudent = id => {
    destroyStudent(id);
  };

  return (
    <div>
      <h3>Update Student</h3>
      <div>{!!error && <div className="error">{error}</div>}</div>
      <form onSubmit={handleOnSubmit}>
        <input value={reviseStudent.name} name="name" onChange={onChange} />
        <select
          value={reviseStudent.students_schoolid_fkey || ''}
          name="students_schoolid_fkey"
          onChange={onChange}
        >
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
        <button onClick={() => (window.location = '#')}>Update</button>
      </form>
      <button
        className="deleteBtn"
        onClick={() => {
          deleteStudent(reviseStudent.id);
          window.location = '#';
        }}
      >
        Delete
      </button>
    </div>
  );
}
