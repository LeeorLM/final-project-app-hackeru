import React from "react";

const FindByLetterComponent = ({ findByletter, letter }) => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  function handleFindByLetterClick(ev) {
    letter = ev.target.innerText.toLowerCase();
    findByletter(letter);
  }

  return (
    <div className="container mt-2">
      <ul className="row align-center justify-space-between mb-1">
        {alphabet.map((item, index) => (
          <li className="search-by-letter" key={index + 1} onClick={handleFindByLetterClick}>
            {item}
          </li>
        ))}
      </ul>
      <hr className="" />
    </div>
  );
};

export default FindByLetterComponent;
