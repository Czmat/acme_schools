import React, { useState } from 'react';

export default function SchoolForm({ schools, setSchools, createSchool }) {
  const [name, setName] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    createSchool({ name });
    setName('');
  };
  return (
    <section>
      <h3>Create School</h3>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button>Create</button>
      </form>
    </section>
  );
}
