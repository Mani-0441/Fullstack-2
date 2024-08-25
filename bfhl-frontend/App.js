import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  // Update this URL to point to your backend
  const apiUrl = "https://bajajfinserv-26rsav3ue-manikantas-projects-6b29efb4.vercel.app"; // Ensure this is defined in .env file

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(jsonInput);
      const response = await axios.post(apiUrl, jsonData);
      setResponseData(response.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or API request failed.');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(prev => 
      checked ? [...prev, value] : prev.filter(option => option !== value)
    );
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const { alphabets, numbers, highest_lowercase_alphabet } = responseData;

    return (
      <div className="response-container">
        {selectedOptions.includes('Alphabets') && (
          <div>Alphabets: {alphabets.join(', ')}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div>Numbers: {numbers.join(', ')}</div>
        )}
        {selectedOptions.includes('Highest Lowercase Alphabet') && (
          <div>Highest Lowercase Alphabet: {highest_lowercase_alphabet.join(', ')}</div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL API Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={jsonInput} 
          onChange={handleInputChange} 
          placeholder='Enter JSON here...'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
      {responseData && (
        <div className="options">
          <label>
            <input type="checkbox" value="Alphabets" onChange={handleOptionChange} />
            Alphabets
          </label>
          <label>
            <input type="checkbox" value="Numbers" onChange={handleOptionChange} />
            Numbers
          </label>
          <label>
            <input type="checkbox" value="Highest Lowercase Alphabet" onChange={handleOptionChange} />
            Highest Lowercase Alphabet
          </label>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
