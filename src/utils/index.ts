export const formatTemperature = (temp: number):number => {
  return parseInt((temp - 273.15).toFixed(2));
};