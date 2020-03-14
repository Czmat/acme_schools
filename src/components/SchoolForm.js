import React, { useState } from 'react';

export default function SchoolForm({ error, createSchool }) {
  const [name, setName] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    createSchool({ name });
    setName('');
  };
  return (
    <section>
      <h3>Create School</h3>
      <div>{!!error && <div className="error">{error}</div>}</div>
      <form onSubmit={onSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button>Create</button>
      </form>
    </section>
  );
}
