import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import DeleteCardComponent from "../../../../components/admin/delete/delete_card.component";
import MangaEditCardComponent from "../../../../components/admin/manga_info/admin/edit/manga_edit_card.component";
import MangaInfoCardComponent from "../../../../components/admin/manga_info/admin/manga_info_card.component";
import "./manga_items.page.scss";

const MangaItemsPage = () => {
  const [mangaArr, setMangaArr] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);

  useEffect(() => {
    getAllMangas();
    console.log("use effect");
  }, []);

  const handleDeleteBook = (id) => {
    // delete from server (database)
    // delete from cardsArr (state)
    axios
      .delete(`/manga/${id}`)
      .then((res) => {
        let newMangaArr = cloneDeep(mangaArr);
        newMangaArr = newMangaArr.filter((item) => item._id !== id);
        setMangaArr(newMangaArr);
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
    // setShowEditPopup(true);
    let ktemp = cloneDeep(mangaArr.find((item) => item._id === id));
    setDataToEdit(ktemp);
  };
  const handleShowDeletePopup = (id) => {
    // setShowEditPopup(true);
    let ktemp = cloneDeep(mangaArr.find((item) => item._id === id));
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

  const handleEditBook = (_id, updatedCard) => {
    console.log("updatedCard", updatedCard);
    axios
      .put("/manga/" + _id, updatedCard)
      .then((res) => {
        let newArrOfManga = cloneDeep(mangaArr);
        let mangaItemInd = newArrOfManga.findIndex((item) => item._id === _id);
        if (mangaItemInd !== -1) {
          newArrOfManga[mangaItemInd] = { ...cloneDeep(updatedCard), _id };
          setMangaArr(newArrOfManga);
        }
        setDataToEdit(null);
      })
      .catch((err) => {
        toast("error");
      });
  };

  const getAllMangas = () => {
    axios
      .get("/manga/getallmangas")
      .then((res) => {
        console.log("mangas", res.data);
        setMangaArr(res.data);
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
        <h1 className="adminTitle mt-1 display-f justify-center">Manga Collection</h1>
        <div className="containCollectionAdmin mt-2">
          <div className="row mt-2 display-f justify-space-around">
            {mangaArr.map((item) => (
              <MangaInfoCardComponent onDelete={handleShowDeletePopup} onEdit={handleShowPopup} key={item._id} {...item} />
            ))}
          </div>
          {dataToEdit && <MangaEditCardComponent onCancelEdit={handleCancelEdit} onEditDone={handleEditBook} {...dataToEdit} />}
          {dataToDelete && <DeleteCardComponent onCancelDelete={handleCancelDelete} onDeleteDone={handleDeleteBook} {...dataToDelete} />}
        </div>
      </div>
    </Fragment>
  );
};

export default MangaItemsPage;
