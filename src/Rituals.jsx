import React, { useState } from 'react';

export default function Rituals() {
  const [rituals, setRituals] = useState([
    { id: 1, name: 'Morning Reflection', description: 'Start your day with gratitude and intention.' }
  ]);
  const [newRitual, setNewRitual] = useState({ name: '', description: '' });

  function handleChange(e) {
    setNewRitual({ ...newRitual, [e.target.name]: e.target.value });
  }

  function handleAddRitual(e) {
    e.preventDefault();
    if (!newRitual.name || !newRitual.description) return;
    setRituals([
      { id: Date.now(), ...newRitual },
      ...rituals
    ]);
    setNewRitual({ name: '', description: '' });
  }

  return (
    <section className="rituals">
      <h2>Rituals</h2>
      <form onSubmit={handleAddRitual} className="ritual-form">
        <input
          name="name"
          value={newRitual.name}
          onChange={handleChange}
          placeholder="Ritual Name"
          required
        />
        <textarea
          name="description"
          value={newRitual.description}
          onChange={handleChange}
          placeholder="Describe the ritual..."
          required
        />
        <button type="submit">Add Ritual</button>
      </form>
      <ul className="rituals-list">
        {rituals.map(ritual => (
          <li key={ritual.id} className="ritual">
            <h3>{ritual.name}</h3>
            <p>{ritual.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
