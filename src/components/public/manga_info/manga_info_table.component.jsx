import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const MangaInfoTableComponent = ({
  manga_title,
  type,
  manga_status,
  volumes,
  chapters,
  likes,
  manga_image,
  _id,
  onMoreInfo,
  onLike,
  index,
  array,
}) => {
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
    <tr>
      <th className="indexNo">{index}</th>
      <td>
        <div className="rankedItem">
          <p className="rankedImg">
            <img width="80" height="100" alt={manga_title} src={manga_image} />
          </p>
          <div className="rankedContent">
            <h3 className="titleTable">{manga_title}</h3>
            <span className="info">
              {type}, {volumes} vol, {chapters} chapters
            </span>
            <br />
            <span className="likes">
              {likes} likes <FontAwesomeIcon style={{ color: "blue" }} icon={faThumbsUp} />
            </span>
          </div>
        </div>
      </td>
      <td>
        <div>
          <button className="btn-error" onClick={handleMoreInfoBtnClick}>
            More
          </button>
        </div>
        <br />
        <div>
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
        </div>
        <br />
        <div>
          <Link to={"/single/manga/" + _id + "/" + manga_title} className="btn-info">
            Go
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default MangaInfoTableComponent;

{
  /* <button type="button" className="btn-green">
  Liked
</button>; */
}
