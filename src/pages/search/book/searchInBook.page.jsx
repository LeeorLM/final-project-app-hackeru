/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BookInfoCardComponent from "../../../components/public/book_info/book_info_card.component";
import BookInfoTableComponent from "../../../components/public/book_info/book_info_table.component";
import BookProfileComponent from "../../../components/public/book_info/single/book_profile.component";
import ToolTipComponent from "../../../components/toolTip/toolTip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const SearchInBookPage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [bookArr, setBookArr] = useState([]);
  const [query, setQuery] = useState("");
  const [userBookLiked, setUserBookLiked] = useState();
  let firstNumber = 0;
  let secondNumber = 10;
  let pageNumber = 1;
  let indxNumber = 1;
  const [sliceFirstNumber, setSliceFirstNumber] = useState(firstNumber);
  const [sliceSecondNumber, setSliceSecondNumber] = useState(secondNumber);
  const [listPageNumber, setListPageNumber] = useState(pageNumber);
  const [indexListNumber, setIndexListNumber] = useState(indxNumber);
  const [dataToShow, setDataToShow] = useState(null);
  const localUserId = window.localStorage.getItem("user_id");

  useEffect(() => {
    getAllBooks();
    getUserData();
    console.log("use effect");
    console.log("use filter", bookArr);
    console.log(loggedIn);
  }, []);

  const getUserData = () => {
    if (loggedIn === true) {
      if (userData.user_id !== undefined) {
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

  const filteredBook = useMemo(() => {
    return bookArr.filter((item) => {
      return item.book_title.toLowerCase().includes(query.toLowerCase());
    });
  }, [bookArr, query]);

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
        console.log("new data", res);
      })
      .catch((err) => {
        console.log("err", err);
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

  const handleNextBtnClick = () => {
    if (filteredBook.length < sliceSecondNumber) {
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
      <div className="container display-f justify-center">
        <input
          className="search mt-1"
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setListPageNumber(pageNumber);
            setSliceFirstNumber(firstNumber);
            setSliceSecondNumber(secondNumber);
          }}
        />
      </div>
      <br />
      <br />
      <div className="topList container relative">
        <div className="tool-tip-postion">
          <ToolTipComponent>
            <p>Here you can search through our database of books. and chose what you like or browse for more info.</p>
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
              filteredBook
                .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
                .map((item, index) => (
                  <BookInfoTableComponent
                    index={index + 1}
                    key={item._id}
                    onMoreInfo={handleShowPopup}
                    onLike={handleUserLike}
                    array={userBookLiked}
                    {...item}
                  />
                ))}
          </tbody>
        </table>
        {filteredBook.length < 1 && (
          <div className="notFound">
            <p>No Books Found Sorry...</p>
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
      <div className="container mobileList relative">
        <div className="tool-tip-postion">
          <ToolTipComponent>
            <p>Here you can search through our database of books. and chose what you like or browse for more info.</p>
          </ToolTipComponent>
        </div>
        <div className="row justify-center mt-3">
          {userBookLiked &&
            filteredBook
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
        {filteredBook.length < 1 && (
          <div className="notFound">
            <p>No Books Found Sorry...</p>
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

export default SearchInBookPage;
