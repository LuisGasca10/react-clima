import styles from'./App.module.css';
import { Alert } from './components/Alert/Alert';
import { Form } from './components/Form/Form';
import { Loader } from './components/Loader/Loader';
import { WeatherDetails } from './components/WeatherDetails/WeatherDetails';
import { useWeather } from './hooks/useWeather';


function App() {

  const {fetchWaether,weather, hasWeatherData,isLoading,notFound} = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWaether={fetchWaether} />
        {isLoading && <Loader/>}
        {hasWeatherData && <WeatherDetails weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App
