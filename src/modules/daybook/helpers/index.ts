/** Third-Party */
import axios from "axios";

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

export const uploadImage = async (file: Blob): Promise<string | null> => {
  if (!file) return null;

  try {
    const formData = new FormData();

    formData.append("upload_preset", "vue-course");
    formData.append("file", file);

    const url = "https://api.cloudinary.com/v1_1/smooth-image-api/image/upload";

    const { data } = await axios.post(url, formData);

    return data.secure_url as string;
  } catch (err) {
    console.error("Error al cargar la imagen, revisar logs");
    console.log(err);

    return null;
  }
};
