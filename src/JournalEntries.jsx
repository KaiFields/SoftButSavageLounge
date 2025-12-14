import React, { useState } from 'react';

export default function JournalEntries({ user }) {
  const [entries, setEntries] = useState([
    { id: 1, title: 'Welcome Entry', content: 'This is your first journal entry. Write your thoughts, dreams, or rituals here.' }
  ]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  function handleChange(e) {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  }

  function handleAddEntry(e) {
    e.preventDefault();
    if (!newEntry.title || !newEntry.content) return;
    setEntries([
      { id: Date.now(), ...newEntry },
      ...entries
    ]);
    setNewEntry({ title: '', content: '' });
  }

  return (
    <section className="journal-entries">
      <h2>Journal Entries</h2>
      <form onSubmit={handleAddEntry} className="journal-form">
        <input
          name="title"
          value={newEntry.title}
          onChange={handleChange}
          placeholder="Entry Title"
          required
        />
        <textarea
          name="content"
          value={newEntry.content}
          onChange={handleChange}
          placeholder="Write your thoughts..."
          required
        />
        <button type="submit">Add Entry</button>
      </form>
      <ul className="entries-list">
        {entries.map(entry => (
          <li key={entry.id} className="entry">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
