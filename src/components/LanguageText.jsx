// eslint-disable-next-line react/prop-types
function LanguageText({ value, text, onClick }) {
  return (
    <button
      onClick={() => onClick(value)}
      className="font-custom hover:bg-white hover:text-[#3355c7] text-white  max-md:bg-[#3355c7] max-md:rounded-lg hover:rounded-lg p-2 max-lg:text-sm"
      value={value}
    >
      {text}
    </button>
  );
}

export default LanguageText;
