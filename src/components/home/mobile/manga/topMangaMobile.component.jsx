import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TopMangaMobileComponent = () => {
  const [mangaLikesArr, setMangaLikesArr] = useState([]);

  useEffect(() => {
    getMangaLikes();
    console.log("use effect");
  }, []);

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };

  const getMangaLikes = () => {
    axios
      .get("/manga/getallmangas")
      .then((res) => {
        console.log("mangas likes", res.data);
        setMangaLikesArr(res.data);
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
        <span className="titleName">Top Manga</span>
        <Link to="/all/mangas/get">
          <button className="btn-primary titleBtn">
            <b>More</b> {">"}
          </button>
        </Link>
      </div>
      <div className="listItems">
        {mangaLikesArr
          .filter((item) => item.likes > 1)
          .sort(compareLikes)
          .slice(0, 9)
          .map((item) => (
            <div className="item" key={item._id}>
              <img src={item.manga_image} className="itemImg" alt={item.manga_title} />
              <span className="itemName">{item.manga_title}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopMangaMobileComponent;
