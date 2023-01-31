import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CharacterInfoCardComponent = ({ character_name, manga_name, character_role, character_image, _id, onMoreInfo, onLike, array }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const handleMoreInfoBtnClick = () => {
    onMoreInfo(_id);
  };
  const handleLikeBtnClick = () => {
    onLike(_id, character_name);
    axios
      .put("/character/like/" + _id)
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
        <img src={character_image} alt={character_name} />
        <div className="mobile-card-btn">
          <button className="btn-outlined-primary" onClick={handleMoreInfoBtnClick}>
            More
          </button>
          {loggedIn ? (
            array.find((i) => i.character_id === _id) ? (
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
            <Link to={"/single/character/" + _id + "/" + character_name + "/" + manga_name[0]}>Go</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfoCardComponent;
