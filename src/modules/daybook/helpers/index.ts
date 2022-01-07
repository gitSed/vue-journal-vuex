/** Own */
import { DayMonthYearType } from "../types";

const months: Array<string> = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const days: Array<string> = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const getDayMonthYear = (dateString: string): DayMonthYearType => {
  const date = new Date(dateString);

  return {
    day: date.getDate(),
    month: months[date.getMonth()],
    year: `${date.getFullYear()}, ${days[date.getDay()]}`,
  };
};
