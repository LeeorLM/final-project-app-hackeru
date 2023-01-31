import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CharacterTopComponent = () => {
  const [characterLikesArr, setCharacterLikesArr] = useState([]);

  useEffect(() => {
    getCharacterLikes();
    console.log("use effect");
  }, []);

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };

  const getCharacterLikes = () => {
    axios
      .get("/character/getallcharacters")
      .then((res) => {
        console.log("characters likes", res.data);
        setCharacterLikesArr(res.data);
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
    <div className="top10">
      <div className="header">
        <h2 className="rankingTitle">Top Characters</h2>
        <Link to="/all/characters/get">
          <button className="btn-primary">
            <b>More</b>
          </button>
        </Link>
      </div>
      <ul className="ulWidth">
        {characterLikesArr
          .filter((item) => item.likes > 1)
          .sort(compareLikes)
          .slice(0, 5)
          .map((item, index) => (
            <li className="rankedTopItem" key={item._id}>
              <span className="rank">{index + 1}</span>
              <p className="rankedImg">
                <img width="50" height="70" src={item.character_image} alt={item.character_name} />
              </p>
              <div className="rankedContent">
                <h3 className="title">{item.character_name}</h3>
                <span className="likes">{item.likes} likes</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CharacterTopComponent;
