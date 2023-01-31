import React from "react";
import { Link } from "react-router-dom";

const RelatedComponent = ({ title, index, image, type, origin, _id, onMore }) => {
  const handleMoreInfoClick = () => {
    onMore(_id, title);
  };
  return (
    <li className="list-group-item">
      <div className="display-f align-center justify-space-between">
        <div className="display-f align-center">
          <span className="list-item-label mr-2">{index}: </span>
          <img width="50" height="70" src={image} alt={title} />
        </div>
        <div>{title}</div>
        <div>
          <button className="btn-primary mr-1" onClick={handleMoreInfoClick}>
            More
          </button>
          {type === "character" || type === "book" ? (
            <Link to={"/single/" + type + "/" + _id + "/" + title + "/" + origin} className="btn-info">
              Go
            </Link>
          ) : (
            <Link to={"/single/" + type + "/" + _id + "/" + title} className="btn-info">
              Go
            </Link>
          )}
        </div>
      </div>
    </li>
  );
};

export default RelatedComponent;
