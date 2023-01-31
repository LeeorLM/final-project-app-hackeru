import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const CharacterProfileComponent = (props) => {
  const handleProfileClick = (ev) => {
    ev.stopPropagation();
  };

  const handleCancelClick = () => {
    props.onCancelShow();
  };
  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <div className="center-absolute" onClick={handleProfileClick}>
        <h1 className="adminTitle mb-2 display-f justify-center">{props.character_name}</h1>
        <div className="card">
          <div className="row">
            <div className="col-5-xl col-12-xs">
              <img src={props.character_image} className="card-img " alt={props.character_name} />
            </div>
            <div className="col-7-xl col-12-xs">
              <h5 className="card-title">
                <span className="bold">Name: </span> {props.character_name}
              </h5>
              <ul className="list-group ">
                <li className="list-group-item">
                  <span className="bold">Manga: </span> {props.manga_name.join(", ")}
                </li>
                <li className="list-group-item">
                  <span className="bold">Character Background: </span>
                  <br />
                  {props.character_background}
                </li>
              </ul>
            </div>
          </div>
          <div className="list-group">
            <li className="list-group-item">
              <span className="bold">Role: </span>
              {props.character_role}
            </li>
            <li className="list-group-item">
              <span className="bold">Created At: </span>
              {props.created_at}
            </li>
            <li className="list-group-item">
              <span className="bold">Updated At: </span>
              {props.updated_at}
            </li>
          </div>
        </div>
        <br />
        <br />
        <div className="row ">
          <button type="submit" className="btn-error col-12-xs" onClick={handleCancelClick}>
            <FontAwesomeIcon icon={faBan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterProfileComponent;
