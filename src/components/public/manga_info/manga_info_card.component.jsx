import axios from "axios";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MangaInfoCardComponent = ({ manga_title, type, manga_status, manga_image, _id, onMoreInfo, onLike, array }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const handleMoreInfoBtnClick = () => {
    onMoreInfo(_id, manga_title);
  };

  const handleLikeBtn = () => {
    onLike(_id, manga_title);
    axios
      .put("/manga/like/" + _id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mobile-card col-6-sm col-12-sx">
      <div className="mobile-card-body">
        <img src={manga_image} alt={manga_title} />
        <div className="mobile-card-btn">
          <button className="btn-outlined-primary" onClick={handleMoreInfoBtnClick}>
            More
          </button>
          {loggedIn ? (
            array.find((i) => i.manga_id === _id) ? (
              <button type="button" className="btn-primary">
                Liked
              </button>
            ) : (
              <button type="button" className="btn-outlined-primary" onClick={handleLikeBtn}>
                Like
              </button>
            )
          ) : (
            ""
          )}
          <button className="btn-outlined-primary">
            <Link to={"/single/manga/" + _id + "/" + manga_title}>Go</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MangaInfoCardComponent;
