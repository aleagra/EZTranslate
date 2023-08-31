import axios from "axios";
import { Languages } from "./Languages";
import config from "../components/const";

async function Detector(text, setDetector) {
  const detectarIdioma = async () => {
    const opciones = {
      method: "POST",
      url: config.REACT_APP_DETECTOR,
      params: {
        "api-version": "3.0",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": config.REACT_APP_KEY,
        "X-RapidAPI-Host": config.REACT_APP_HOST,
      },
      data: [
        {
          Text: text,
        },
      ],
    };

    try {
      const respuesta = await axios.request(opciones);
      const codigoIdiomaDetectado = respuesta.data[0].language;
      const idiomaDetectado = Languages.find(
        (lang) => lang.language === codigoIdiomaDetectado
      );
      const nombreIdiomaDetectado = idiomaDetectado
        ? idiomaDetectado.name
        : "Desconocido";

      setDetector(nombreIdiomaDetectado);
    } catch (error) {
      console.error(error);
    }
  };

  await detectarIdioma();
}

export default Detector;
