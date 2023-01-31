import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookInfoCardComponent = ({ book_title, volume_name, manga_name, vol_no, book_image, _id, onMoreInfo, onLike, array }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const handleMoreInfoBtnClick = () => {
    onMoreInfo(_id);
  };
  const handleLikeBtnClick = () => {
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
    <div className="mobile-card col-6-sm col-12-sx">
      <div className="mobile-card-body">
        <img src={book_image} alt={book_title} />
        <div className="mobile-card-btn">
          <button className="btn-outlined-primary" onClick={handleMoreInfoBtnClick}>
            More
          </button>
          {loggedIn ? (
            array.find((i) => i.book_id === _id) ? (
              <button type="button" className="btn-primary">
                Liked
              </button>
            ) : (
              <button type="button" className="btn-outlined-primary" onClick={handleLikeBtnClick}>
                Like
              </button>
            )
          ) : (
            ""
          )}
          <button className="btn-outlined-primary">
            <Link to={"/single/book/" + _id + "/" + book_title + "/" + manga_name}>Go</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookInfoCardComponent;
