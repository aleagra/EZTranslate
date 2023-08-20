import axios from "axios";
import { Languages } from "./Languages";

async function Detector(text, setDetector) {
  const detectarIdioma = async () => {
    const opciones = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/Detect",
      params: {
        "api-version": "3.0",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "5a42cacf00msh6b85df453f74aaep10ad5ajsn6ef9bddc4f5c",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
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
