import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
// import useMobileNav from "../../../hooks/useMobileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faGear, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const NavbarComponent = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [isActive, setIsActive] = useState(false);

  const handleHamburgerClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  // const mobileNav = useMobileNav();

  const handleMobileNavOnLinkClick = () => {
    if (isActive === true) {
      setIsActive(false);
    }
  };

  const showLogin = () => {
    if (userData.user_email) {
      return (
        <Fragment>
          <ul className="display-f align-center">
            <li className="ml-1 text-hover-white dropdown">
              <Link to="#">
                <FontAwesomeIcon icon={faGear} />
              </Link>
              <div className="dropdown-content">
                <Link to="/user/profile/info" onClick={handleMobileNavOnLinkClick}>
                  Profile
                </Link>
              </div>
            </li>
            <li className="ml-1 text-hover-white">
              <FontAwesomeIcon icon={faUserCheck} />
              {userData.user_email}
            </li>
            <li className="ml-1 text-hover-white">
              <Link id="logout" className="btn-outlined-black" to="/user/logout">
                Logout
              </Link>
            </li>
          </ul>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <ul className="display-f">
            <li className="ml-1 text-hover-white dropdown">
              <Link to="#" className="site-link">
                Manga
              </Link>
              <div className="dropdown-content">
                <Link to="/all/mangas/get" onClick={handleMobileNavOnLinkClick}>
                  Manga
                </Link>
              </div>
            </li>
            <li className="ml-1 text-hover-white dropdown">
              <Link to="#" className="site-link">
                Book
              </Link>
              <div className="dropdown-content">
                <Link to="/all/books/get" onClick={handleMobileNavOnLinkClick}>
                  Book
                </Link>
              </div>
            </li>
            <li className="ml-1 text-hover-white dropdown">
              <Link to="#" className="site-link">
                Character
              </Link>
              <div className="dropdown-content">
                <Link to="/all/characters/get" onClick={handleMobileNavOnLinkClick}>
                  Character
                </Link>
              </div>
            </li>
          </ul>
          <ul className="display-f">
            <li className="ml-1 text-hover-white">
              <Link to="/user/register" className="site-link">
                Register
              </Link>
            </li>
            <li className="divider"> | </li>
            <li className="ml-1 text-hover-white">
              <Link to="/user/login" className="site-link">
                Login
              </Link>
            </li>
          </ul>
        </Fragment>
      );
    }
  };

  const showUserOptions = () => {
    if (localStorage.getItem("finalProjectToken")) {
      if (userData.isAdmin) {
        return (
          <Fragment>
            <ul className="display-f">
              <li className="ml-1 text-hover-white dropdown">
                <Link to="/admin" className="site-link">
                  Admin
                </Link>
                <div className="dropdown-content">
                  <Link to="/admin/addnewmanga" onClick={handleMobileNavOnLinkClick}>
                    Manga
                  </Link>
                  <Link to="/admin/addnewbook" onClick={handleMobileNavOnLinkClick}>
                    Book
                  </Link>
                  <Link to="/admin/addnewcharacter" onClick={handleMobileNavOnLinkClick}>
                    Character
                  </Link>
                </div>
              </li>
              <li className=" divider"> | </li>
              <li className="ml-1 text-hover-white dropdown">
                <Link to="#" className="site-link">
                  Collection
                </Link>
                <div className="dropdown-content">
                  <Link to="/collection/admin/mangas" onClick={handleMobileNavOnLinkClick}>
                    Manga
                  </Link>
                  <Link to="/collection/admin/books" onClick={handleMobileNavOnLinkClick}>
                    Book
                  </Link>
                  <Link to="/collection/admin/characters" onClick={handleMobileNavOnLinkClick}>
                    Character
                  </Link>
                </div>
              </li>
            </ul>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <ul className="display-f">
              <li className="ml-1 text-hover-white dropdown">
                <Link to="#" className="site-link">
                  Manga
                </Link>
                <div className="dropdown-content">
                  <Link to="/all/mangas/get" onClick={handleMobileNavOnLinkClick}>
                    Manga
                  </Link>
                  <Link to="/all/mangas/search" onClick={handleMobileNavOnLinkClick}>
                    Search
                  </Link>
                </div>
              </li>
              <li className="ml-1 text-hover-white dropdown">
                <Link to="#" className="site-link">
                  Book
                </Link>
                <div className="dropdown-content">
                  <Link to="/all/books/get" onClick={handleMobileNavOnLinkClick}>
                    Book
                  </Link>
                  <Link to="/all/books/search" onClick={handleMobileNavOnLinkClick}>
                    Search
                  </Link>
                </div>
              </li>
              <li className="ml-1 text-hover-white dropdown">
                <Link to="#" className="site-link">
                  Character
                </Link>
                <div className="dropdown-content">
                  <Link to="/all/characters/get" onClick={handleMobileNavOnLinkClick}>
                    Character
                  </Link>
                  <Link to="/all/characters/search" onClick={handleMobileNavOnLinkClick}>
                    Search
                  </Link>
                </div>
              </li>
            </ul>
          </Fragment>
        );
      }
    }
  };

  return (
    <Fragment>
      <nav className={`navbar   ${loggedIn ? (userData.isAdmin ? "bg-green" : "bg-primary") : "bg-error"}`}>
        <div className="container">
          <h1 className="site-title">
            <img width="40" height="40" src={require("../../images/logo/apple-touch-icon.png")} alt="logo" />
          </h1>
          <ul className="display-f ">
            <li className="ml-1 text-hover-white">
              <NavLink to="/" onClick={handleMobileNavOnLinkClick}>
                Home
              </NavLink>
            </li>
          </ul>
          {showUserOptions()}
          {showLogin()}
        </div>
      </nav>
      <nav
        className={`mobile-nav ${loggedIn ? (userData.isAdmin ? "bg-green" : "bg-primary") : "bg-error"}  `}
        style={{
          height: isActive ? "230px" : "50px",
        }}
      >
        <div className="container">
          <h1 className="site-title">
            <img width="40" height="40" src={require("../../images/logo/apple-touch-icon.png")} alt="logo" />
          </h1>
          <div
            className="mobile-links"
            style={{
              visibility: isActive ? "visible" : "hidden",
            }}
          >
            <div className="row">
              <ul className="col-4-md col-12-xs">
                <li className="ml-1 text-hover-white display-f align-center justify-center">
                  <NavLink to="/">Home</NavLink>
                </li>
              </ul>
              <div className="col-8-md col-12-xs display-f align-center justify-center">{showLogin()}</div>
            </div>
            <div className="display-f align-center justify-center">{showUserOptions()}</div>
          </div>
        </div>
        <Link to="#" className="icon" onClick={handleHamburgerClick}>
          <FontAwesomeIcon icon={faBars} />
        </Link>
      </nav>
    </Fragment>
  );
};

export default NavbarComponent;
