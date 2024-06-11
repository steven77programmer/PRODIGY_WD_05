import React from 'react';
import Weather from './components/Weather';
import { WiDayCloudy } from 'react-icons/wi';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
      
        <WiDaySunny size={50} color="#ffaa00"  className='icons'/>
        <WiRain size={50} color="#0077ff"      className='icons'/>
      </div> */}
        <div className='icons'><WiDayCloudy size={50}  /></div>Weather App</h1>
      <Weather />
    </div>
  );
};

export default App;
