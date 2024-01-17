// AnimatedBarChart.tsx
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

interface AnimatedBarChartProps {
  data: { [key: number]: Record<string, string> }[] | null;
}

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [referenceYear, setReferenceYear] = useState(2004)

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;

    if (isAnimating) {
      animationInterval = setInterval(() => {
        setCurrentIndex(current => (current + 1) % (data ? data.length : 1));
      }, 0 ); // Frames per second (equal to denominator)
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [isAnimating, data]);

  const onNextFrame = () => {
    setCurrentIndex(current => (current + 1) % (data ? data.length : 1));
  };

  const onToggleAnimation = () => {
    setIsAnimating(prev => !prev);
  };

  const Eligibleyears = Array.from({ length: 2022 - 2004 + 1 }, (_, index) => 2004 + index);

  const handleChange = (event) => {
    setReferenceYear(parseInt(event.target.value, 10)); // Convert the value to an integer
  };
  
  // Check if data is available
  if (!data || data.length === 0 || !data[currentIndex] || !data[currentIndex].year) {
    return <div>Loading...</div>;
  }

  const yearData = data[currentIndex];
  const keys = Object.keys(yearData).filter(key => key !== 'year');
  const values = keys.map(key => Number(yearData[key]));

  const frames = [
    {
      name: `Frame ${currentIndex}`,
      data: [
        {
          x: keys,
          y: values,
          type: 'bar',
        },
      ],
    },
  ];

  const layout = {
    title: `Bar Chart for ${ Math.floor(yearData.year)}`,
    xaxis: {
      title: 'Values',
      range: [0, 120]
    },
    yaxis: {
      title: 'Count',
      //range: [0, 100000]
    },
  };

  return (
    <div>
      <Plot data={frames[0].data} layout={layout} config={{ displayModeBar: false }} />
      <button onClick={onNextFrame}>Next Frame</button>
      <button onClick={onToggleAnimation}>
        {isAnimating ? 'Stop Continuous Animation' : 'Start Continuous Animation'}
      </button>
      <div>
      <label htmlFor="yearDropdown">Select a Year:</label>
      <select id="yearDropdown" value={referenceYear} onChange={handleChange}>
        {Eligibleyears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <p>Selected Year: {referenceYear}</p>
    </div>

    </div>
  );
};

export default AnimatedBarChart;
