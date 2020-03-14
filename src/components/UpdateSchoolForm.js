import React from 'react';

export default function SchoolForm({
  destroySchool,
  setReviseSchool,
  reviseSchool,
  updateSchool,
  error,
}) {
  const handleOnSubmit = e => {
    e.preventDefault();
    updateSchool(reviseSchool, 'uschool in handle');
  };
  return (
    <section>
      <h3>Update School</h3>
      <div>{!!error && <div className="error">{error}</div>}</div>
      <form onSubmit={handleOnSubmit}>
        <input
          value={reviseSchool.name}
          onChange={e =>
            setReviseSchool({ ...reviseSchool, name: e.target.value })
          }
        />
        <button onClick={() => (window.location = '#')}>Update</button>
      </form>
      <button
        className="deleteBtn"
        onClick={() => {
          destroySchool(reviseSchool.id);
          window.location = '#';
        }}
      >
        Delete
      </button>
    </section>
  );
}
