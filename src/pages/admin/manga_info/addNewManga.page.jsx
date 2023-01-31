import axios from "axios";
import Joi from "joi-browser";
import { useState } from "react";
import addNewMangaSchema from "../../../validations/manga_info.validation";
import { toast } from "react-toastify";

const AddNewMangaPage = () => {
  const [manga_title, setMangaTitle] = useState("");
  const [manga_background, setMangaBackground] = useState("");
  const [story_description, setStoryDescription] = useState("");
  const [story_by, setStoryBy] = useState("");
  const [art_by, setArtBy] = useState("");
  const [volumes, setVolumes] = useState("");
  const [chapters, setChapters] = useState("");
  const [published, setPublished] = useState("");
  let [genres, setGenres] = useState("");
  const [manga_status, setMangaStatus] = useState("");
  const [manga_image, setMangaImage] = useState("");
  const [serialization, SetSerialization] = useState("");

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
    // console.log(genresArr);
  };

  const handleMangaStatusChange = (ev) => {
    setMangaStatus(ev.target.value);
  };

  const handleSerializationChange = (ev) => {
    SetSerialization(ev.target.value);
    console.log(ev.target.value);
  };

  const handleMangaImageChange = (ev) => {
    setMangaImage(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
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

    const validatedValue = Joi.validate(
      {
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
      },
      addNewMangaSchema,
      { abortEarly: false }
    );
    if (dataToSend.manga_image) {
      validatedValue.manga_image = dataToSend.manga_image;
    }
    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/manga/addnewmanga", dataToSend)
        .then((data) => {
          toast("new manga has been added");
          console.log(data.data);
        })
        .catch((err) => {
          console.log("something went wrong", err);
        });
    }
  };

  return (
    <div className="container">
      <h1 className="adminTitle mt-1 display-f justify-center">Add New Manga</h1>
      <div className="adminForm">
        <form onSubmit={handleSubmit}>
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
              <select id="manga_status" className="form-select" name="manga_status" value={manga_status} onChange={handleMangaStatusChange}>
                <option value="None">None</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Hiatus">Hiatus</option>
              </select>
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

          <button type="submit" className="btn-primary adminBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewMangaPage;
