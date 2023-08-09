import React, { useEffect, useState } from "react";
import { memo } from "react";
import styles from "../style.module.css";



function Display({data}){
    

    const [text,setText] = useState('');


    //to many re-renders hatası aldım useEffect parametresi olarak data.main.temp gönderince çözüldü
    useEffect(()=>{
        if(data.main.temp>35){
            setText('çok sıcak');
        }else if(data.main.temp>20){
            setText('sıcak');
        }else{
            setText('soğuk');
        }
    },[data.main.temp])

    const [icon,setIcon] = useState('');

    useEffect(()=>{
        if(data.weather[0].main === 'Clear'){
            setIcon('https://openweathermap.org/img/wn/01d@2x.png');
        }else if(data.weather[0].main === 'Thunderstorm'){
            setIcon('http://openweathermap.org/img/wn/11d@2x.png');
        }else if(data.weather[0].main === 'Drizzle'){
            setIcon('http://openweathermap.org/img/wn/09d@2x.png');
        }else if(data.weather[0].main === 'Rain'){
            setIcon('http://openweathermap.org/img/wn/10d@2x.png');
        }else if(data.weather[0].main === 'Snow'){
            setIcon('http://openweathermap.org/img/wn/13d@2x.png');
        }else if(data.weather[0].main === 'Clouds'){
            if(data.weather.description === 'parçalı az bulutlu'){
                setIcon('http://openweathermap.org/img/wn/04d@2x.png');
            }else if(data.weather.description === 'az bulutlu'){
                setIcon('http://openweathermap.org/img/wn/02d@2x.png');
            }else{
                setIcon('http://openweathermap.org/img/wn/02d@2x.png');
            }
        }else{
            setIcon('http://openweathermap.org/img/wn/50d@2x.png');
        }
    },[data.weather[0].main])


    return(
        <>
            <div className="info">
                <p className="city-name">{data.name}</p>
                <p><span className={styles.degree}>{data.main.temp}</span> °C</p>
                <p>Hava şu an <span className={data.main.temp<10?styles.cold:styles.hot}>{text}</span> ve <span className={data.weather[0].main==='Clear'?styles.skyO:styles.skyC}>{data.weather[0].description}</span></p>
                <img src={icon} alt="wheather condition" />
            </div>

        </>
    );
}

export default memo(Display);