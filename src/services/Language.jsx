import axios from "axios";
async function Language() {
  const GetLanguage = async () => {
    const options = {
      method: "GET",
      url: "https://microsoft-translator-text.p.rapidapi.com/languages",
      params: {
        "api-version": "3.0",
      },
      headers: {
        "X-RapidAPI-Key": "285c59d0b8msh46372bba5f66c71p1194bbjsn26a8dd6a017b",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Llama a la función GetLanguage para que se ejecute
  await GetLanguage();
}

export default Language;
