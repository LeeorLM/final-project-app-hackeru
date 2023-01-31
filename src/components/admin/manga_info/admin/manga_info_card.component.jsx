import "./manga_info_card.component.scss";

const MangaInfoCardComponent = ({ manga_title, type, manga_status, manga_image, _id, onDelete, onEdit }) => {
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
          <img src={manga_image} className="mangaImg rounded-start" alt={manga_image} />
        </div>
        <div className="col-md-8">
          <div className="card-body padManga">
            <h5 className="card-title adminWidthForCard">{manga_title}</h5>
            <ul className="list-group adminWidthForCard">
              <li className="list-group-item">{type}</li>
              <li className="list-group-item">{manga_status}</li>
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

export default MangaInfoCardComponent;
