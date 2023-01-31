import axios from "axios";
import Joi from "joi-browser";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userRegisterSchema from "../../../validations/userRegister.validation";

const RegisterUserPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [user_phone, setUserPhone] = useState("");
  const [user_image, setUserImage] = useState("");

  const handleFirstNameChange = (ev) => {
    setFirstName(ev.target.value);
  };

  const handleLastNameChange = (ev) => {
    setLastName(ev.target.value);
  };

  const handleUserEmailChange = (ev) => {
    setUserEmail(ev.target.value);
  };

  const handleUserPasswordChange = (ev) => {
    setUserPassword(ev.target.value);
  };

  const handleConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const handleUserPhoneChange = (ev) => {
    setUserPhone(ev.target.value);
  };

  const handleUserImageChange = (ev) => {
    setUserImage(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    let dataToSend = {
      first_name,
      last_name,
      user_email,
      user_password,
      user_phone,
    };
    if (user_image) {
      dataToSend.user_image = user_image;
    }
    const validatedValue = Joi.validate(
      {
        first_name,
        last_name,
        user_email,
        user_password,
        user_phone,
      },
      userRegisterSchema,
      { abortEarly: false }
    );
    if (dataToSend.user_image) {
      validatedValue.user_image = dataToSend.user_image;
    }
    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/user/register", dataToSend)
        .then((data) => {
          if (data.data.data.msg === "email already exist") {
            toast("failed to register: email already exist");
          } else if (data.data.status === "success") {
            toast("new user successfuly created");
          }
          console.log(data.data);
        })
        .catch((err) => {
          console.log("something went wrong", err);
        });
    }
  };

  return (
    <div className="container contentForm mt-3">
      <h1 className="adminTitle display-f justify-center mb-2 mt-2">Login</h1>
      <div className="insideContent  display-f justify-center align-center">
        <div className="row display-f align-center justify-space-between">
          <div className="col-5-md col-12-xs  display-f align-center justify-center mb-2">
            <p>Here you can register to the website to be able to Login and like your favorite manga,book and character</p>
          </div>
          <div className="col-6-md col-12-xs mb-2">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-6-md">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input type="text" className="form-control" id="first_name" value={first_name} onChange={handleFirstNameChange} />
                </div>
                <div className="mb-3 col-6-md">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input type="text" className="form-control" id="last_name" value={last_name} onChange={handleLastNameChange} />
                </div>
              </div>
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
              <div className="mb-3">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  value={confirm_password}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="user_phone" className="form-label">
                  Phone Number
                </label>
                <input type="text" className="form-control" id="user_phone" value={user_phone} onChange={handleUserPhoneChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="user_image" className="form-label">
                  User Image
                </label>
                <input type="text" className="form-control" id="user_image" value={user_image} onChange={handleUserImageChange} />
              </div>
              <button type="submit" className="btn-outlined-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
