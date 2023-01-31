import HomeIcon from "@mui/icons-material/Home";
import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Fragment>
      <footer>
        <div className="footer">
          <div className="rights">
            <p>@2022 all right reserved</p>
          </div>
          <div className="footer_icon">
            <Link to="#">
              <HomeIcon className="the_icon" />
            </Link>
          </div>
          <div>
            <ul className="footer_nav">
              <li>
                <NavLink className="footer_link" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <Link className="footer_link" to="/all/mangas/get">
                  Manga
                </Link>
              </li>
              <li>
                <NavLink className="footer_link" to="/all/books/get">
                  Book
                </NavLink>
              </li>
              <li>
                <NavLink className="footer_link" to="/all/characters/get">
                  Character
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default FooterComponent;
