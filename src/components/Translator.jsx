import { useState } from "react";
import axios from "axios";
function Translator() {
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");

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

  return (
    <div>
      <div>
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="">French</option>
          {/* Add more language options here */}
        </select>
      </div>
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button onClick={translateText}>Translate</button>
      {translation && (
        <div>
          <h3>Translation:</h3>
          <p>{translation}</p>
        </div>
      )}
    </div>
  );
}
export default Translator;
