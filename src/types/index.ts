export interface Countries {
  name: string;
  code: string;
}
export type SearchType={
  city:string,
  country:string
}


export type Weather = {
  name:string
// Suggested code may be subject to a license. Learn more: ~LicenseLog:170776769.
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };

}