// src/App.jsx
import { useState } from 'react';
import './App.css';
import './index.css';

const initialFighters = [
  { id: 1, name: 'Survivor', price: 12, strength: 6, agility: 4, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png' },
  { id: 2, name: 'Scavenger', price: 10, strength: 5, agility: 5, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png' },
  { id: 3, name: 'Shadow', price: 18, strength: 7, agility: 8, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png' },
  { id: 4, name: 'Tracker', price: 14, strength: 7, agility: 6, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png' },
  { id: 5, name: 'Sharpshooter', price: 20, strength: 6, agility: 8, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png' },
  { id: 6, name: 'Medic', price: 15, strength: 5, agility: 7, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png' },
  { id: 7, name: 'Engineer', price: 16, strength: 6, agility: 5, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png' },
  { id: 8, name: 'Brawler', price: 11, strength: 8, agility: 3, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png' },
  { id: 9, name: 'Infiltrator', price: 17, strength: 5, agility: 9, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png' },
  { id: 10, name: 'Leader', price: 22, strength: 7, agility: 6, img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png' }
];

const VISIBLE_COUNT = 3; // Number of fighters to show at once

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState(initialFighters);
  const [message, setMessage] = useState('');
  const [startIdx, setStartIdx] = useState(0);

  const handleAddFighter = (fighter) => {
    if (money >= fighter.price) {
      setTeam([...team, fighter]);
      setZombieFighters(zombieFighters.filter(f => f.id !== fighter.id));
      setMoney(money - fighter.price);
      setMessage('');
      // Adjust startIdx if i needed
      if (startIdx > 0 && startIdx > zombieFighters.length - VISIBLE_COUNT) {
        setStartIdx(startIdx - 1);
      }
    } else {
      setMessage('Not enough money');
    }
  };

  const handleRemoveFighter = (fighter) => {
    setTeam(team.filter(f => f.id !== fighter.id));
    setZombieFighters([...zombieFighters, fighter]);
    setMoney(money + fighter.price);
  };

  const handleLeft = () => {
    setStartIdx(idx => Math.max(0, idx - 1));
  };

  const handleRight = () => {
    setStartIdx(idx => Math.min(zombieFighters.length - VISIBLE_COUNT, idx + 1));
  };

  const totalStrength = team.reduce((acc, curr) => acc + curr.strength, 0);
  const totalAgility = team.reduce((acc, curr) => acc + curr.agility, 0);

  // Only show a slice of fighters
  const visibleFighters = zombieFighters.slice(startIdx, startIdx + VISIBLE_COUNT);

  return (
    <div>
      <h1>Reactville Survival Team</h1>
      <h2>Money: ${money}</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <h3>Available Recruits</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={handleLeft} disabled={startIdx === 0}>&lt;</button>
        <ul>
          {visibleFighters.map(f => (
            <li key={f.id}>
              <img src={f.img} alt={f.name} width="100" />
              <p><strong>{f.name}</strong></p>
              <p>Price: ${f.price}</p>
              <p>Strength: {f.strength}</p>
              <p>Agility: {f.agility}</p>
              <button onClick={() => handleAddFighter(f)}>Add</button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleRight}
          disabled={startIdx >= zombieFighters.length - VISIBLE_COUNT}
        >&gt;</button>
      </div>

      <h3>Your Team</h3>
      {team.length === 0 ? (
        <p>Pick some team members!</p>
      ) : (
        <ul>
          {team.map(f => (
            <li key={f.id}>
              <img src={f.img} alt={f.name} width="100" />
              <p><strong>{f.name}</strong></p>
              <p>Price: ${f.price}</p>
              <p>Strength: {f.strength}</p>
              <p>Agility: {f.agility}</p>
              <button onClick={() => handleRemoveFighter(f)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h4>Total Strength: {totalStrength}</h4>
      <h4>Total Agility: {totalAgility}</h4>
    </div>
  );
};

export default App;
