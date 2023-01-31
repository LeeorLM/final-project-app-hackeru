import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const BookInfoTableComponent = ({ book_title, manga_name, volume_name, vol_no, book_image, likes, _id, onMoreInfo, onLike, index, array }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const handleMoreInfoBtnClick = () => {
    onMoreInfo(_id);
  };

  const handleLikeBtn = () => {
    onLike(_id, book_title);
    axios
      .put("/book/like/" + _id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr>
      <th className="indexNo" scope="row">
        {index}
      </th>
      <td>
        <div className="rankedItem">
          <p className="rankedImg">
            <img width="80" height="100" alt={book_title} src={book_image} />
          </p>
          <div className="rankedContent">
            <h3 className="titleTable">{volume_name}</h3>
            <span className="info">
              vol no. {vol_no} , {manga_name}
            </span>
            <br />
            <span className="likes">
              {likes} likes <FontAwesomeIcon style={{ color: "blue" }} icon={faThumbsUp} />
            </span>
          </div>
        </div>
      </td>
      <td className="options">
        <div>
          <button className=" btn-error" onClick={handleMoreInfoBtnClick}>
            More
          </button>
        </div>
        <br />
        <div>
          {loggedIn ? (
            array.find((i) => i.book_id === _id) ? (
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
          <Link to={"/single/book/" + _id + "/" + book_title + "/" + manga_name} className=" btn-info">
            Go
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default BookInfoTableComponent;
