import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const DeleteCardComponent = ({ _id, onDeleteDone, onCancelDelete }) => {
  const handleDeleteBtnClick = () => {
    onDeleteDone(_id);
  };

  const handleCancelClick = () => {
    onCancelDelete();
  };

  return (
    <div className="center-wrapper-error" onClick={handleCancelClick}>
      <div className="center-absolute-error">
        <p>are you sure you want to delete this card?</p>
        <div className="row mt-2">
          <div className="col-6-xs">
            <button type="submit" className="btn-error" onClick={handleDeleteBtnClick}>
              Delete
            </button>
          </div>
          <div className="col-6-xs">
            <button type="submit" className="btn-yellow" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCardComponent;
