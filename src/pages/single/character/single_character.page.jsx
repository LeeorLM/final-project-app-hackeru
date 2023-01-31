/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MangaProfileComponent from "../../../components/public/manga_info/single/manga_profile.component";
import RelatedComponent from "../../../components/public/related/related.component";

const SingleCharacterPage = (title) => {
  const [characterArr, setCharacterArr] = useState([]);
  const [mangaArr, setMangaArr] = useState([]);
  const [relatedManga, setRelatedManga] = useState([]);
  const { id, origin } = useParams();
  const [dataToShowManga, setDataToShowManga] = useState(null);

  useEffect(() => {
    getTheCharacter();
    getManga();
    console.log("use effect");
  }, []);

  const handleShowMangaPopup = (id, title) => {
    console.log("title", title);
    const ktemp = cloneDeep(mangaArr.find((item) => item.manga_title === title));
    setDataToShowManga(ktemp);
    console.log("ktemp", ktemp);
    console.log("related", relatedManga);
  };

  const handleCancelShow = () => {
    setDataToShowManga(null);
  };

  const getTheCharacter = () => {
    axios
      .get("/character/" + id)
      .then((res) => {
        console.log("characters", res.data);
        setCharacterArr(res.data);
        setRelatedManga(res.data.manga_name);
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

  const getManga = () => {
    axios
      .get("/manga/getmanga/" + origin)
      .then((res) => {
        setMangaArr(res.data);
        console.log("character mangas", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="container">
      {mangaArr && characterArr && (
        <Fragment>
          <h1 className="adminTitle mb-2 display-f justify-center mt-2">{characterArr.character_name}</h1>
          <div className="card">
            <div className="row">
              <div className="col-5-lg col-12-xs display-f align-center justify-center">
                <img src={characterArr.character_image} className="card-img" alt={characterArr.character_name} />
              </div>
              <div className="col-7-lg col-12-xs">
                <div className="card-body ">
                  <h5 className="card-title"> {characterArr.character_name}</h5>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <span className="list-item-label mr-1">Role: </span> {characterArr.character_role}
                    </li>

                    <li className="list-group-item">
                      <span className="list-item-label">Character Background: </span>
                      <br />
                      <div className="mt-1">{characterArr.character_background}</div>
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
                    <span className="list-item-label mr-2">Likes: </span>
                    {characterArr.likes}
                  </li>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6-md col-12-xs">
                  <h3 className="adminTitle display-f justify-center mb-1 mr-1">Related Mangas</h3>
                  <div className="list-group">
                    {mangaArr.manga_title ? (
                      <RelatedComponent
                        _id={mangaArr._id}
                        type={"manga"}
                        image={mangaArr.manga_image}
                        title={mangaArr.manga_title}
                        index={1}
                        onMore={handleShowMangaPopup}
                      />
                    ) : (
                      mangaArr.status === "fail" && (
                        <div className="notFound">
                          <p>No mangas Found Sorry...</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            {dataToShowManga && <MangaProfileComponent onCancelShow={handleCancelShow} {...dataToShowManga} />}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SingleCharacterPage;
