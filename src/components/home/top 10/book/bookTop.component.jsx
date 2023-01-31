import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BookTopComponent = () => {
  const [bookLikesArr, setBookLikesArr] = useState([]);

  useEffect(() => {
    getBookLikes();
    console.log("use effect");
  }, []);

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };

  const getBookLikes = () => {
    axios
      .get("/book/getallbooks")
      .then((res) => {
        console.log("books likes", res.data);
        setBookLikesArr(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
        toast.error("cannot get cards", {
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
    <div className="top10">
      <div className="header">
        <h2 className="rankingTitle">Top Books</h2>
        <Link to="/all/books/get">
          <button className="btn-primary">
            <b>More</b>
          </button>
        </Link>
      </div>
      <ul className="ulWidth">
        {bookLikesArr
          .filter((item) => item.likes > 1)
          .sort(compareLikes)
          .slice(0, 5)
          .map((item, index) => (
            <li className="rankedTopItem" key={item._id}>
              <span className="rank">{index + 1}</span>
              <p className="rankedImg">
                <img width="50" height="70" alt={item.book_title} src={item.book_image} />
              </p>
              <div className="rankedContent">
                <h3 className="title">{item.volume_name}</h3>
                <span className="info">
                  vol {item.vol_no}, {item.retail_value} $, {item.manga_name}
                </span>
                <br />
                <span className="likes">{item.likes} likes</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BookTopComponent;
