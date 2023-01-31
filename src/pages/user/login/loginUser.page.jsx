import axios from "axios";
import Joi from "joi-browser";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userLoginSchema from "../../../validations/userLogin.validation";
import forgotPasswordSchema from "../../../validations/forgotPassword.validation";
import useAfterLogin from "../../../hooks/useAfterLogin";

const LoginUserPage = () => {
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");

  const navigate = useNavigate();

  const afterLogin = useAfterLogin();

  const handleUserEmailChange = (ev) => {
    setUserEmail(ev.target.value);
  };

  const handleUserPasswordChange = (ev) => {
    setUserPassword(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let dataToSend = {
      user_email,
      user_password,
    };
    const validatedValue = Joi.validate(
      {
        user_email,
        user_password,
      },
      userLoginSchema,
      { abortEarly: false }
    );
    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/user/login", dataToSend)
        .then((data) => {
          if (data.data.data.msg === "invalid email and/or password") {
            toast("invalid email and/or password");
          } else if (data.data.msg === "here your token") {
            toast("user successfuly logged in");
            console.log("data", data.data);
            afterLogin(data.data.data);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log("something went wrong", err);
        });
    }
  };

  const handleForgotPassword = (ev) => {
    ev.preventDefault();
    let dataToSend = {
      user_email,
    };
    const validatedValue = Joi.validate(
      {
        user_email,
      },
      forgotPasswordSchema,
      { abortEarly: false }
    );
    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/user/forgetpassword", dataToSend)
        .then((data) => {
          // toast();
          console.log("forgotPassword", data.data);
        })
        .catch((err) => {
          console.log("something went wrong", err);
        });
    }
  };
  return (
    <div className="container contentForm  mt-3 ">
      <h1 className="adminTitle display-f justify-center mb-2 mt-2">Login</h1>
      <div className="insideContent display-f justify-center align-center">
        <div className="row display-f justify-space-between">
          <div className="col-5-md col-12-xs display-f align-center mb-2">
            <p>Here you cant login to the website and start collecting your favorite manga,book and characters</p>
          </div>
          <div className="col-6-md col-12-xs">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="user_email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="user_email"
                  value={user_email}
                  onChange={handleUserEmailChange}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="user_password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="user_password" value={user_password} onChange={handleUserPasswordChange} />
              </div>
              <button type="submit" className="btn-outlined-primary">
                Submit
              </button>
              <button className="btn-outlined-error ml-2" onClick={handleForgotPassword}>
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUserPage;
