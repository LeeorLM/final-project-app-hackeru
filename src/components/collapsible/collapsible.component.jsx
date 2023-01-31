import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const CollapsibleComponent = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState((open = false));

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="row">
        <button
          type="button"
          className="collapse-btn display-f align-center"
          onClick={handleFilterOpening}
        >
          <span className="collapse-title">{title}</span>
          {!isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      </div>
      {isOpen && <div className="p-1 content">{children}</div>}
    </div>
  );
};

export default CollapsibleComponent;
