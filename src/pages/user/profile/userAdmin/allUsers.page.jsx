/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CollapsibleComponent from "../../../../components/collapsible/collapsible.component";
import UserTableComponent from "../../../../components/user/table/userTable.component";

const AllUsersPage = () => {
  const [usersArr, setUserArr] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  let firstNumber = 0;
  let secondNumber = 5;
  let pageNumber = 1;
  const [sliceFirstNumber, setSliceFirstNumber] = useState(firstNumber);
  const [sliceSecondNumber, setSliceSecondNumber] = useState(secondNumber);
  const [listPageNumber, setListPageNumber] = useState(pageNumber);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get("/user/admin/getallusers")
      .then((res) => {
        const arr = cloneDeep(res.data);
        const itemToBeRemoved = { id: userData.user_id };
        arr.splice(
          arr.findIndex((item) => item._id === itemToBeRemoved.id),
          1
        );
        setUserArr(arr);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getUrl = window.location.href;
  const getPrefixBySlash = getUrl.split("/");

  const handleNextBtnClick = () => {
    if (getPrefixBySlash[7] === "?type=user") {
      if (usersArr.length < sliceSecondNumber) {
        return;
      } else {
        setSliceFirstNumber(sliceFirstNumber + 5);
        setSliceSecondNumber(sliceSecondNumber + 5);
        setListPageNumber(listPageNumber + 1);
      }
    }
  };

  const handlePrevBtnClick = () => {
    if (sliceFirstNumber <= 0) {
      return;
    } else {
      setSliceFirstNumber(sliceFirstNumber - 5);
      setSliceSecondNumber(sliceSecondNumber - 5);
      setListPageNumber(listPageNumber - 1);
    }
  };

  const resetListPage = () => {
    if (listPageNumber > 1) {
      setListPageNumber(pageNumber);
      setSliceFirstNumber(firstNumber);
      setSliceSecondNumber(secondNumber);
    }
  };

  const tableHeadsArr = ["Index", "First Name", "Last Name", "Email", "isAdmin"];

  const getUsers = () => {
    if (getPrefixBySlash[7] === "?type=user") {
      return (
        <Fragment>
          <UserTableComponent
            title="All Users"
            pageNumber={pageNumber}
            tableHeads={tableHeadsArr}
            array={usersArr}
            category={"users"}
            slice1Num={sliceFirstNumber}
            slice2Num={sliceSecondNumber}
            onPrev={handlePrevBtnClick}
            onNext={handleNextBtnClick}
          />
        </Fragment>
      );
    } else {
      return;
    }
  };

  return (
    <Fragment>
      <div className="col-3-md col-12-xs">
        <CollapsibleComponent open title="User List">
          <ul className="list-group">
            <li className="mb-2 mr-2">
              <Link to="/user/profile/info/allusers/?type=user" onClick={resetListPage} className="btn-primary">
                Users
              </Link>
            </li>
          </ul>
        </CollapsibleComponent>
      </div>
      <div className="col-9-md col-12-xs">{getUsers()}</div>
    </Fragment>
  );
};

export default AllUsersPage;
