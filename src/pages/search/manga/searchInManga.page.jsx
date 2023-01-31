/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MangaInfoCardComponent from "../../../components/public/manga_info/manga_info_card.component";
import MangaInfoTableComponent from "../../../components/public/manga_info/manga_info_table.component";
import MangaProfileComponent from "../../../components/public/manga_info/single/manga_profile.component";
import ToolTipComponent from "../../../components/toolTip/toolTip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const SearchInMangaPage = () => {
  const [mangaArr, setMangaArr] = useState([]);
  const [query, setQuery] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [userMangaLiked, setUserMangaLiked] = useState();
  let firstNumber = 0;
  let secondNumber = 10;
  let pageNumber = 1;
  let indxNumber = 1;
  const [sliceFirstNumber, setSliceFirstNumber] = useState(firstNumber);
  const [sliceSecondNumber, setSliceSecondNumber] = useState(secondNumber);
  const [listPageNumber, setListPageNumber] = useState(pageNumber);
  const [indexListNumber, setIndexListNumber] = useState(indxNumber);
  const [dataToShow, setDataToShow] = useState(null);

  useEffect(() => {
    getUserData();
    getAllMangas();
    console.log("use effect");
  }, []);

  const getUserData = () => {
    axios
      .get("/user/my/" + userData.user_id)
      .then((res) => {
        let userDataArray = cloneDeep(res.data);
        setUserMangaLiked(userDataArray[0].liked_manga);
        console.log("liked manga", userDataArray[0].liked_manga);
        console.log("data", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const filteredManga = useMemo(() => {
    return mangaArr.filter((item) => {
      return item.manga_title.toLowerCase().includes(query.toLowerCase());
    });
  }, [mangaArr, query]);

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

  const handleUserLike = (_id, manga_title, ev) => {
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
        console.log("new data", res);
      })
      .catch((err) => {
        console.log("err", err);
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

  const handleNextBtnClick = () => {
    if (filteredManga.length < sliceSecondNumber) {
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
            <p>Here you can search through our database of mangas. and chose what you like or browse for more info.</p>
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
            {userMangaLiked &&
              filteredManga
                .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
                .map((item, index) => (
                  <MangaInfoTableComponent
                    index={index + 1}
                    key={item._id}
                    indexArr={index}
                    onSubmit={handleOnSubmit}
                    onMoreInfo={handleShowPopup}
                    onLike={handleUserLike}
                    array={userMangaLiked}
                    {...item}
                  />
                ))}
          </tbody>
        </table>
        {filteredManga.length < 1 && (
          <div className="notFound">
            <p>No Mangas Found Sorry...</p>
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
      <div className="container mobileList relative">
        <div className="tool-tip-postion">
          <ToolTipComponent>
            <p>Here you can search through our database of mangas. and chose what you like or browse for more info.</p>
          </ToolTipComponent>
        </div>
        <div className="row justify-center mt-3">
          {userMangaLiked &&
            filteredManga
              .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
              .map((item, index) => (
                <MangaInfoCardComponent
                  index={index + 1}
                  key={item._id}
                  onSubmit={handleOnSubmit}
                  onMoreInfo={handleShowPopup}
                  onLike={handleUserLike}
                  array={userMangaLiked}
                  {...item}
                />
              ))}
        </div>
        {filteredManga.length < 1 && (
          <div className="notFound">
            <p>No Mangas Found Sorry...</p>
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

export default SearchInMangaPage;
