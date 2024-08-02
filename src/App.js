import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  document.title = "ABCD123"; 
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => setJsonInput(e.target.value);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('http://localhost:5000/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or server error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};

    if (selectedOptions.some(option => option.value === 'numbers')) {
      filteredResponse.numbers = response.numbers;
    }

    if (selectedOptions.some(option => option.value === 'alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }

    if (selectedOptions.some(option => option.value === 'highest_alphabet')) {
      filteredResponse.highest_alphabet = response.highest_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response</h3>
        {Object.keys(filteredResponse).map(key => (
          <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {filteredResponse[key].join(', ')}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <textarea value={jsonInput} onChange={handleInputChange} rows="5" cols="50"></textarea>
      <button onClick={handleSubmit}>Submit</button>
      <h2>Multi Filter</h2>
      <Select
        isMulti
        name="filters"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={setSelectedOptions}
      />
      {renderResponse()}
    </div>
  );
}

export default App;
