import axios from "axios";

async function Detector(text, setDetector) {
  const detectLanguage = async () => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/Detect",
      params: {
        "api-version": "3.0",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "285c59d0b8msh46372bba5f66c71p1194bbjsn26a8dd6a017b",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: [
        {
          Text: text,
        },
      ],
    };

    try {
      const response = await axios.request(options);
      console.log(response.data[0].language);
      setDetector(response.data[0].language);
    } catch (error) {
      console.error(error);
    }
  };

  await detectLanguage();
}

export default Detector;
