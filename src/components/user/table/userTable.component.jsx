import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UserTableComponent = ({ arrayForDelete, category, title, pageNumber, tableHeads, slice1Num, slice2Num, array, onPrev, onNext, onDelete }) => {
  function handlePrevClick() {
    onPrev();
  }
  function handleNextClick() {
    onNext();
  }
  return (
    <Fragment>
      <h1 className="adminTitle mb-2 display-f justify-center">{title}</h1>
      <table className="table">
        <thead>
          <tr>
            {tableHeads.map((item, index) => (
              <th key={index + 1}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {category === "manga"
            ? array
                .filter((element, indx) => indx >= slice1Num && indx < slice2Num)
                .map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <th>
                      <img width="50" height="70" src={item.manga_image} alt={item.manga_title} />
                    </th>
                    <td>{item.manga_title}</td>
                    <td>
                      <Link className="btn-primary" to={"/single/manga/" + item._id + "/" + item.manga_title}>
                        Go To
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn-error"
                        onClick={function handleDeleteClick() {
                          console.log("itemId", item._id);
                          onDelete(item._id, arrayForDelete);
                        }}
                      >
                        Unlike
                      </button>
                    </td>
                  </tr>
                ))
            : ""}
          {category === "book"
            ? array
                .filter((element, indx) => indx >= slice1Num && indx < slice2Num)
                .map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">
                      <img width="50" height="70" src={item.book_image} alt={item.book_title} />
                    </th>
                    <td className="center">{item.book_title}</td>
                    <td className="center">
                      <Link
                        className="btn btn-primary"
                        to={"/single/book/" + item._id + "/" + item.book_title + "/" + item.book_title.toString().replace(/[0-9]/, "")}
                      >
                        Go To
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn-error"
                        onClick={function handleDeleteClick() {
                          console.log("itemId", item._id);
                          onDelete(item._id, arrayForDelete);
                        }}
                      >
                        Unlike
                      </button>
                    </td>
                  </tr>
                ))
            : ""}
          {category === "character"
            ? array
                .filter((element, indx) => indx >= slice1Num && indx < slice2Num)
                .map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">
                      <img width="50" height="70" src={item.character_image} alt={item.character_name} />
                    </th>
                    <td className="center">{item.character_name}</td>
                    <td className="center">
                      <Link className="btn btn-primary" to={"/single/character/" + item._id + "/" + item.character_name + "/" + item.manga_name[0]}>
                        Go To
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn-error"
                        onClick={function handleDeleteClick() {
                          console.log("itemId", item._id);
                          onDelete(item._id, arrayForDelete);
                        }}
                      >
                        Unlike
                      </button>
                    </td>
                  </tr>
                ))
            : ""}
          {category === "users"
            ? array
                .filter((element, indx) => indx >= slice1Num && indx < slice2Num)
                .map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.user_email}</td>
                    <td>{item.isAdmin.toString()}</td>
                  </tr>
                ))
            : ""}
        </tbody>
      </table>
      <div className="mt-2 display-f justify-space-around align-center">
        <button className="btn-outlined-primary" onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faBackward} /> Prev
        </button>
        <span>{pageNumber}</span>
        <button className="btn-outlined-primary" onClick={handleNextClick}>
          Next <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </Fragment>
  );
};

export default UserTableComponent;
