import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TopBookMobileComponent = () => {
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
    <div className="topItems">
      <div className="rowTitle">
        <span className="titleName">Top Book</span>
        <Link to="/all/books/get">
          <button className="btn-primary titleBtn">
            <b>More</b> {">"}
          </button>
        </Link>
      </div>
      <div className="listItems">
        {bookLikesArr
          .filter((item) => item.likes > 1)
          .sort(compareLikes)
          .slice(0, 9)
          .map((item) => (
            <div className="item" key={item._id}>
              <img src={item.book_image} className="itemImg" alt={item.book_title} />
              <span className="itemName">{item.book_title}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopBookMobileComponent;
