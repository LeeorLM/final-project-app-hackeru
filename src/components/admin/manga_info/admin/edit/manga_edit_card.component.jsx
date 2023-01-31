import { useState } from "react";
// import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const MangaEditCardComponent = (props) => {
  const [manga_title, setMangaTitle] = useState(props.manga_title);
  const [manga_background, setMangaBackground] = useState(props.manga_background);
  const [story_description, setStoryDescription] = useState(props.story_description);
  const [story_by, setStoryBy] = useState(props.story_by);
  const [art_by, setArtBy] = useState(props.art_by);
  const [volumes, setVolumes] = useState(props.volumes);
  const [chapters, setChapters] = useState(props.chapters);
  const [published, setPublished] = useState(props.published);
  let [genres, setGenres] = useState(props.genres);
  const [manga_status, setMangaStatus] = useState(props.manga_status);
  const [manga_image, setMangaImage] = useState(props.manga_image);
  const [serialization, SetSerialization] = useState(props.serialization);

  const handleMangaTitleChange = (ev) => {
    setMangaTitle(ev.target.value);
  };

  const handleMangaBackgroundChange = (ev) => {
    setMangaBackground(ev.target.value);
  };

  const handleStoryDescriptionChange = (ev) => {
    setStoryDescription(ev.target.value);
  };

  const handleStoryByChange = (ev) => {
    setStoryBy(ev.target.value);
  };

  const handleArtByChange = (ev) => {
    setArtBy(ev.target.value);
  };

  const handleVolumesChange = (ev) => {
    setVolumes(ev.target.value);
  };

  const handleChaptersChange = (ev) => {
    setChapters(ev.target.value);
  };

  const handlePublishedChange = (ev) => {
    setPublished(ev.target.value);
  };

  const handleGenresChange = (ev) => {
    setGenres(ev.target.value);
  };

  const handleMangaStatusChange = (ev) => {
    setMangaStatus(ev.target.value);
  };

  const handleSerializationChange = (ev) => {
    SetSerialization(ev.target.value);
  };

  const handleMangaImageChange = (ev) => {
    setMangaImage(ev.target.value);
  };

  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleConfirmClick = () => {
    //! joi validation
    const genresArr = genres.toString().split(",");
    genres = genresArr;
    let dataToSend = {
      manga_title,
      manga_background,
      story_description,
      story_by,
      art_by,
      volumes,
      chapters,
      published,
      genres,
      manga_status,
      serialization,
    };
    if (manga_image) {
      dataToSend.manga_image = manga_image;
    }
    props.onEditDone(props._id, dataToSend);
  };

  const handleCancelClick = () => {
    props.onCancelEdit();
  };

  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <form onSubmit={handleSubmit} className="center-absolute" onClick={handleFormClick}>
        <h2 className="adminTitle mb-2 display-f justify-center">Edit Manga</h2>
        <div className="mb-3">
          <label htmlFor="manga_title" className="form-label">
            Manga Title
          </label>
          <input type="text" className="form-control" id="manga_title" value={manga_title} onChange={handleMangaTitleChange} />
        </div>

        <div className="row">
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="manga_background" className="form-label">
              Manga Background
            </label>
            <input type="text" className="form-control" id="manga_background" value={manga_background} onChange={handleMangaBackgroundChange} />
          </div>
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="story_description" className="form-label">
              Story Description
            </label>
            <input type="text" className="form-control" id="story_description" value={story_description} onChange={handleStoryDescriptionChange} />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="story_by" className="form-label">
              Story By
            </label>
            <input type="text" className="form-control" id="story_by" value={story_by} onChange={handleStoryByChange} />
          </div>
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="art_by" className="form-label">
              Art By
            </label>
            <input type="text" className="form-control" id="art_by" value={art_by} onChange={handleArtByChange} />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="volumes" className="form-label">
              Volumes
            </label>
            <input type="number" className="form-control" id="volumes" value={volumes} onChange={handleVolumesChange} />
          </div>
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="chapters" className="form-label">
              Chapters
            </label>
            <input type="number" className="form-control" id="chapters" value={chapters} onChange={handleChaptersChange} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="genres" className="form-label">
            Genres
          </label>
          <input type="text" className="form-control" id="genres" value={genres} onChange={handleGenresChange} />
        </div>
        <div className="row">
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="published" className="form-label">
              Published
            </label>
            <input type="text" className="form-control" id="published" value={published} onChange={handlePublishedChange} />
          </div>
          <div className="mb-3 col-6-md col-12-xs">
            <label htmlFor="manga_status" className="form-label">
              Manga Status
            </label>
            <input type="text" className="form-control" id="manga_status" value={manga_status} onChange={handleMangaStatusChange} />
          </div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="serialization" className="form-label">
            Serialization
          </label>
          <input type="text" className="form-control" id="serialization" value={serialization} onChange={handleSerializationChange} />
        </div>
        <div className="mb-3 ">
          <label htmlFor="manga_image" className="form-label">
            Manga Image
          </label>
          <input type="text" className="form-control" id="manga_image" value={manga_image} onChange={handleMangaImageChange} />
        </div>

        <div className="row">
          <div className=" col-6-xs">
            <button type="submit" style={{ width: "100%" }} className="btn-primary mr-1" onClick={handleConfirmClick}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
          </div>
          <div className=" col-6-xs">
            {" "}
            <button type="submit" style={{ width: "100%" }} className="btn-error ml-1" onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MangaEditCardComponent;
