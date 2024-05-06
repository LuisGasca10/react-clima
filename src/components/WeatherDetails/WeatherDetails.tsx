
import { Weather } from '../../hooks/useWeather'
import { formatTemperature } from '../../utils';
import styles from './WeatherDetails.module.css';

interface Props {
    weather:Weather
}

export const WeatherDetails = ({weather}:Props) => {
  return (
    <div className={styles.container}>
      <h2>Clima de: {weather.name}</h2>
      <p className={styles.current} >{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={styles.temperatures} >
        <p>
          Sensación Térmica: 
          <span>{formatTemperature(weather.main.feels_like)}&deg;C</span>
        </p>
        <p>
          Temperatura Maxima: 
          <span>{formatTemperature(weather.main.temp_max)}&deg;C</span>
        </p>
        <p>
          Temperatura Minima: 
          <span>{formatTemperature(weather.main.temp_min)}&deg;C</span>
        </p>
      </div>
    </div>
  );
}
