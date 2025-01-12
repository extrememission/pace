import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [raceType, setRaceType] = useState('');
  const [distance, setDistance] = useState('');
  const [unit, setUnit] = useState('km');
  const [time, setTime] = useState('');
  const [pace, setPace] = useState('');
  const [result, setResult] = useState('');

  const raceTypes = {
    '5k': 5,
    '10k': 10,
    'Half Marathon': 21.1,
    'Marathon': 42.2,
    'Other': 0
  };

  const calculatePace = () => {
    let distanceInKm = raceType === 'Other' ? 
      (unit === 'km' ? parseFloat(distance) : parseFloat(distance) * 1.60934) : 
      raceTypes[raceType];
    
    let timeInMinutes = time.split(':').reduce((acc, time) => (60 * acc) + +time);
    let paceInMinPerKm = timeInMinutes / distanceInKm;
    let paceMinutes = Math.floor(paceInMinPerKm);
    let paceSeconds = Math.round((paceInMinPerKm - paceMinutes) * 60);
    
    setResult(`Your pace is ${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} min/km`);
  };

  const calculateDistance = () => {
    let [paceMin, paceSec] = pace.split(':').map(Number);
    let paceInMinPerKm = paceMin + (paceSec / 60);
    let timeInMinutes = time.split(':').reduce((acc, time) => (60 * acc) + +time);
    let distanceInKm = timeInMinutes / paceInMinPerKm;
    
    setResult(`You can run ${distanceInKm.toFixed(2)} km in the given time`);
  };

  return (
    <div className="App">
      <h1>Running Pace Calculator</h1>
      <div className="input-group">
        <label>Race Type:</label>
        <select value={raceType} onChange={(e) => setRaceType(e.target.value)}>
          <option value="">Select race type</option>
          {Object.keys(raceTypes).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {raceType === 'Other' && (
        <div className="input-group">
          <label>Distance:</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
        </div>
      )}
      <div className="input-group">
        <label>Time (hh:mm:ss):</label>
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="00:00:00" />
      </div>
      <div className="input-group">
        <label>Pace (mm:ss per km):</label>
        <input type="text" value={pace} onChange={(e) => setPace(e.target.value)} placeholder="00:00" />
      </div>
      <button onClick={pace ? calculateDistance : calculatePace}>Calculate</button>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default App;
