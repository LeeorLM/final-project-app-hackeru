import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const CharacterInfoTableComponent = ({
  character_name,
  manga_name,
  character_role,
  character_image,
  likes,
  _id,
  onMoreInfo,
  onLike,
  index,
  array,
}) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const handleMoreInfoBtnClick = () => {
    onMoreInfo(_id);
  };

  const handleLikeBtn = () => {
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
    <tr>
      <th className="indexNo" scope="row">
        {index}
      </th>
      <td>
        <div className="rankedItem">
          <p className="rankedImg">
            <img width="80" height="100" alt={character_name} src={character_image} />
          </p>
          <div className="rankedContent">
            <h3 className="titleTable">{character_name}</h3>
            <span className="info">
              {character_role}, {manga_name[0]}
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
          <button className="btn-error" onClick={handleMoreInfoBtnClick}>
            More
          </button>
        </div>
        <br />
        <div>
          {loggedIn ? (
            array.find((i) => i.character_id === _id) ? (
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
          <Link to={"/single/character/" + _id + "/" + character_name + "/" + manga_name[0]} className="btn-info">
            Go
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default CharacterInfoTableComponent;
