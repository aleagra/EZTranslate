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
      const response = await axios.request(options);
      setDetector(response.data[0].language);
    } catch (error) {
      console.error(error);
    }
  };

  await detectLanguage();
}

export default Detector;
