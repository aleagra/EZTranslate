import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

function Debounce({ translateText, text }) {
  const [debouncedText, setDebouncedText] = useState(text);
  const debouncedTranslateText = debounce(translateText, 300);

  useEffect(() => {
    setDebouncedText(text);
  }, [text]);

  useEffect(() => {
    debouncedTranslateText();
    return () => {
      debouncedTranslateText.cancel();
    };
  }, [debouncedText, debouncedTranslateText]);

  return null;
}

export default Debounce;
