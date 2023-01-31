import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import BookInfoCardComponent from "../../../../components/admin/book_info/admin/book_info_card.component";
import BookEditCardComponent from "../../../../components/admin/book_info/admin/edit/book_edit_card.component";
// import "./book_items.page.scss";
import DeleteCardComponent from "../../../../components/admin/delete/delete_card.component";

const BookItemsPage = () => {
  const [bookArr, setBookArr] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);

  useEffect(() => {
    getAllBooks();
    console.log("use effect");
  }, []);

  const handleDeleteBook = (id) => {
    // delete from server (database)
    // delete from cardsArr (state)
    axios
      .delete(`/book/${id}`)
      .then((res) => {
        let newBookArr = cloneDeep(bookArr);
        newBookArr = newBookArr.filter((item) => item._id !== id);
        setBookArr(newBookArr);
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
    let ktemp = cloneDeep(bookArr.find((item) => item._id === id));
    setDataToEdit(ktemp);
  };
  const handleShowDeletePopup = (id) => {
    // setShowEditPopup(true);
    let ktemp = cloneDeep(bookArr.find((item) => item._id === id));
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
      .put("/book/" + _id, updatedCard)
      .then((res) => {
        let newArrOfBook = cloneDeep(bookArr);
        let bookItemInd = newArrOfBook.findIndex((item) => item._id === _id);
        if (bookItemInd !== -1) {
          newArrOfBook[bookItemInd] = { ...cloneDeep(updatedCard), _id };
          setBookArr(newArrOfBook);
        }
        setDataToEdit(null);
      })
      .catch((err) => {
        toast("errot");
      });
  };

  const getAllBooks = () => {
    axios
      .get("/book/getallbooks")
      .then((res) => {
        console.log("books", res.data);
        setBookArr(res.data);
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
        <h1 className="adminTitle mt-1 display-f justify-center">Book Collection</h1>
        <div className="containCollectionAdmin mt-2">
          <div className="row mt-2 display-f justify-space-around">
            {bookArr.map((item) => (
              <BookInfoCardComponent onDelete={handleShowDeletePopup} onEdit={handleShowPopup} key={item._id} {...item} />
            ))}
          </div>
          {dataToEdit && <BookEditCardComponent onCancelEdit={handleCancelEdit} onEditDone={handleEditBook} {...dataToEdit} />}
          {dataToDelete && <DeleteCardComponent onCancelDelete={handleCancelDelete} onDeleteDone={handleDeleteBook} {...dataToDelete} />}
        </div>
      </div>
    </Fragment>
  );
};

export default BookItemsPage;
