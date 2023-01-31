/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookProfileComponent from "../../../components/public/book_info/single/book_profile.component";
import CharacterProfileComponent from "../../../components/public/character_info/single/character_profile.component";
import MangaProfileComponent from "../../../components/public/manga_info/single/manga_profile.component";
import RelatedComponent from "../../../components/public/related/related.component";

const SingleBookPage = () => {
  const [characterArr, setCharacterArr] = useState([]);
  const [mangaArr, setMangaArr] = useState([]);
  const [booksArr, setBooksArr] = useState([]);
  const [dataToShowManga, setDataToShowManga] = useState(null);
  const [dataToShowCharacter, setDataToShowCharacter] = useState(null);
  const { name, origin } = useParams();

  useEffect(() => {
    getTheBook();
    getTheMangaByName();
    getTheCharactersByManga();
    console.log("use effect");
  }, []);

  const handleShowMangaPopup = (_id) => {
    const ktemp = cloneDeep(mangaArr);
    setDataToShowManga(ktemp);
  };
  const handleShowCharacterPopup = (_id) => {
    const ktemp = cloneDeep(characterArr.find((item) => item._id === _id));
    setDataToShowCharacter(ktemp);
  };

  const handleCancelShow = () => {
    setDataToShowManga(null);
    setDataToShowCharacter(null);
  };

  const getTheCharactersByManga = () => {
    axios
      .get("/character/getcharacter/" + origin)
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

  const getTheMangaByName = () => {
    console.log("origin", origin);
    axios
      .get("/manga/getmanga/" + origin)
      .then((res) => {
        console.log("manga", res.data);
        setMangaArr(res.data);
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

  const getTheBook = () => {
    axios
      .get("/book/getbooktitle/" + name)
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

  return (
    <div className="container mt-2">
      {booksArr && (
        <Fragment>
          <h1 className="adminTitle mb-2 display-f justify-center mt-2">{booksArr.book_title}</h1>
          <div className="card">
            <div className="row">
              <div className="col-5-xl display-f align-center justify-center">
                <img src={booksArr.book_image} className="card-img" alt={booksArr.book_title} />
              </div>
              <div className="col-7-xl">
                <div className="card-body ">
                  <h5 className="card-title"> {booksArr.book_title}</h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="list-item-label mr-1">Manga Name: </span> {booksArr.manga_name}
                    </li>
                    <li className="list-group-item">
                      <span className="list-item-label mr-1">Volume Name: </span> {booksArr.volume_name}
                    </li>
                    <li className="list-group-item">
                      <span className="list-item-label">Book Description: </span>
                      <br />
                      <div className="mt-1">{booksArr.book_description}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="list-group col-6-md col-12-xs">
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Publisher: </span>
                    {booksArr.publisher}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">ISBN: </span>
                    {booksArr.isbn}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Vol No.: </span>
                    {booksArr.vol_no}
                  </li>
                </div>
                <div className="list-group col-6-md col-12-xs">
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Retail Value: </span>
                    {booksArr.retail_value}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Collection Value: </span>
                    {booksArr.collection_value}
                  </li>
                  <li className="list-group-item display-f align-center justify-flex-start">
                    <span className="list-item-label mr-2">Likes: </span>
                    {booksArr.likes}
                  </li>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6-md col-12-xs mb-2">
                  <h3 className="adminTitle display-f justify-center mb-1 mr-1">Related Mangas</h3>
                  <div className="list-group">
                    {mangaArr.manga_title
                      ? mangaArr && (
                          <RelatedComponent
                            type={"manga"}
                            _id={mangaArr._id}
                            image={mangaArr.manga_image}
                            title={mangaArr.manga_title}
                            index={1}
                            key={mangaArr._id}
                            onMore={handleShowMangaPopup}
                          />
                        )
                      : mangaArr.status === "fail" && (
                          <div className="notFound">
                            <p>No mangas Found Sorry...</p>
                          </div>
                        )}
                  </div>
                </div>
                <div className="col-6-md col-12-xs">
                  <h3 className="adminTitle display-f justify-center mb-1 mr-1">Related Characters</h3>
                  <div className="list-group">
                    {characterArr.map((item, indx) => (
                      <RelatedComponent
                        type={"character"}
                        image={item.character_image}
                        origin={item.manga_name[0]}
                        _id={item._id}
                        title={item.character_name}
                        index={indx + 1}
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
            {dataToShowManga && <MangaProfileComponent onCancelShow={handleCancelShow} {...dataToShowManga} />}
            {dataToShowCharacter && <CharacterProfileComponent onCancelShow={handleCancelShow} {...dataToShowCharacter} />}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SingleBookPage;
