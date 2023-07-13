import axios from "axios";

async function GetApi(language, text, setTranslation) {
  const translateText = async () => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": language,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
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
      setTranslation(response.data[0].translations[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  await translateText();
}

export default GetApi;
