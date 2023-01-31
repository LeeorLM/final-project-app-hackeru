import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import DeleteCardComponent from "../../../../components/admin/delete/delete_card.component";
import CharacterEditCardComponent from "../../../../components/admin/character_info/admin/edit/character_edit_card.component";
import CharacterInfoCardComponent from "../../../../components/admin/character_info/admin/character_info_card.component";
import "./character_items.page.scss";

const MangaItemsPage = () => {
  const [characterArr, setCharacterArr] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);

  useEffect(() => {
    getAllCharacters();
    console.log("use effect");
  }, []);

  const handleDeleteCharacter = (id) => {
    // delete from server (database)
    // delete from cardsArr (state)
    axios
      .delete(`/character/${id}`)
      .then((res) => {
        let newCharacterArr = cloneDeep(characterArr);
        newCharacterArr = newCharacterArr.filter((item) => item._id !== id);
        setCharacterArr(newCharacterArr);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("cannot delete the selected card", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleShowPopup = (id) => {
    let ktemp = cloneDeep(characterArr.find((item) => item._id === id));
    setDataToEdit(ktemp);
  };

  const handleShowDeletePopup = (id) => {
    let ktemp = cloneDeep(characterArr.find((item) => item._id === id));
    setDataToDelete(ktemp);
  };

  const handleCancelEdit = () => {
    // setShowEditPopup(false);
    setDataToEdit(null);
  };

  const handleCancelDelete = () => {
    // setShowDeletePopup(false);
    setDataToDelete(null);
  };

  const handleEditCharacter = (_id, updatedCard) => {
    console.log("updatedCard", updatedCard);
    axios
      .put("/character/" + _id, updatedCard)
      .then((res) => {
        let newArrOfCharacter = cloneDeep(characterArr);
        let characterItemInd = newArrOfCharacter.findIndex((item) => item._id === _id);
        if (characterItemInd !== -1) {
          newArrOfCharacter[characterItemInd] = { ...cloneDeep(updatedCard), _id };
          setCharacterArr(newArrOfCharacter);
        }
        setDataToEdit(null);
      })
      .catch((err) => {
        toast("error");
      });
  };

  const getAllCharacters = () => {
    axios
      .get("/character/getallcharacters")
      .then((res) => {
        console.log("mangas", res.data);
        setCharacterArr(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error("cannot get cards", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="adminTitle mt-1 display-f justify-center">Character Collection</h1>
        <div className="containCollectionAdmin mt-2">
          <div className="row mt-2 display-f justify-space-around">
            {characterArr.map((item) => (
              <CharacterInfoCardComponent onEdit={handleShowPopup} onDelete={handleShowDeletePopup} key={item._id} {...item} />
            ))}
          </div>
          {dataToEdit && <CharacterEditCardComponent onCancelEdit={handleCancelEdit} onEditDone={handleEditCharacter} {...dataToEdit} />}
          {dataToDelete && <DeleteCardComponent onCancelDelete={handleCancelDelete} onDeleteDone={handleDeleteCharacter} {...dataToDelete} />}
        </div>
      </div>
    </Fragment>
  );
};

export default MangaItemsPage;
