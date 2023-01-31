import { useState } from "react";
import axios from "axios";
import { useParams, redirect } from "react-router-dom";

const ForgetPasswordPage = () => {
  const [user_password, setUserPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const { keyParam, iv, encryptedData } = useParams();

  const handlePasswordChange = (ev) => {
    setUserPassword(ev.target.value);
  };

  const handleConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    if (user_password === confirm_password) {
      //! joi validation
      axios
        .post(`/user/recoverpassword/${keyParam}/${iv}/${encryptedData}`, {
          user_password,
        })
        .then((data) => {
          console.log("success", data);
          redirect("/user/login");
        })
        .catch((err) => {
          console.log("error", err);
          //* display error msg
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <h1>Reset your password</h1>
        <div className="mb-3">
          <label htmlFor="user_password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="user_password" value={user_password} onChange={handlePasswordChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password
          </label>
          <input type="password" className="form-control" id="confirm_password" value={confirm_password} onChange={handleConfirmPasswordChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
