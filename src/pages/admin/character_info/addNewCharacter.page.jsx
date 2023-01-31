import axios from "axios";
import Joi from "joi-browser";
import { useState } from "react";
import addNewCharacterSchema from "../../../validations/character_info.validation";
import { toast } from "react-toastify";

const AddNewCharacterPage = () => {
  const [character_name, setCharacterName] = useState("");
  let [manga_name, setMangaName] = useState("");
  const [character_role, setCharacterRole] = useState("");
  const [character_background, setCharacterBackground] = useState("");
  const [character_image, setCharacterImage] = useState("");

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

  const handleSubmit = (ev) => {
    ev.preventDefault();
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
    const validatedValue = Joi.validate(
      {
        character_name,
        manga_name,
        character_role,
        character_background,
      },
      addNewCharacterSchema,
      { abortEarly: false }
    );
    if (dataToSend.character_image) {
      validatedValue.character_image = dataToSend.character_image;
    }
    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/character/addnewcharacter", dataToSend)
        .then((data) => {
          toast("new character has been added");
          console.log(data.data);
        })
        .catch((err) => {
          console.log("something went wrong axios", err);
        });
    }
  };

  return (
    <div className="container">
      <h1 className="adminTitle mt-1 display-f justify-center">Add New Character</h1>
      <div className="adminForm">
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn-primary adminBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCharacterPage;
