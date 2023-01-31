import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const BookEditCardComponent = (props) => {
  const [book_title, setBookTitle] = useState(props.book_title);
  const [manga_name, setMangaName] = useState(props.manga_name);
  const [volume_name, setVolumeName] = useState(props.volume_name);
  const [vol_no, setVolNumber] = useState(props.vol_no);
  const [book_description, setBookDescription] = useState(props.book_description);
  const [retail_value, setRetailValue] = useState(props.retail_value);
  const [collection_value, setCollectionValue] = useState(props.collection_value);
  const [publisher, setPublisher] = useState(props.publisher);
  const [isbn, setISBN] = useState(props.isbn);
  const [book_image, setBookImage] = useState(props.book_image);

  const handleBookTitleChange = (ev) => {
    setBookTitle(ev.target.value);
  };

  const handleMangaNameChange = (ev) => {
    setMangaName(ev.target.value);
  };

  const handleVolumeNameChange = (ev) => {
    setVolumeName(ev.target.value);
  };

  const handleVolNumberChange = (ev) => {
    setVolNumber(ev.target.value);
  };

  const handleBookDescriptionChange = (ev) => {
    setBookDescription(ev.target.value);
  };

  const handleRetailValueChange = (ev) => {
    setRetailValue(ev.target.value);
  };

  const handleCollectionValueChange = (ev) => {
    setCollectionValue(ev.target.value);
  };

  const handlePublisherChange = (ev) => {
    setPublisher(ev.target.value);
  };

  const handleISBNChange = (ev) => {
    setISBN(ev.target.value);
  };

  const handleBookImageChange = (ev) => {
    setBookImage(ev.target.value);
  };

  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleConfirmClick = () => {
    //! joi validation
    let dataToSend = {
      book_title,
      manga_name,
      volume_name,
      vol_no,
      book_description,
      retail_value,
      collection_value,
      publisher,
      isbn,
    };
    if (book_image) {
      dataToSend.book_image = book_image;
    }
    props.onEditDone(props._id, dataToSend);
  };

  const handleCancelClick = () => {
    props.onCancelEdit();
  };

  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <form onSubmit={handleSubmit} className="center-absolute" onClick={handleFormClick}>
        <h2 className="adminTitle mb-2 display-f justify-center">Edit Book</h2>
        <div className="mb-3">
          <label htmlFor="book_title" className="form-label">
            Book Title
          </label>
          <input
            type="text"
            className="form-control"
            id="book_title"
            aria-describedby="bookTitleHelp"
            value={book_title}
            onChange={handleBookTitleChange}
          />
          <div id="bookTitleHelp" className="form-text">
            book title must be ("manga name" + "volume number")
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-4-md col-12-xs">
            <label htmlFor="manga_name" className="form-label">
              Manga Name
            </label>
            <input type="text" className="form-control" id="manga_name" value={manga_name} onChange={handleMangaNameChange} />
          </div>
          <div className="mb-3 col-4-md col-12-xs">
            <label htmlFor="volume_name" className="form-label">
              Volume Name
            </label>
            <input type="text" className="form-control" id="volume_name" value={volume_name} onChange={handleVolumeNameChange} />
          </div>
          <div className="mb-3 col-4-md col-12-xs">
            <label htmlFor="vol_no" className="form-label">
              Volume Number
            </label>
            <input type="number" className="form-control" id="vol_no" value={vol_no} onChange={handleVolNumberChange} />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-8-md col-12-xs">
            <label htmlFor="book_description" className="form-label">
              Book Description
            </label>
            <input type="text" className="form-control" id="book_description" value={book_description} onChange={handleBookDescriptionChange} />
          </div>
          <div className="mb-3 col-4-md col-12-xs">
            <label htmlFor="publisher" className="form-label">
              Publisher
            </label>
            <input type="text" className="form-control" id="publisher" value={publisher} onChange={handlePublisherChange} />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-4-md col-12-xs">
            <label htmlFor="retail_value" className="form-label">
              Retail Value
            </label>
            <input type="number" className="form-control" id="retail_value" value={retail_value} onChange={handleRetailValueChange} />
          </div>
          <div className="mb-3 col-4-md col-12-xs">
            <label htmlFor="collection_value" className="form-label">
              Collection Value
            </label>
            <input type="number" className="form-control" id="collection_value" value={collection_value} onChange={handleCollectionValueChange} />
          </div>
          <div className="mb-3 col-4-md col-12-xs">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input type="text" className="form-control" id="isbn" value={isbn} onChange={handleISBNChange} />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="book_image" className="form-label">
            Book Image
          </label>
          <input type="text" className="form-control" id="book_image" value={book_image} onChange={handleBookImageChange} />
        </div>
        <div className="row">
          <div className="col-6-xs">
            <button type="submit" style={{ width: "100%" }} className="btn-primary" onClick={handleConfirmClick}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
          </div>
          <div className="col-6-xs">
            <button type="submit" style={{ width: "100%" }} className="btn-error ml-1" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookEditCardComponent;
