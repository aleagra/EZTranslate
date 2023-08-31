import axios from "axios";
import config from "../components/const";
async function GetApi(language, text, setTranslation) {
  const translateText = async () => {
    const options = {
      method: "POST",
      url: config.REACT_APP_TRANSLATE,
      params: {
        "to[0]": language,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
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
      const response = await axios.request(options);
      setTranslation(response.data[0].translations[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  await translateText();
}

export default GetApi;
