import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AnimatedBarChart from './Components/AnimatedBarChart';
import '../css/app.css'

const App = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('female-number-of-lives-interpolated');
  const [loading, setLoading] = useState(false);

  const titleMap = {
    'female-life-expectancy-interpolated': 'Female Life Expectancy',
    'female-death-probability-interpolated': 'Female Death Probability',
    'female-number-of-lives-interpolated': 'Female Number of Lives',
    'male-life-expectancy-interpolated': 'Male Life Expectancy',
    'male-number-of-lives-interpolated': 'Male Number of Lives',
    'male-death-probability-interpolated': 'Male Death Probability'
  };

  const title = titleMap[selectedOption]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/${selectedOption}`);
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);

  };

  return (
    <div style={{ textAlign: 'center' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&display=swap"></link>
      <h1>Survitality</h1>
      {/* Add a dropdown menu */}
      <label style={{ color: "white" }}>
        <span style={{ marginRight: "10px", fontFamily: "Comfortaa", fontSize: 16, fontWeight: "bold" }}>Select a series:</span>
        <select className="dropdown" style={{ width: "200px" }} value={selectedOption} onChange={handleDropdownChange}>
          {/* <option value="life-expectancies">Life Expectancies</option> */}
          <option value="female-life-expectancy-interpolated">Female Life Expectancy</option>
          <option value="female-death-probability-interpolated">Female Death Probability</option>
          <option value="female-number-of-lives-interpolated">Female Number of Lives</option>
          <option value="male-life-expectancy-interpolated">Male Life Expectancy</option>
          <option value="male-number-of-lives-interpolated">Male Number of Lives</option>
          <option value="male-death-probability-interpolated">Male Death Probability</option>
        </select>
      </label>

      {/* {data.map(item => (
        <div key={item.year}>
          <div>Year: {item.year}, Value: {item['37']}, Value: {item['77']}</div>
        </div>
      ))} */}

      {loading && <div style={{ marginTop: "8px", marginBottom: "8px", color: "white", fontFamily: "Comfortaa", fontWeight: "bold" }}>Loading...</div>}
      
      {!loading && data &&
      <div>
      <div style={{ margin: 'auto', width: '50%' }}>
        <AnimatedBarChart data={data} title={title} />
      </div>
            <div className="container">
            Data is from the <a href="https://site.demog.berkeley.edu/" className="link">Berkeley Mortality Database</a> (1941-2003)
            <div style={{ marginTop: "10px" }}>
              and the <a href="https://www.ssa.gov/oact/STATS/table4c6.html" className="link">Social Security Administration</a> (2004-2020)
            </div>
          </div>
          </div>
      }



    </div>
  );
};

const appElement = document.getElementById('app');

if (appElement) {
  createRoot(appElement).render(<App />);
} else {
  console.error("Element with ID 'app' not found in the DOM.");
}
