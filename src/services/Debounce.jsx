import { useEffect } from "react";
import debounce from "lodash.debounce";

function Debounce({ translateText, text }) {
  const debouncedTranslateText = debounce(translateText, 300);

  useEffect(() => {
    debouncedTranslateText();
    return () => {
      debouncedTranslateText.cancel();
    };
  }, [text]);

  return null;
}

export default Debounce;
