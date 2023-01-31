/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookInfoCardComponent from "../../../../components/public/book_info/book_info_card.component";
import BookInfoTableComponent from "../../../../components/public/book_info/book_info_table.component";
import BookProfileComponent from "../../../../components/public/book_info/single/book_profile.component";
import FindByLetterComponent from "../../../../components/public/findByLetter/findByLetter.component";
import ToolTipComponent from "../../../../components/toolTip/toolTip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const PublicBookItemsPage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [bookArr, setBookArr] = useState([]);
  const [unchangedBookArr, setUnchangedBookArr] = useState([]);
  const [userBookLiked, setUserBookLiked] = useState([]);
  const [, setSearchParams] = useSearchParams();
  let firstNumber = 0;
  let secondNumber = 10;
  let pageNumber = 1;
  let indxNumber = 1;
  const [indexListNumber, setIndexListNumber] = useState(indxNumber);
  const [sliceFirstNumber, setSliceFirstNumber] = useState(firstNumber);
  const [sliceSecondNumber, setSliceSecondNumber] = useState(secondNumber);
  const [listPageNumber, setListPageNumber] = useState(pageNumber);
  const localUserId = window.localStorage.getItem("user_id");

  const [dataToShow, setDataToShow] = useState(null);

  useEffect(() => {
    getUserData();
    getAllBooks();
  }, []);

  const getUserData = () => {
    if (loggedIn === true) {
      if (userData.user_id !== null) {
        axios
          .get("/user/like/getliked/" + userData.user_id + "/liked_book")
          .then((res) => {
            setUserBookLiked(res.data.liked_book);
            console.log("data", res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        axios
          .get("/user/like/getliked/" + localUserId + "/liked_book")
          .then((res) => {
            setUserBookLiked(res.data.liked_book);
            console.log("data", res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } else {
      return;
    }
  };

  const handleShowPopup = (id) => {
    const ktemp = cloneDeep(bookArr.find((item) => item._id === id));
    setDataToShow(ktemp);
  };

  const handleCancelShow = () => {
    setDataToShow(null);
  };

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleUserLike = (_id, book_title, ev) => {
    const book_name = book_title;
    const book_id = _id;
    const user_id = userData.user_id;

    const newLikedItem = {
      book_name,
      book_id,
      like: true,
    };

    console.log("newLikedItem", newLikedItem);

    axios
      .put("/user/like/book/" + user_id, newLikedItem)
      .then((res) => {
        let newArr = cloneDeep(res.data);
        setUserBookLiked(newArr[0].liked_book);
        if (res.data.status !== "fail") {
          toast("succesfuly liked item");
        }
        console.log("new data", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };

  const getMostLikedList = () => {
    const mostLikedArr = bookArr.filter((item) => item.likes > 1).sort(compareLikes);
    setBookArr(mostLikedArr);
    setListPageNumber(pageNumber);
    setSliceFirstNumber(firstNumber);
    setSliceSecondNumber(secondNumber);
    console.log("newMostLikedArr", mostLikedArr);
  };

  const getBooksByLetter = (ev) => {
    const newBookArr = cloneDeep(unchangedBookArr);
    setSearchParams({ letter: ev });
    const bookByLetterArr = newBookArr.filter((item) => item.book_title[0].toLowerCase() === ev);
    setBookArr(bookByLetterArr);
    setListPageNumber(pageNumber);
    setSliceFirstNumber(firstNumber);
    setSliceSecondNumber(secondNumber);
  };

  const getAllBooks = () => {
    axios
      .get("/book/getallbooks")
      .then((res) => {
        console.log("books", res.data);
        setBookArr(res.data);
        setUnchangedBookArr(res.data);
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

  const handleNextBtnClick = () => {
    if (bookArr.length < sliceSecondNumber) {
      return;
    } else {
      setSliceFirstNumber(sliceFirstNumber + 10);
      setSliceSecondNumber(sliceSecondNumber + 10);
      setListPageNumber(listPageNumber + 1);
      setIndexListNumber(indexListNumber + 10);
    }
  };

  const handlePrevBtnClick = () => {
    if (sliceFirstNumber <= 0) {
      return;
    } else {
      setSliceFirstNumber(sliceFirstNumber - 10);
      setSliceSecondNumber(sliceSecondNumber - 10);
      setListPageNumber(listPageNumber - 1);
      setIndexListNumber(indexListNumber - 10);
    }
  };

  return (
    <Fragment>
      <div>
        <ul className="collectionNav">
          <li>
            <Link to="/all/books/get/?type=allmanga" onClick={getAllBooks}>
              All Books
            </Link>
          </li>
          <li>
            <Link to="/all/books/get/?type=likes" onClick={getMostLikedList}>
              Most Liked
            </Link>
          </li>
        </ul>
      </div>

      <FindByLetterComponent findByletter={getBooksByLetter} />

      <div className="topList container relative">
        <div className="tool-tip-postion">
          <ToolTipComponent>
            <p>Here you can browse through our database of books and search by first letter. and chose what you like or browse for more info.</p>
          </ToolTipComponent>
        </div>
        <br />
        <table className="table table-bordered tableBgc">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Title</th>
              <th scope="col">options</th>
            </tr>
          </thead>
          <tbody>
            {userBookLiked &&
              bookArr
                .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
                .map((item, index) => (
                  <BookInfoTableComponent
                    index={index + indexListNumber}
                    key={item._id}
                    onMoreInfo={handleShowPopup}
                    onLike={handleUserLike}
                    array={userBookLiked}
                    {...item}
                  />
                ))}
          </tbody>
        </table>
        {bookArr.length < 1 && (
          <div className="notFound">
            <p>No Characters Found Sorry...</p>
          </div>
        )}
        <div className="mt-2 display-f justify-space-around align-center">
          <button className="btn-outlined-primary" onClick={handlePrevBtnClick}>
            <FontAwesomeIcon icon={faBackward} /> Prev
          </button>
          <span>{listPageNumber}</span>
          <button className="btn-outlined-primary" onClick={handleNextBtnClick}>
            Next <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
        {dataToShow && <BookProfileComponent onCancelShow={handleCancelShow} {...dataToShow} />}
      </div>
      <div className="container mobileList">
        <div className="row justify-center">
          {userBookLiked &&
            bookArr
              .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
              .map((item, index) => (
                <BookInfoCardComponent
                  index={index + 1}
                  key={item._id}
                  onSubmit={handleOnSubmit}
                  onMoreInfo={handleShowPopup}
                  onLike={handleUserLike}
                  array={userBookLiked}
                  {...item}
                />
              ))}
        </div>
        {bookArr.length < 1 && (
          <div className="notFound">
            <p>No Characters Found Sorry...</p>
          </div>
        )}
        <div className="mt-2 display-f justify-space-around align-center">
          <button className="btn-outlined-primary" onClick={handlePrevBtnClick}>
            <FontAwesomeIcon icon={faBackward} /> Prev
          </button>
          <span>{listPageNumber}</span>
          <button className="btn-outlined-primary" onClick={handleNextBtnClick}>
            Next <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
        {dataToShow && <BookProfileComponent onCancelShow={handleCancelShow} {...dataToShow} />}
      </div>
    </Fragment>
  );
};

export default PublicBookItemsPage;
