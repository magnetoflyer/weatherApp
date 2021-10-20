import './App.css';
import React,{useState} from 'react'

const api={
  key:"8504fa1578edde2ff9d50c03ff0e9956",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {


  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});

  const search =evt => {
    if (evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result => {
        setWeather(result);
      setQuery("");
      console.log(result);
      
    
    }
      )}
  } //fectching info from api

  var city="";
  var backVideoSrc="./backVideo.mp4";
  if (typeof weather.main!="undefined"){
    
    const newCity=weather.name;
    if (newCity!==city){
      city=newCity;
      switch(weather.weather[0].main){
        case "Clouds":
          backVideoSrc="./clouds.mp4";
          break;
        case "Rain":
          backVideoSrc="./rain.mp4";
          break;
        case "Snow":
          backVideoSrc="./snow.mp4";
          break;
        case "Sunny" :
          backVideoSrc="./sunny.mp4";
          break;
        case "Mist":
          backVideoSrc="./fog.mp4";
          break;
        case "Fog":
          backVideoSrc="./fog.mp4";
          break;
        case "Haze":
          backVideoSrc="./fog.mp4";
          break;
          
        default:
          backVideoSrc="./backVideo.mp4";
          break;
        

      }

    }
  }//decision to selet type of background video 

  const dateBuilder=(d)=>{
    let months =["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    let days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }

  return (
  
    <div className={(typeof weather.main!="undefined")?((weather.main.temp>26)?"App warm":"App"):"App calm"}>
      <video src={backVideoSrc} autoPlay loop muted/>
      <main>
        <div className='search-box'>
          <input type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
            />
        </div>
        {(typeof weather.main !== 'undefined')?(
        <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}
            </div>
          </div>
        </div>
        ):("")}
      </main>
    </div>
  );
}

export default App;
