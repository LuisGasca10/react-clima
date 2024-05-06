import axios from "axios";
import { z } from "zod";
// import { number, object, string, Output, parse } from "valibot";
import { SearchType } from "../types";
import { useMemo, useState } from "react";

// Type Guards
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_min === "number" &&
//     typeof (weather as Weather).main.feels_like === "number"
//   );
// }

// zod
const Weather = z.object({
  name: z.string(),

  main: z.object({
    temp_max: z.number(),
    temp: z.number(),
    temp_min: z.number(),
    feels_like: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

//Valibot
// const waetherSchema = object({
//   name: string(),
//   main: object({
//     temp_max: number(),
//     temp: number(),
//     temp_min: number(),
//     feels_like: number(),
//   }),
// });

// type Weather = Output<typeof waetherSchema>;

// valibot

const initialState = {
  name: "",
  main: { feels_like: 0, temp: 0, temp_max: 0, temp_min: 0 },
};

export const useWeather = () => {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const fetchWaether = async (search: SearchType) => {
    setIsLoading(true);
    setWeather(initialState);
    setNotFound(false);
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${
        search.city
      },${search.country}&appid=${import.meta.env.VITE_API_KEY}`;

      const { data } = await axios(geoURL);
      // Comprobar si existe
      if (!data[0]) {
        setNotFound(true);
        return;
      }
      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      //   const { data: weatherData } = await axios(weatherURL);

      //   type guards
      //   const resuslt = isWeatherResponse(weatherData);

      //   if (resuslt) {
      //     console.log(weatherData.name);
      //   }else{
      //     console.log('Respuesta mal formada')
      //   }7

      //zod
      const { data: weatherData } = await axios(weatherURL);
      const result = Weather.safeParse(weatherData);

      if (result.success) {
        setWeather(result.data);
      }

      // Valibot
      //   const { data: weatherData } = await axios(weatherURL);
      //   const result = parse(waetherSchema, weatherData);
      //   console.log({ result });

      //   if (result) {
      //     console.log(result.name)
      //   }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => Boolean(weather.name), [weather]);

  return {
    weather,
    isLoading,
    notFound,
    fetchWaether,
    hasWeatherData,
  };
};
