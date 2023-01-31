import axios from "axios";
import { cloneDeep } from "lodash";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UpdateUserInfoPage from "./updateUserInfo.page";

const ContainUpdatePage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [userInfoArr, setUserInfoArr] = useState({});

  useEffect(() => {
    getUserInfo();
    console.log("use effect user");
  }, []);

  const getUserInfo = () => {
    axios
      .get("/user/my/" + userData.user_id)
      .then((res) => {
        setUserInfoArr(res.data);
        // userArr = cloneDeep(res.data);
        console.log("user", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return <Fragment>{userInfoArr && <UpdateUserInfoPage {...userInfoArr} />}</Fragment>;
};

export default ContainUpdatePage;
