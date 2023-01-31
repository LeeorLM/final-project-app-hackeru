/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CharacterInfoCardComponent from "../../../components/public/character_info/character_info_card.component";
import CharacterInfoTableComponent from "../../../components/public/character_info/character_info_table.component";
import CharacterProfileComponent from "../../../components/public/character_info/single/character_profile.component";
import ToolTipComponent from "../../../components/toolTip/toolTip.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const SearchInCharacterPage = () => {
  const [characterArr, setCharacterArr] = useState([]);
  const [query, setQuery] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [userCharacterLiked, setUserCharacterLiked] = useState();
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
    getAllCharacters();
    console.log("use effect");
  }, []);

  const getUserData = () => {
    axios
      .get("/user/my/" + userData.user_id)
      .then((res) => {
        let userDataArray = cloneDeep(res.data);
        setUserCharacterLiked(userDataArray[0].liked_character);
        console.log("liked character", userDataArray[0].liked_character);
        console.log("data", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const filteredCharacter = useMemo(() => {
    return characterArr.filter((item) => {
      return item.character_name.toLowerCase().includes(query.toLowerCase());
    });
  }, [characterArr, query]);

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

  const getAllCharacters = () => {
    axios
      .get("/character/getallcharacters")
      .then((res) => {
        console.log("characters", res.data);
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

  const handleNextBtnClick = () => {
    if (filteredCharacter.length < sliceSecondNumber) {
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
            <p>Here you can search through our database of characters. and chose what you like or browse for more info.</p>
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
              filteredCharacter
                .filter((element, indx) => indx >= sliceFirstNumber && indx < sliceSecondNumber)
                .map((item, index) => (
                  <CharacterInfoTableComponent
                    index={index + 1}
                    key={item._id}
                    onMoreInfo={handleShowPopup}
                    onLike={handleUserLike}
                    array={userCharacterLiked}
                    {...item}
                  />
                ))}
          </tbody>
        </table>
        {filteredCharacter.length < 1 && (
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
      <div className="container mobileList relative">
        <div className="tool-tip-postion">
          <ToolTipComponent>
            <p>Here you can search through our database of characters. and chose what you like or browse for more info.</p>
          </ToolTipComponent>
        </div>
        <div className="row justify-center mt-3">
          {userCharacterLiked &&
            filteredCharacter
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
        {filteredCharacter.length < 1 && (
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

export default SearchInCharacterPage;
