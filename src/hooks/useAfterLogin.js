import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const useAfterLogin = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  return (token) => {
    localStorage.setItem("finalProjectToken", token);
    dispatch(authActions.login()); //update redux state
    const decoded = jwt_decode(token);
    console.log("token decoded", decoded);
    dispatch(authActions.updateUserData(decoded));
    if (!window.localStorage.getItem("user_id")) {
      window.localStorage.setItem("user_id", decoded.user_id);
    }
    window.localStorage.setItem("isAdmin", decoded.isAdmin);

    navigate("/");
  };
};

export default useAfterLogin;
