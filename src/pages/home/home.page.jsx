import { useSelector } from "react-redux";
import TopBookMobileComponent from "../../components/home/mobile/book/topBookMobile.component";
import TopCharacterMobileComponent from "../../components/home/mobile/character/topCharacterMobile.component";
import TopMangaMobileComponent from "../../components/home/mobile/manga/topMangaMobile.component";
import BookTopComponent from "../../components/home/top 10/book/bookTop.component";
import CharacterTopComponent from "../../components/home/top 10/character/characterTop.component";
import MangaTop10Component from "../../components/home/top 10/manga/mangaTop10.component";

const HomePage = () => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div>
      <div className="welcome ">
        <h2>Welcome {userData.first_name && <span>{userData.first_name}</span>}</h2>
        <p>here you can arrange your collection of favorite manga , books and characters</p>
      </div>
      <div className="topLists">
        <div className="bg-gray">
          <div className="container row justify-space-between">
            <MangaTop10Component className="col-6-md" />
            <div className="display-f flex-column justify-center align-center col-6-md">
              <h3>Mangas</h3>
              <p className="lan">here you will find all the mangas stored in this site</p>
            </div>
          </div>
        </div>
        <div>
          <div className="container row justify-space-between">
            <div className="display-f flex-column justify-center align-center col-6-md">
              <h3>Books</h3>
              <p>here you will find all the books stored in this site</p>
            </div>
            <BookTopComponent className="col-6-md" />
          </div>
        </div>
        <div className="bg-gray">
          <div className="container row justify-space-between">
            <CharacterTopComponent className="col-6-md" />
            <div className="display-f flex-column justify-center align-center col-6-md">
              <h3>Character</h3>
              <p>here you will find all the characters stored in this site</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mobileTop">
        <TopMangaMobileComponent />
        <TopBookMobileComponent />
        <TopCharacterMobileComponent />
      </div>
    </div>
  );
};

export default HomePage;
