/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CharacterProfileComponent from "../../../../components/public/character_info/single/character_profile.component";
import CharacterInfoTableComponent from "../../../../components/public/character_info/character_info_table.component";
import { Link, useSearchParams } from "react-router-dom";
import CharacterInfoCardComponent from "../../../../components/public/character_info/character_info_card.component";
import FindByLetterComponent from "../../../../components/public/findByLetter/findByLetter.component";
import ToolTipComponent from "../../../../components/toolTip/toolTip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const PublicCharacterItemsPage = () => {
  const [characterArr, setCharacterArr] = useState([]);
  const [unchangedCharacterArr, setUnchangedCharacterArr] = useState([]);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [userCharacterLiked, setUserCharacterLiked] = useState([]);
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
    getAllCharacters();
  }, []);

  const getUserData = () => {
    if (loggedIn === true) {
      if (userData.user_id !== null) {
        axios
          .get("/user/like/getliked/" + userData.user_id + "/liked_character")
          .then((res) => {
            setUserCharacterLiked(res.data.liked_character);
            console.log("data", res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        axios
          .get("/user/like/getliked/" + localUserId + "/liked_character")
          .then((res) => {
            setUserCharacterLiked(res.data.liked_character);
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
    const ktemp = cloneDeep(characterArr.find((item) => item._id === id));
    setDataToShow(ktemp);
    console.log(ktemp);
  };

  const handleCancelShow = () => {
    setDataToShow(null);
  };

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleUserLike = (_id, character_title) => {
    const character_name = character_title;
    const character_id = _id;
    const user_id = userData.user_id;

    const newLikedItem = {
      character_name,
      character_id,
      like: true,
    };

    console.log("newLikedItem", newLikedItem);

    axios
      .put("/user/like/character/" + user_id, newLikedItem)
      .then((res) => {
        let newArr = cloneDeep(res.data);
        setUserCharacterLiked(newArr[0].liked_character);
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
    const mostLikedArr = characterArr.filter((item) => item.likes > 1).sort(compareLikes);
    setCharacterArr(mostLikedArr);
    setListPageNumber(pageNumber);
    setSliceFirstNumber(firstNumber);
    setSliceSecondNumber(secondNumber);
    console.log("newMostLikedArr", mostLikedArr);
  };

  const getCharactersByLetter = (ev) => {
    const newCharacterArr = cloneDeep(unchangedCharacterArr);
    setSearchParams({ letter: ev });
    const characterByLetterArr = newCharacterArr.filter((item) => item.character_name[0].toLowerCase() === ev);
    setCharacterArr(characterByLetterArr);
    setListPageNumber(pageNumber);
    setSliceFirstNumber(firstNumber);
    setSliceSecondNumber(secondNumber);
  };

  const getAllCharacters = () => {
    axios
      .get("/character/getallcharacters")
      .then((res) => {
        console.log("characters", res.data);
        setCharacterArr(res.data);
        setUnchangedCharacterArr(res.data);
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
    if (characterArr.length < sliceSecondNumber) {
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
            <Link to="/all/characters/get/?type=allcharacters" onClick={getAllCharacters}>
              All Characters
            </Link>
          </li>
          <li>
            <Link to="/all/characters/get/?type=likes" onClick={getMostLikedList}>
              Most Liked
            </Link>
          </li>
        </ul>
      </div>

      <FindByLetterComponent findByletter={getCharactersByLetter} />

      <div className="topList container relative">
        <div className="tool-tip-postion">
          <ToolTipComponent>
            <p>Here you can browse through our database of characters and search by first letter. and chose what you like or browse for more info.</p>
          </ToolTipComponent>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Title</th>
              <th scope="col">options</th>
            </tr>
          </thead>
          <tbody>
            {userCharacterLiked &&
              characterArr
                .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
                .map((item, index) => (
                  <CharacterInfoTableComponent
                    index={index + indexListNumber}
                    key={item._id}
                    onMoreInfo={handleShowPopup}
                    onLike={handleUserLike}
                    array={userCharacterLiked}
                    {...item}
                  />
                ))}
          </tbody>
        </table>
        {characterArr.length < 1 && (
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
        {dataToShow && <CharacterProfileComponent onCancelShow={handleCancelShow} {...dataToShow} />}
      </div>
      <div className="container mobileList">
        <div className="row justify-center">
          {userCharacterLiked &&
            characterArr
              .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
              .map((item, index) => (
                <CharacterInfoCardComponent
                  index={index + 1}
                  key={item._id}
                  onSubmit={handleOnSubmit}
                  onMoreInfo={handleShowPopup}
                  onLike={handleUserLike}
                  array={userCharacterLiked}
                  {...item}
                />
              ))}
        </div>
        {characterArr.length < 1 && (
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
        {dataToShow && <CharacterProfileComponent onCancelShow={handleCancelShow} {...dataToShow} />}
      </div>
    </Fragment>
  );
};

export default PublicCharacterItemsPage;
