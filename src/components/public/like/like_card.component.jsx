import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./like_card.component.scss";

const LikeCardComponent = ({ _id, onLikeDone, onCancelLike }) => {
  const handleLikeBtnClick = () => {
    onLikeDone(_id);
  };

  const handleCancelClick = () => {
    onCancelLike();
  };

  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <div className="center-absolute">
        <p>are you sure you want to like this card?</p>
        <div className="row">
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleLikeBtnClick}
            >
              Like
            </button>
          </div>
          <div className="col">
            <button
              type="submit"
              className="btn btn-danger w-100"
              onClick={handleCancelClick}
            >
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeCardComponent;
