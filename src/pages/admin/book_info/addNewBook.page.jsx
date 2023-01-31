import axios from "axios";
import Joi from "joi-browser";
import { useState } from "react";
import { toast } from "react-toastify";
import addNewBookSchema from "../../../validations/book_info.validation";

const AddNewBookPage = () => {
  const [book_title, setBookTitle] = useState("");
  const [manga_name, setMangaName] = useState("");
  const [volume_name, setVolumeName] = useState("");
  const [vol_no, setVolNumber] = useState("");
  const [book_description, setBookDescription] = useState("");
  const [retail_value, setRetailValue] = useState("");
  const [collection_value, setCollectionValue] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setISBN] = useState("");
  const [book_image, setBookImage] = useState("");

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

  const handleSubmit = (ev) => {
    ev.preventDefault();
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
    const validatedValue = Joi.validate(
      {
        book_title,
        manga_name,
        volume_name,
        vol_no,
        book_description,
        retail_value,
        collection_value,
        publisher,
        isbn,
      },
      addNewBookSchema,
      { abortEarly: false }
    );
    if (dataToSend.book_image) {
      validatedValue.book_image = dataToSend.book_image;
    }
    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/book/addnewbook", dataToSend)
        .then((data) => {
          toast("new book has been added");
          console.log(data.data);
        })
        .catch((err) => {
          console.log("something went wrong axios", err);
        });
    }
  };

  return (
    <div className="container">
      <h1 className="adminTitle mt-1 display-f justify-center">Add New Book</h1>
      <div className="adminForm  ">
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-3 col-12-xs">
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
          <div className="mb-3">
            <label htmlFor="manga_name" className="form-label">
              Manga Name
            </label>
            <input type="text" className="form-control" id="manga_name" value={manga_name} onChange={handleMangaNameChange} />
          </div>
          <div className="row display-f align-center justify-center">
            <div className="mb-3 col-6-md col-12-xs">
              <label htmlFor="volume_name" className="form-label">
                Volume Name
              </label>
              <input type="text" className="form-control" id="volume_name" value={volume_name} onChange={handleVolumeNameChange} />
            </div>
            <div className="mb-3 col-6-md col-12-xs">
              <label htmlFor="vol_no" className="form-label">
                Volume Number
              </label>
              <input type="number" className="form-control" id="vol_no" value={vol_no} onChange={handleVolNumberChange} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="book_description" className="form-label">
              Book Description
            </label>
            <input type="text" className="form-control" id="book_description" value={book_description} onChange={handleBookDescriptionChange} />
          </div>
          <div className="row">
            <div className="mb-3 col-6-md col-12-xs">
              <label htmlFor="retail_value" className="form-label">
                Retail Value
              </label>
              <input type="number" className="form-control" id="retail_value" value={retail_value} onChange={handleRetailValueChange} />
            </div>
            <div className="mb-3 col-6-md col-12-xs">
              <label htmlFor="collection_value" className="form-label">
                Collection Value
              </label>
              <input type="number" className="form-control" id="collection_value" value={collection_value} onChange={handleCollectionValueChange} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Publisher
            </label>
            <input type="text" className="form-control" id="publisher" value={publisher} onChange={handlePublisherChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input type="text" className="form-control" id="isbn" value={isbn} onChange={handleISBNChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="book_image" className="form-label">
              Book Image
            </label>
            <input type="text" className="form-control" id="book_image" value={book_image} onChange={handleBookImageChange} />
          </div>

          <button type="submit" className="btn-primary adminBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewBookPage;
