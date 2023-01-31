/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MangaTop10Component = () => {
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
    <div className="top10">
      <div className="header">
        <h2 className="rankingTitle">Top Mangas</h2>
        <Link to="/all/mangas/get">
          <button className="btn-primary">
            <b>More</b>
          </button>
        </Link>
      </div>
      <ul className="ulWidth">
        {mangaLikesArr
          .filter((item) => item.likes > 1)
          .sort(compareLikes)
          .slice(0, 5)
          .map((item, index) => (
            <li className="rankedTopItem" key={item._id}>
              <span className="rank">{index + 1}</span>
              <p className="rankedImg">
                <img width="50" height="70" alt={item.manga_title} src={item.manga_image} />
              </p>
              <div className="rankedContent">
                <h3 className="title">{item.manga_title}</h3>
                <span className="info">
                  {item.type}, {item.volumes} vol, {item.chapters} chapters
                </span>
                <br />
                <span className="likes">{item.likes} likes</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MangaTop10Component;
