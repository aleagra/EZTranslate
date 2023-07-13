import { useEffect } from "react";
import debounce from "lodash.debounce";

// eslint-disable-next-line react/prop-types
function Debounce({ translateText, text }) {
  const debouncedTranslateText = debounce(translateText, 300);

  useEffect(() => {
    debouncedTranslateText();
    return () => {
      debouncedTranslateText.cancel();
    };
  }, [text, debouncedTranslateText]);

  return null;
}

export default Debounce;
