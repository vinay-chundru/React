import React, { useState } from 'react';

const dictionaryData = [
  { word: "React", meaning: "A JavaScript library for building user interfaces." },
  { word: "Component", meaning: "A reusable building block in React." },
  { word: "State", meaning: "An object that stores data for a component." }
];

function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    const foundWord = dictionaryData.find(entry =>
      entry.word.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundWord) {
      setResult(foundWord.meaning);
    } else {
      setResult("Word not found in the dictionary.");
    }
  };

  return (
    <div>
      <h1>Dictionary App</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a word..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
      <h2>Definition:</h2>
        {result && (
          <div>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;