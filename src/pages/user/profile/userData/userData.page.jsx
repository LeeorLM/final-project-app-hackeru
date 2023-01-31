/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import UpdateUserInfoPage from "../../update/updateUserInfo.page";

const UserDataPage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [userArr, setUserArr] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const localUserId = window.localStorage.getItem("user_id");
  useEffect(() => {
    getUserDatas();
  }, []);

  const handleShowPopup = () => {
    // setShowEditPopup(true);
    let ktemp = cloneDeep(userArr.find((item) => item._id === userData.user_id));
    setDataToEdit(ktemp);
  };

  const handleCancelEdit = () => {
    // setShowEditPopup(false);
    setDataToEdit(null);
  };

  const getUserDatas = () => {
    axios
      .get("/user/my/" + localUserId)
      .then((res) => {
        setUserArr(res.data);
        console.log("data", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleEditUserInfo = (_id, updatedCard) => {
    console.log("updatedCard", updatedCard);
    axios
      .put("/user/" + _id, updatedCard)
      .then((res) => {
        let newArrOfUser = cloneDeep(userArr);
        let mangaItemInd = newArrOfUser.findIndex((item) => item._id === _id);
        if (mangaItemInd !== -1) {
          newArrOfUser[mangaItemInd] = { ...cloneDeep(updatedCard), _id };
          setUserArr(newArrOfUser);
        }
        setDataToEdit(null);
      })
      .catch((err) => {
        toast("error");
      });
  };

  return (
    <Fragment>
      <h1 className="adminTitle display-f justify-center mb-2">User Profile</h1>
      {userArr.map((item) => (
        <div className="card mb-3" key={item._id}>
          <div className="row g-0">
            <div className="col-5-md col-12-sm display-f align-center justify-center">
              <img src={item.user_image} className="card-img-profile" alt={item.first_name} />
            </div>
            <div className="col-7-md col-12-sm">
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item display-f justify-space-between align-center">
                    <span className="list-item-label">First Name:</span> {item.first_name}
                  </li>
                  <li className="list-group-item display-f justify-space-between align-center">
                    <span className="list-item-label">Last Name:</span> {item.last_name}
                  </li>
                  <li className="list-group-item display-f justify-space-between align-center">
                    <span className="list-item-label">Email:</span> {item.user_email}
                  </li>
                  <li className="list-group-item display-f justify-space-between align-center">
                    <span className="list-item-label">Phone Number:</span> {item.user_phone}
                  </li>
                  <li className={`list-group-item display-f justify-space-between align-center ${item.user_nickname ? "display-b" : "display-n"}`}>
                    <span className="list-item-label">Nickname:</span> {item.user_nickname}
                  </li>
                  <li className={`list-group-item display-f justify-space-between align-center ${item.user_age ? "display-b" : "display-n"}`}>
                    <span className="list-item-label">Age:</span> {item.user_age}
                  </li>
                  <li className={`list-group-item display-f justify-space-between align-center ${item.user_birthday ? "display-b" : "display-n"}`}>
                    <span className="list-item-label">Birthday:</span> {item.user_birthday}
                  </li>
                </ul>
              </div>
              <div className="mt-2 row">
                <button className="btn-primary col-12-xs" onClick={handleShowPopup}>
                  Update Info
                </button>
              </div>
              {dataToEdit && <UpdateUserInfoPage onCancelEdit={handleCancelEdit} onEditDone={handleEditUserInfo} {...dataToEdit} />}
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default UserDataPage;
