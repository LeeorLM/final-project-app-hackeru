import { Outlet } from "react-router-dom";
const PublicCollectionPage = () => {
  return (
    <div className="container">
      <div className="collection">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicCollectionPage;
