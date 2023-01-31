import React, { useState } from "react";

const UpdateUserInfoPage = (props) => {
  const [first_name, setFirstName] = useState(props.first_name);
  const [last_name, setLastName] = useState(props.last_name);
  const [user_email, setUserEmail] = useState(props.user_email);
  const [user_phone, setUserPhone] = useState(props.user_phone);
  const [user_image, setUserImage] = useState(props.user_image);
  const [user_nickname, setUserNickName] = useState(props.user_nickname);
  const [user_age, setUserAge] = useState(props.user_age);
  const [user_birthday, setUserBirthday] = useState(props.user_birthday);

  const handleFirstNameChange = (ev) => {
    setFirstName(ev.target.value);
  };

  const handleLastNameChange = (ev) => {
    setLastName(ev.target.value);
  };

  const handleUserEmailChange = (ev) => {
    setUserEmail(ev.target.value);
  };
  const handleUserPhoneChange = (ev) => {
    setUserPhone(ev.target.value);
  };

  const handleUserImageChange = (ev) => {
    setUserImage(ev.target.value);
  };
  const handleUserNicknameChange = (ev) => {
    setUserNickName(ev.target.value);
  };
  const handleUserAgeChange = (ev) => {
    setUserAge(ev.target.value);
  };
  const handleUserBirthDayChange = (ev) => {
    setUserBirthday(ev.target.value);
  };

  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleConfirmClick = () => {
    //! joi validation
    let dataToSend = {
      first_name,
      last_name,
      user_email,
      user_phone,
      user_nickname,
      user_age,
      user_birthday,
    };
    if (user_image) {
      dataToSend.user_image = user_image;
    }
    props.onEditDone(props._id, dataToSend);
  };

  const handleCancelClick = () => {
    props.onCancelEdit();
  };

  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <div className="container mt-3 center-absolute">
        <h1 className="adminTitle display-f justify-center mb-2">Update User Info</h1>
        <div className="adminForm">
          <form onSubmit={handleSubmit} onClick={handleFormClick}>
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
            <div className="mb-3">
              <label htmlFor="user_nickname" className="form-label">
                Nickname
              </label>
              <input type="text" className="form-control" id="user_nickname" value={user_nickname} onChange={handleUserNicknameChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="user_age" className="form-label">
                Age
              </label>
              <input type="number" className="form-control" id="user_age" value={user_age} onChange={handleUserAgeChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="user_birthday" className="form-label">
                Birthday
              </label>
              <input type="text" className="form-control" id="user_birthday" value={user_birthday} onChange={handleUserBirthDayChange} />
            </div>
            <button type="submit" className="btn-outlined-primary adminBtn" onClick={handleConfirmClick}>
              Submit
            </button>
            <button type="submit" className="btn-outlined-primary adminBtn" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserInfoPage;
