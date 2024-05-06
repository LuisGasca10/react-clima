import { ChangeEvent, useState, FormEvent } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../types";
import { Alert } from "../Alert/Alert";

interface Props {
 fetchWaether: (search: SearchType) => Promise<void>
}


export const Form = ({fetchWaether}:Props) => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    setAlert('');
    fetchWaether(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        {alert&&(<Alert>{alert}</Alert>)}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          onChange={handleChange}
          type="text"
          value={search.city}
          name="city"
          id="city"
          placeholder="Ciudad"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País:</label>
        <select
          name="country"
          id="country"
          onChange={handleChange}
          value={search.country}
        >
          <option value="">--Seleccione un País ---</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" className={styles.submit} value="Consultar Clima" />
    </form>
  );
};
