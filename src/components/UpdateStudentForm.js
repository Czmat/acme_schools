import React from 'react';

export default function UpdateStudentForm({
  reviseStudent,
  setReviseStudent,
  params,
  schools,
  updateStudent,
}) {
  const onChange = e => {
    const changed = {};
    changed[e.target.name] = e.target.value;
    console.log(changed);
    setReviseStudent({ ...reviseStudent, ...changed });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log('up student');
    updateStudent(reviseStudent);
  };

  const deleteStudent = id => {
    console.log(id);
  };

  return (
    <div>
      <h3>Update Student</h3>
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
        <button>Update</button>
      </form>
      <button
        className="deleteBtn"
        onClick={() => deleteStudent(reviseStudent.id)}
      >
        Delete
      </button>
    </div>
  );
}
