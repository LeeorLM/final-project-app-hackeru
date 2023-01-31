import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const CharacterEditCardComponent = (props) => {
  const [character_name, setCharacterName] = useState(props.character_name);
  let [manga_name, setMangaName] = useState(props.manga_name);
  const [character_role, setCharacterRole] = useState(props.character_role);
  const [character_background, setCharacterBackground] = useState(props.character_background);
  const [character_image, setCharacterImage] = useState(props.character_image);

  const handleCharacterNameChange = (ev) => {
    setCharacterName(ev.target.value);
  };

  const handleMangaNameChange = (ev) => {
    setMangaName(ev.target.value);
  };

  const handleCharacterRoleChange = (ev) => {
    setCharacterRole(ev.target.value);
  };

  const handleCharacterBackgroundChange = (ev) => {
    setCharacterBackground(ev.target.value);
  };

  const handleCharacterImageChange = (ev) => {
    setCharacterImage(ev.target.value);
  };

  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleConfirmClick = () => {
    //! joi validation
    const mangaNameArr = manga_name.toString().split(",");
    manga_name = mangaNameArr;
    let dataToSend = {
      character_name,
      manga_name,
      character_role,
      character_background,
    };
    if (character_image) {
      dataToSend.character_image = character_image;
    }
    props.onEditDone(props._id, dataToSend);
  };

  const handleCancelClick = () => {
    props.onCancelEdit();
  };

  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <form onSubmit={handleSubmit} className="center-absolute" onClick={handleFormClick}>
        <h2 className="adminTitle mb-2 display-f justify-center">Edit Character</h2>
        <div className="mb-3">
          <label htmlFor="character_name" className="form-label">
            Character Name
          </label>
          <input type="text" className="form-control" id="character_name" value={character_name} onChange={handleCharacterNameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="manga_name" className="form-label">
            Manga Name
          </label>
          <input type="text" className="form-control" id="manga_name" value={manga_name} onChange={handleMangaNameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="character_role" className="form-label">
            Character Role
          </label>
          <input type="text" className="form-control" id="character_role" value={character_role} onChange={handleCharacterRoleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="character_background" className="form-label">
            Character Background
          </label>
          <input
            type="text"
            className="form-control"
            id="character_background"
            value={character_background}
            onChange={handleCharacterBackgroundChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="character_image" className="form-label">
            Character Image
          </label>
          <input type="text" className="form-control" id="character_image" value={character_image} onChange={handleCharacterImageChange} />
        </div>

        <div className="row">
          <div className="col-6-xs">
            <button type="submit" style={{ width: "100%" }} className="btn-primary" onClick={handleConfirmClick}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
          </div>
          <div className="col-6-xs">
            <button type="submit" style={{ width: "100%" }} className="btn-error ml-1" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CharacterEditCardComponent;
