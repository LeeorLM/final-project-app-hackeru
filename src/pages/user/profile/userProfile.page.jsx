/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import AllUsersPage from "./userAdmin/allUsers.page";
import UserDataPage from "./userData/userData.page";
import UserLikesPage from "./userLikes/userLikes.page";

const UserProfilePage = () => {
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = window.localStorage.getItem("isAdmin");

  return (
    <div className="container mt-2">
      <UserDataPage />
      <div className="collection">
        <div className="row">{isAdmin === "true" ? <AllUsersPage /> : <UserLikesPage />}</div>
      </div>
    </div>
  );
};

export default UserProfilePage;
