/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./utils/PrivateRoute";
import useAfterLogin from "./hooks/useAfterLogin";
import FooterComponent from "./components/footer/footer.component";
import RegisterUserPage from "./pages/user/register/registerUser.page";
import LoginUserPage from "./pages/user/login/loginUser.page";
import AddNewMangaPage from "./pages/admin/manga_info/addNewManga.page";
import AddNewCharacterPage from "./pages/admin/character_info/addNewCharacter.page";
import AddNewBookPage from "./pages/admin/book_info/addNewBook.page";
import HomePage from "./pages/home/home.page";
import MangaItemsPage from "./pages/collection/admin/manga/manga_items.page";
import BookItemsPage from "./pages/collection/admin/book/book_items.page";
import LogoutPage from "./pages/user/logout/logout.page";
import CharacterItemsPage from "./pages/collection/admin/character/character_items.page";
import PublicMangaItemsPage from "./pages/collection/public/manga/manga_items.page";
import PublicCharacterItemsPage from "./pages/collection/public/character/character_items.page";
import PublicBookItemsPage from "./pages/collection/public/book/book_items.page";
import SingleMangaPage from "./pages/single/manga/single_manga.page";
import UserProfilePage from "./pages/user/profile/userProfile.page";
import UserLikesPage from "./pages/user/profile/userLikes/userLikes.page";
import NavbarComponent from "./components/nav/navbar.component";
import SingleBookPage from "./pages/single/book/single_book.page";
import SingleCharacterPage from "./pages/single/character/single_character.page";
import ForgetPasswordPage from "./pages/user/forgot-password/forgotPassword.page";
import SearchInMangaPage from "./pages/search/manga/searchInManga.page";
import SearchInCharacterPage from "./pages/search/character/searchInCharacter.page";
import SearchInBookPage from "./pages/search/book/searchInBook.page";
import AllUsersPage from "./pages/user/profile/userAdmin/allUsers.page";
import ContainUpdatePage from "./pages/user/update/containUpdate.page";

function App() {
  const afterLogin = useAfterLogin();

  useEffect(() => {
    const token = localStorage.getItem("finalProjectToken");
    console.log("token", token);
    if (token !== null) {
      afterLogin(token);
    } else {
      return console.log("no token");
    }
  }, []);

  return (
    <Fragment>
      <div className="relative">
        <NavbarComponent />
        <ToastContainer />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="user">
              <Route path="login" element={<LoginUserPage />} />
              <Route path="register" element={<RegisterUserPage />} />
              <Route path="logout" element={<LogoutPage />} />
              <Route path="recoverpassword/:keyParam/:iv/:encryptedData" element={<ForgetPasswordPage />} />
              <Route path="profile">
                <Route path="info" element={<UserProfilePage />}>
                  <Route path="mylikes" element={<UserLikesPage />} />
                  <Route path="allusers" element={<AllUsersPage />} />
                </Route>
                <Route path="update" element={<ContainUpdatePage />} />
              </Route>
            </Route>
            <Route path="admin" element={<PrivateRoutes />}>
              <Route path="addnewmanga" element={<AddNewMangaPage />} />
              <Route path="addnewcharacter" element={<AddNewCharacterPage />} />
              <Route path="addnewbook" element={<AddNewBookPage />} />
            </Route>
            <Route path="collection">
              <Route path="admin" element={<PrivateRoutes />}>
                <Route path="mangas" element={<MangaItemsPage />} />
                <Route path="characters" element={<CharacterItemsPage />} />
                <Route path="books" element={<BookItemsPage />} />
              </Route>
            </Route>
            <Route path="all">
              <Route path="mangas">
                <Route path="get" element={<PublicMangaItemsPage />} />
                <Route path="search" element={<SearchInMangaPage />} />
              </Route>
              <Route path="characters">
                <Route path="get" element={<PublicCharacterItemsPage />} />
                <Route path="search" element={<SearchInCharacterPage />} />
              </Route>
              <Route path="books">
                <Route path="get" element={<PublicBookItemsPage />} />
                <Route path="search" element={<SearchInBookPage />} />
              </Route>
            </Route>

            <Route path="single">
              <Route path="manga/:id/:name" element={<SingleMangaPage />} />
              <Route path="book/:id/:name/:origin" element={<SingleBookPage />} />
              <Route path="character/:id/:name/:origin" element={<SingleCharacterPage />} />
            </Route>
          </Routes>
        </main>

        <FooterComponent />
      </div>
    </Fragment>
  );
}

export default App;
