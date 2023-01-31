import { Link, Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="container">
      <div className="admin">
        <div className="row">
          <Link to="/admin/addnewmanga" className="btn btn-primary col-4">
            Add New Manga
          </Link>
          <Link to="/admin/addnewcharacter" className="btn btn-primary col-4">
            Add New Character
          </Link>
          <Link to="/admin/addnewbook" className="btn btn-primary col-4">
            Add New Book
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
