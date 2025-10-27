import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import {es} from 'date-fns/locale/es';
registerLocale("es", es);

interface Props {
  onFechaChange: (fecha: Date | null) => void;
  obligatorio?: boolean;
}


function Calendario({ onFechaChange, obligatorio = true }: Props) {
    const [fecha, setFecha] = useState<Date | null>(new Date());
const [error, setError] = useState("");

useEffect(() => {
  onFechaChange(fecha);
  if (obligatorio && !fecha) {
    setError("La fecha es obligatoria");
  } else {
    setError("");
  }
}, [fecha , obligatorio, onFechaChange]);

  return (
    <>
    <DatePicker
      selected={fecha}
      onChange={(date) => setFecha(date)}
      dateFormat="dd 'de' MMMM 'de' yyyy"
      placeholderText="Seleccione una fecha"
      className={`date-picker ${error ? "input-error" : ""}`}
      locale="es"
    />
    {error && <span className="error">{error}</span>}
    </>
  );
}
export default Calendario;