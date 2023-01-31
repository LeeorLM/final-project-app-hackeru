import React from "react";

const ToolTipComponent = ({ children }) => {
  return (
    <div className="tool-tip">
      <div className="tool-tip-icon">?</div>
      <span className="tool-tip-text">{children}</span>
    </div>
  );
};

export default ToolTipComponent;
