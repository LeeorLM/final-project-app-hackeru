// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const MangaProfileComponent = (props) => {
  const handleProfileClick = (ev) => {
    ev.stopPropagation();
  };

  // const handleLikeClick = () => {
  //   props.onLike(props._id);
  // };

  // const handleLikeBtn = () => {
  //   const _id = props._id;
  //   axios
  //     .put("/manga/like/" + _id)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleCancelClick = () => {
    props.onCancelShow();
  };
  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <div className="center-absolute" onClick={handleProfileClick}>
        <h1 className="adminTitle mb-2 display-f justify-center">{props.manga_title}</h1>
        <div className="card ">
          <div className="row gap-2">
            <div className="col-5-xl col-12-lg">
              <img src={props.manga_image} className="card-img rounded-start" alt={props.manga_title} />
            </div>
            <div className="col-7-xl col-12-lg">
              <h5 className="card-title">
                <span className="bold">Title: </span> {props.manga_title}
              </h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="bold">Type: </span> {props.type}
                </li>
                <li className="list-group-item">
                  <span className="bold">Manga Background: </span>
                  <br />
                  {props.manga_background}
                </li>
                <li className="list-group-item">
                  <span className="bold">Story Description: </span>
                  <br />
                  {props.story_description}
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="list-group col-6-md col-12-xs">
              <li className="list-group-item">
                <span className="bold">Story By: </span>
                {props.story_by}
              </li>
              <li className="list-group-item">
                <span className="bold">Art By: </span>
                {props.art_by}
              </li>
              <li className="list-group-item">
                <span className="bold">Chapters: </span>
                {props.chapters}
              </li>
              <li className="list-group-item">
                <span className="bold">Volumes: </span>
                {props.volumes}
              </li>
            </div>
            <div className="list-group col-6-md col-12-xs">
              <li className="list-group-item">
                <span className="bold">Status: </span>
                {props.manga_status}
              </li>
              <li className="list-group-item">
                <span className="bold">Published: </span>
                {props.published}
              </li>
              <li className="list-group-item">
                <span className="bold">Serialization: </span>
                {props.serialization}
              </li>
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
    </div>
  );
};

export default MangaProfileComponent;
