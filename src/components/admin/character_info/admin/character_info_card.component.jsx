import "./character_info_card.component.scss";

const CharacterInfoCardComponent = ({ character_name, manga_name, character_role, character_image, _id, onDelete, onEdit }) => {
  const handleDeleteBtnClick = () => {
    onDelete(_id);
  };
  const handleEditBtnClick = () => {
    onEdit(_id);
  };
  return (
    <div className="card mb-3 col-4-lg col-6-md col-12-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={character_image} className="characterImg" alt={character_name} />
        </div>
        <div className="col-md-8">
          <div className="card-body padCharacter">
            <h5 className="card-title adminWidthForCard">{character_name}</h5>
            <ul className="list-group adminWidthForCard">
              <li className="list-group-item">{manga_name[0]}</li>
              <li className="list-group-item">{character_role}</li>
            </ul>
            <div className="row mt-1">
              <div className="col-6-xs">
                <button className="btn-primary" onClick={handleEditBtnClick}>
                  Edit
                </button>
              </div>
              <div className="col-6-xs">
                <button className="btn-error" onClick={handleDeleteBtnClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfoCardComponent;
