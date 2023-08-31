function LanguageText({ value, text, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={` font-custom hover:bg-white hover:text-first text-white max-md:border-b max-md:border-white  max-md:bg-first hover:rounded-lg p-2 max-lg:text-sm `}
      value={value}
    >
      {text}
    </button>
  );
}

export default LanguageText;
