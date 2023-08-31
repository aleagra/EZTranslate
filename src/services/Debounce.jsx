import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

function Debounce({ callback, text }) {
  const [debouncedText, setDebouncedText] = useState(text);
  const debouncedTranslateText = debounce(callback, 300);

  useEffect(() => {
    setDebouncedText(text);
  }, [text]);

  useEffect(() => {
    debouncedTranslateText();
    return () => {
      debouncedTranslateText.cancel();
    };
  }, [debouncedText]);

  return null;
}

export default Debounce;
