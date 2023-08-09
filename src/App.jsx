import { useEffect, useState } from "react";
import TurkeyMap from 'turkey-map-react';
import Display from "./components/display";
import CLOUDS from "vanta/src/vanta.clouds";



function App() {

  const [city,setCity] = useState('');
  const [data,setData] = useState(null);
  const [anlikCity,setAnlikCity] = useState('');
  // const [vantaClouds,setVantaClouds] = useState(null);

  const KEY = '045d4e57cf228c5ca81eaa79ef10f146';
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric&lang=tr
`

  async function getApi(){
    try{
      const response = await fetch(api);
      const data = await response.json();
      setData(data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(city!==''){
      getApi();
    }
  },[city])

  useEffect(()=>{
    CLOUDS({
      el: '#container',
      speed: 1,
      mouseControls: true,
      touchControls: true,
      gyroControls: false
    })
  },[])

  return (
    <>
      <div id="container">
        <div className="current-city">
          <p style={{textAlign:'center'}}>{anlikCity}</p>
        </div>
        <div className="map">
          <TurkeyMap onClick={ ({name}) => setCity(name) } onHover={ ({name}) => setAnlikCity(name) }/>
        </div>
        {
          data && <Display data={data}/>
        }
      </div>
    </>
  );
}

export default App;
