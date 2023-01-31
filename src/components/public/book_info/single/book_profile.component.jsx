// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const BookProfileComponent = (props) => {
  const handleProfileClick = (ev) => {
    ev.stopPropagation();
  };

  const handleCancelClick = () => {
    props.onCancelShow();
  };
  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <div className="center-absolute" onClick={handleProfileClick}>
        <h1 className="adminTitle mb-2 display-f justify-center">{props.book_title}</h1>
        <div className="card">
          <div className="row">
            <div className="col-5-xl col-12-xs">
              <img src={props.book_image} className="card-img rounded-start" alt={props.book_title} />
            </div>
            <div className="col-7-xl col-12-xs">
              <div className="card-body ">
                <h5 className="card-title">
                  <span className="bold">Manga: </span> {props.manga_name}
                </h5>
                <div className="row">
                  <div className="list-group col-6-xs">
                    <li className="list-group-item ">
                      <span className="bold">Title: </span> {props.volume_name}
                    </li>
                  </div>
                  <div className="list-group col-6-xs">
                    <li className="list-group-item ">
                      <span className="bold">Volume No. : </span> {props.vol_no}
                    </li>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="bold">Volume Description: </span>
                    <br />
                    {props.book_description}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="list-group col-6-md col-12-xs">
              <li className="list-group-item">
                <span className="bold">Retail Value: </span>
                {props.retail_value}
              </li>
              <li className="list-group-item">
                <span className="bold">Collection Value: </span>
                {props.collection_value}
              </li>
            </div>
            <div className="list-group col-6-md col-12-xs">
              <li className="list-group-item">
                <span className="bold">Publisher: </span>
                {props.publisher}
              </li>
              <li className="list-group-item">
                <span className="bold">ISBN: </span>
                {props.isbn}
              </li>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <button type="submit" className="btn-error col-12-xs" onClick={handleCancelClick}>
            <FontAwesomeIcon icon={faBan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookProfileComponent;
