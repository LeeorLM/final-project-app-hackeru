import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TopCharacterMobileComponent = () => {
  const [characterLikesArr, setCharacterLikesArr] = useState([]);

  useEffect(() => {
    getMangaLikes();
    console.log("use effect");
  }, []);

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };

  const getMangaLikes = () => {
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
    <div className="topItems">
      <div className="rowTitle">
        <span className="titleName">Top Character</span>
        <Link to="/all/characters/get">
          <button className="btn-primary titleBtn">
            <b>More</b> {">"}
          </button>
        </Link>
      </div>
      <div className="listItems">
        {characterLikesArr
          .filter((item) => item.likes > 1)
          .sort(compareLikes)
          .slice(0, 9)
          .map((item, idx) => (
            <div className="item" key={item._id}>
              <img src={item.character_image} className="itemImg" alt={item.character_name} />
              <span>{}</span>
              <span className="itemName">{item.character_name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopCharacterMobileComponent;
