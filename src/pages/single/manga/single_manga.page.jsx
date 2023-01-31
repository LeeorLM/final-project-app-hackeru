/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookProfileComponent from "../../../components/public/book_info/single/book_profile.component";
import CharacterProfileComponent from "../../../components/public/character_info/single/character_profile.component";
import RelatedComponent from "../../../components/public/related/related.component";

const SingleMangaPage = () => {
  const [mangaArr, setMangaArr] = useState([]);
  const [mangaGenres, setMangaGenres] = useState([]);
  const [booksArr, setBooksArr] = useState([]);
  const [characterArr, setCharacterArr] = useState([]);
  const [dataToShowBook, setDataToShowBook] = useState(null);
  const [dataToShowCharacter, setDataToShowCharacter] = useState(null);
  const { id, name } = useParams();

  useEffect(() => {
    getTheManga();
    getTheBooksByManga();
    getTheCharactersByManga();
    console.log("use effect");
  }, []);

  const handleShowBookPopup = (_id) => {
    const ktemp = cloneDeep(booksArr.find((item) => item._id === _id));
    setDataToShowBook(ktemp);
  };
  const handleShowCharacterPopup = (_id) => {
    const ktemp = cloneDeep(characterArr.find((item) => item._id === _id));
    setDataToShowCharacter(ktemp);
  };

  const handleCancelShow = () => {
    setDataToShowBook(null);
    setDataToShowCharacter(null);
  };

  const getTheBooksByManga = () => {
    axios
      .get("/book/getbook/" + name)
      .then((res) => {
        console.log("books", res.data);
        setBooksArr(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error("cannot get manga", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const getTheCharactersByManga = () => {
    axios
      .get("/character/getcharacter/" + name)
      .then((res) => {
        console.log("characters", res.data);
        setCharacterArr(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error("cannot get manga", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const getTheManga = () => {
    axios
      .get("/manga/" + id)
      .then((res) => {
        console.log("manga", res.data);
        setMangaArr(res.data);
        setMangaGenres(res.data.genres);
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error("cannot get manga", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="container mt-2">
      {mangaArr && (
        <Fragment>
          <h1 className="adminTitle mb-2 display-f justify-center mt-2">{mangaArr.manga_title}</h1>
          <div className="card">
            <div className="row">
              <div className="col-5-xl display-f align-center justify-center">
                <img src={mangaArr.manga_image} className="card-img" alt={mangaArr.manga_title} />
              </div>
              <div className="col-7-xl">
                <div className="card-body ">
                  <h5 className="card-title"> {mangaArr.manga_title}</h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="list-item-label mr-1">Type: </span> {mangaArr.type}
                    </li>

                    <li className="list-group-item">
                      <span className="list-item-label">Manga Background: </span>
                      <br />
                      <div className="mt-1">{mangaArr.manga_background}</div>
                    </li>
                    <li className="list-group-item">
                      <span className="list-item-label">Story Description: </span>
                      <br />
                      <div className="mt-1">{mangaArr.story_description}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <br />
            <div className="card-body">
              <div className="row">
                <div className="list-group col-6-md col-12-xs">
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Story By: </span>
                    {mangaArr.story_by}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Art By: </span>
                    {mangaArr.art_by}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Chapters: </span>
                    {mangaArr.chapters}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Volumes: </span>
                    {mangaArr.volumes}
                  </li>
                </div>
                <div className="list-group col-6-md col-12-xs">
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Status: </span>
                    {mangaArr.manga_status}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Published: </span>
                    {mangaArr.published}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Serialization: </span>
                    {mangaArr.serialization}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2 mr-2">genres: </span>
                    <ul className="list-group" style={{ width: "100%" }}>
                      {mangaGenres.map((item, indx) => (
                        <li className="list-group-item" key={indx + 1}>
                          <span className="list-item-label mr-2">{indx + 1}:</span> {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6-md col-12-xs mb-2">
                  <h3 className="adminTitle display-f justify-center mb-1 mr-1">Related Books/Volumes</h3>
                  <div className="list-group">
                    {booksArr.map((item, indx) => (
                      <RelatedComponent
                        origin={mangaArr.manga_title}
                        _id={item._id}
                        type={"book"}
                        title={item.book_title}
                        image={item.book_image}
                        index={indx + 1}
                        key={item._id}
                        array={booksArr}
                        onMore={handleShowBookPopup}
                      />
                    ))}
                    {booksArr.length < 1 && (
                      <div className="notFound">
                        <p>No Books Found Sorry...</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6-md col-12-xs mb-2">
                  <h3 className="adminTitle display-f justify-center mb-1 ml-1">Related Characters</h3>
                  <div className="list-group">
                    {characterArr.map((item, indx) => (
                      <RelatedComponent
                        origin={mangaArr.manga_title}
                        _id={item._id}
                        image={item.character_image}
                        title={item.character_name}
                        index={indx + 1}
                        type={"character"}
                        key={item._id}
                        onMore={handleShowCharacterPopup}
                      />
                    ))}
                    {characterArr.length < 1 && (
                      <div className="notFound">
                        <p>No Books Found Sorry...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {dataToShowBook && <BookProfileComponent onCancelShow={handleCancelShow} {...dataToShowBook} />}
            {dataToShowCharacter && <CharacterProfileComponent onCancelShow={handleCancelShow} {...dataToShowCharacter} />}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SingleMangaPage;
