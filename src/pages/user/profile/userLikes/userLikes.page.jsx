/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteCardComponent from "../../../../components/admin/delete/delete_card.component";
import CollapsibleComponent from "../../../../components/collapsible/collapsible.component";
import UserTableComponent from "../../../../components/user/table/userTable.component";

const UserLikesPage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [dataToDeleteMangaLike, setDataToDeleteMangaLike] = useState(null);
  const [dataToDeleteBookLike, setDataToDeleteBookLike] = useState(null);
  const [dataToDeleteCharacterLike, setDataToDeleteCharacterLike] = useState(null);
  const [mangaArr, setMangaArr] = useState([]);
  const [bookArr, setBookArr] = useState([]);
  const [characterArr, setCharacterArr] = useState([]);
  let firstNumber = 0;
  let secondNumber = 5;
  let pageNumber = 1;
  const [sliceFirstNumber, setSliceFirstNumber] = useState(firstNumber);
  const [sliceSecondNumber, setSliceSecondNumber] = useState(secondNumber);
  const [listPageNumber, setListPageNumber] = useState(pageNumber);

  let user_manga_liked;
  let user_book_liked;
  let user_character_liked;

  useEffect(() => {
    const localUserId = window.localStorage.getItem("user_id");
    getUserDatas(localUserId);
    getUserMangaLiked();
    getUserBookLiked();
    getUserCharacterLiked();
  }, []);

  const getUserDatas = (id) => {
    axios
      .get("/user/my2/" + id)
      .then((res) => {
        const arr = cloneDeep(res.data);
        user_manga_liked = arr.liked_manga.map((item) => item.manga_id);
        user_book_liked = arr.liked_book.map((item) => item.book_id);
        user_character_liked = arr.liked_character.map((item) => item.character_id);
        console.log("likedcharacter", user_character_liked);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleDeleteMangaLike = (id) => {
    axios
      .delete("/user/like/delete/manga/" + userData.user_id + "/" + id)
      .then((res) => {
        let newMangaLikeArr = cloneDeep(mangaArr);
        newMangaLikeArr = newMangaLikeArr.filter((item) => item._id !== id);
        setMangaArr(newMangaLikeArr);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("cannot delete the selected item", {
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
  const handleDeleteBookLike = (id) => {
    axios
      .delete("/user/like/delete/book/" + userData.user_id + "/" + id)
      .then((res) => {
        let newBookLikeArr = cloneDeep(bookArr);
        newBookLikeArr = newBookLikeArr.filter((item) => item._id !== id);
        setBookArr(newBookLikeArr);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("cannot delete the selected item", {
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
  const handleDeleteCharacterLike = (id) => {
    axios
      .delete("/user/like/delete/character/" + userData.user_id + "/" + id)
      .then((res) => {
        let newCharacterLikeArr = cloneDeep(characterArr);
        newCharacterLikeArr = newCharacterLikeArr.filter((item) => item._id !== id);
        setCharacterArr(newCharacterLikeArr);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("cannot delete the selected item", {
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

  const getUserMangaLiked = () => {
    axios
      .get("/manga/getallmangas")
      .then((res) => {
        const mangaLiked = res.data.filter((item) => user_manga_liked.includes(item._id));
        mangaLiked.sort((a, b) => {
          let nameA = a.manga_title.toLowerCase();
          let nameB = b.manga_title.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        // console.log("profile mangas", mangaLiked);
        setMangaArr(mangaLiked);
        console.log("dataManga", mangaLiked);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getUserBookLiked = () => {
    axios
      .get("/book/getallbooks")
      .then((res) => {
        const bookLiked = res.data.filter((item) => user_book_liked.includes(item._id));
        bookLiked.sort((a, b) => {
          let nameA = a.book_title.toLowerCase();
          let nameB = b.book_title.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        // console.log("profile mangas", bookLiked);
        setBookArr(bookLiked);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getUserCharacterLiked = () => {
    axios
      .get("/character/getallcharacters")
      .then((res) => {
        const characterLiked = res.data.filter((item) => user_character_liked.includes(item._id));
        characterLiked.sort((a, b) => {
          let nameA = a.character_name.toLowerCase();
          let nameB = b.character_name.toLowerCase();
          if (nameA < nameB)
            //sort string ascending
            return -1;
          if (nameA > nameB) return 1;
          return 0; //default return value (no sorting)
        });
        setCharacterArr(characterLiked);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getUrl = window.location.href;
  const getPrefixBySlash = getUrl.split("/");

  const handleNextBtnClick = () => {
    if (getPrefixBySlash[7] === "?type=manga") {
      if (mangaArr.length < sliceSecondNumber) {
        return;
      } else {
        setSliceFirstNumber(sliceFirstNumber + 5);
        setSliceSecondNumber(sliceSecondNumber + 5);
        setListPageNumber(listPageNumber + 1);
      }
    }
    if (getPrefixBySlash[7] === "?type=book") {
      if (bookArr.length < sliceSecondNumber) {
        return;
      } else {
        setSliceFirstNumber(sliceFirstNumber + 5);
        setSliceSecondNumber(sliceSecondNumber + 5);
        setListPageNumber(listPageNumber + 1);
      }
    }
    if (getPrefixBySlash[7] === "?type=character") {
      if (characterArr.length < sliceSecondNumber) {
        return;
      } else {
        setSliceFirstNumber(sliceFirstNumber + 5);
        setSliceSecondNumber(sliceSecondNumber + 5);
        setListPageNumber(listPageNumber + 1);
      }
    }
  };

  const handlePrevBtnClick = () => {
    if (sliceFirstNumber <= 0) {
      return;
    } else {
      setSliceFirstNumber(sliceFirstNumber - 5);
      setSliceSecondNumber(sliceSecondNumber - 5);
      setListPageNumber(listPageNumber - 1);
    }
  };

  const resetListPage = () => {
    if (listPageNumber > 1) {
      setListPageNumber(pageNumber);
      setSliceFirstNumber(firstNumber);
      setSliceSecondNumber(secondNumber);
    }
  };

  const handleShowDeleteMangaPopup = (id) => {
    // setShowEditPopup(true);
    let ktemp = cloneDeep(mangaArr.find((item) => item._id === id));
    setDataToDeleteMangaLike(ktemp);
  };
  const handleShowDeleteBookPopup = (id) => {
    // setShowEditPopup(true);
    let ktemp = cloneDeep(bookArr.find((item) => item._id === id));
    setDataToDeleteBookLike(ktemp);
  };
  const handleShowDeleteCharacterPopup = (id) => {
    // setShowEditPopup(true);
    let ktemp = cloneDeep(characterArr.find((item) => item._id === id));
    setDataToDeleteCharacterLike(ktemp);
  };

  const handleCancelDelete = () => {
    // setShowDeletePopup(false);
    setDataToDeleteMangaLike(null);
    setDataToDeleteBookLike(null);
    setDataToDeleteCharacterLike(null);
  };

  const tableHeadsArr = ["Index", "Image", "Name", "Link", "Delete"];

  const getMangaLiked = () => {
    if (getPrefixBySlash[7] === "?type=manga") {
      return (
        <Fragment>
          <UserTableComponent
            title="User Manga Liked"
            pageNumber={pageNumber}
            tableHeads={tableHeadsArr}
            array={mangaArr}
            category={"manga"}
            slice1Num={sliceFirstNumber}
            slice2Num={sliceSecondNumber}
            onDelete={handleShowDeleteMangaPopup}
            onPrev={handlePrevBtnClick}
            onNext={handleNextBtnClick}
          />
          {dataToDeleteMangaLike && (
            <DeleteCardComponent onCancelDelete={handleCancelDelete} onDeleteDone={handleDeleteMangaLike} {...dataToDeleteMangaLike} />
          )}
        </Fragment>
      );
    } else {
      return;
    }
  };

  const getBookLiked = () => {
    if (getPrefixBySlash[7] === "?type=book") {
      return (
        <Fragment>
          <UserTableComponent
            title="User Book Liked"
            pageNumber={pageNumber}
            tableHeads={tableHeadsArr}
            array={bookArr}
            category={"book"}
            slice1Num={sliceFirstNumber}
            slice2Num={sliceSecondNumber}
            onDelete={handleShowDeleteBookPopup}
            onPrev={handlePrevBtnClick}
            onNext={handleNextBtnClick}
          />
          {dataToDeleteBookLike && (
            <DeleteCardComponent onCancelDelete={handleCancelDelete} onDeleteDone={handleDeleteBookLike} {...dataToDeleteBookLike} />
          )}
        </Fragment>
      );
    } else {
      return;
    }
  };

  const getCharacterLiked = () => {
    if (getPrefixBySlash[7] === "?type=character") {
      return (
        <Fragment>
          <UserTableComponent
            title="User Character Liked"
            pageNumber={pageNumber}
            tableHeads={tableHeadsArr}
            array={characterArr}
            category={"character"}
            slice1Num={sliceFirstNumber}
            slice2Num={sliceSecondNumber}
            onDelete={handleShowDeleteCharacterPopup}
            onPrev={handlePrevBtnClick}
            onNext={handleNextBtnClick}
          />

          {dataToDeleteCharacterLike && (
            <DeleteCardComponent onCancelDelete={handleCancelDelete} onDeleteDone={handleDeleteCharacterLike} {...dataToDeleteCharacterLike} />
          )}
        </Fragment>
      );
    } else {
      return;
    }
  };

  return (
    <Fragment>
      <div className="col-3-md col-12-xs">
        <CollapsibleComponent open title="User Liked">
          <ul className="list-group">
            <li className="mb-2 mr-2">
              <Link to="/user/profile/info/mylikes/?type=manga" className="btn-primary" onClick={resetListPage}>
                Manga Liked
              </Link>
            </li>
            <li className="mb-2 mr-2">
              <Link to="/user/profile/info/mylikes/?type=book" className="btn-primary" onClick={resetListPage}>
                Book Liked
              </Link>
            </li>
            <li className="mb-2 mr-2">
              <Link to="/user/profile/info/mylikes/?type=character" className="btn-primary" onClick={resetListPage}>
                Character Liked
              </Link>
            </li>
          </ul>
        </CollapsibleComponent>
      </div>
      <div className="col-9-md col-12-xs">
        {getMangaLiked()}
        {getBookLiked()}
        {getCharacterLiked()}
      </div>
    </Fragment>
  );
};

export default UserLikesPage;
