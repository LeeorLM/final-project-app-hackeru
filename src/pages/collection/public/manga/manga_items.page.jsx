/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import MangaInfoCardComponent from "../../../../components/public/manga_info/manga_info_card.component";
import MangaProfileComponent from "../../../../components/public/manga_info/single/manga_profile.component";
import { useSelector } from "react-redux";
import MangaInfoTableComponent from "../../../../components/public/manga_info/manga_info_table.component";
import { Link, useSearchParams } from "react-router-dom";
import FindByLetterComponent from "../../../../components/public/findByLetter/findByLetter.component";
import ToolTipComponent from "../../../../components/toolTip/toolTip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const PublicMangaItemsPage = () => {
  const [mangaArr, setMangaArr] = useState([]);
  const [unchangedMangaArr, setUnchangedMangaArr] = useState([]);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [userMangaLiked, setUserMangaLiked] = useState([]);
  const [, setSearchParams] = useSearchParams();
  let firstNumber = 0;
  let secondNumber = 10;
  let pageNumber = 1;
  let indxNumber = 1;
  const [sliceFirstNumber, setSliceFirstNumber] = useState(firstNumber);
  const [sliceSecondNumber, setSliceSecondNumber] = useState(secondNumber);
  const [listPageNumber, setListPageNumber] = useState(pageNumber);
  const [indexListNumber, setIndexListNumber] = useState(indxNumber);
  const localUserId = window.localStorage.getItem("user_id");

  const [dataToShow, setDataToShow] = useState(null);

  useEffect(() => {
    // if (loggedIn) {
    //   getUserData();
    // }
    getUserData();
    getAllMangas();
    console.log("use effect");
  }, []);

  const getUserData = () => {
    if (loggedIn === true) {
      if (userData.user_id !== null) {
        axios
          .get("/user/like/getliked/" + userData.user_id + "/liked_manga")
          .then((res) => {
            setUserMangaLiked(res.data.liked_manga);
            console.log("data", res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        axios
          .get("/user/like/getliked/" + localUserId + "/liked_manga")
          .then((res) => {
            setUserMangaLiked(res.data.liked_manga);
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
    const ktemp = cloneDeep(mangaArr.find((item) => item._id === id));
    setDataToShow(ktemp);
  };

  const handleCancelShow = () => {
    setDataToShow(null);
  };
  const handleOnSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleUserLike = (_id, manga_title) => {
    const manga_name = manga_title;
    const manga_id = _id;
    const user_id = userData.user_id;

    const newLikedItem = {
      manga_name,
      manga_id,
      like: true,
    };

    console.log("newLikedItem", newLikedItem);

    axios
      .put("/user/like/manga/" + user_id, newLikedItem)
      .then((res) => {
        let newArr = cloneDeep(res.data);
        setUserMangaLiked(newArr[0].liked_manga);
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
    const mostLikedArr = mangaArr.filter((item) => item.likes > 1).sort(compareLikes);
    setMangaArr(mostLikedArr);
    setListPageNumber(pageNumber);
    setSliceFirstNumber(firstNumber);
    setSliceSecondNumber(secondNumber);
    console.log("newMostLikedArr", mostLikedArr);
  };

  const getMangasByLetter = (ev) => {
    const newMangaArr = cloneDeep(unchangedMangaArr);
    setSearchParams({ letter: ev });
    const mangaByLetterArr = newMangaArr.filter((item) => item.manga_title[0].toLowerCase() === ev);
    setMangaArr(mangaByLetterArr);
    setListPageNumber(pageNumber);
    setSliceFirstNumber(firstNumber);
    setSliceSecondNumber(secondNumber);
  };

  const getAllMangas = () => {
    axios
      .get("/manga/getallmangas")
      .then((res) => {
        console.log("mangas", res.data);
        setMangaArr(res.data);
        setUnchangedMangaArr(res.data);
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
    if (mangaArr.length < sliceSecondNumber) {
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
            <Link to="/all/mangas/get/?type=allmanga" onClick={getAllMangas}>
              All Manga
            </Link>
          </li>
          <li>
            <Link to="/all/mangas/get?type=likes" onClick={getMostLikedList}>
              Most Liked
            </Link>
          </li>
        </ul>
      </div>

      <FindByLetterComponent findByletter={getMangasByLetter} />

      <div className="topList container relative">
        <div className="tool-tip-postion">
          <ToolTipComponent>
            <p>Here you can browse through our database of mangas and search by first letter. and chose what you like or browse for more info.</p>
          </ToolTipComponent>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Title</th>
              <th>options</th>
            </tr>
          </thead>
          <tbody>
            {mangaArr
              .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
              .map((item, index) => (
                <MangaInfoTableComponent
                  index={index + indexListNumber}
                  key={item._id}
                  onMoreInfo={handleShowPopup}
                  onLike={handleUserLike}
                  array={userMangaLiked}
                  {...item}
                />
              ))}
          </tbody>
        </table>
        {mangaArr.length < 1 && (
          <div className="notFound">
            <p>No Manga Found Sorry...</p>
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
        {dataToShow && <MangaProfileComponent onCancelShow={handleCancelShow} {...dataToShow} />}
      </div>
      <div className="container mobileList">
        <div className="row justify-center">
          {userMangaLiked &&
            mangaArr
              .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
              .map((item, index) => (
                <MangaInfoCardComponent
                  index={index + indexListNumber}
                  key={item._id}
                  onSubmit={handleOnSubmit}
                  onMoreInfo={handleShowPopup}
                  onLike={handleUserLike}
                  array={userMangaLiked}
                  {...item}
                />
              ))}
        </div>
        {mangaArr.length < 1 && (
          <div className="notFound">
            <p>No Manga Found Sorry...</p>
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
        {dataToShow && <MangaProfileComponent onCancelShow={handleCancelShow} {...dataToShow} />}
      </div>
    </Fragment>
  );
};

export default PublicMangaItemsPage;
