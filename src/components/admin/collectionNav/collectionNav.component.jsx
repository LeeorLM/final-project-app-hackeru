import { Link } from "react-router-dom";

const CollectionNavComponent = () => {
  return (
    <div className="row">
      <Link to="/collection/admin/mangas" className="btn btn-primary col-4">
        Mangas
      </Link>
      <Link to="/collection/admin/characters" className="btn btn-primary col-4">
        Characters
      </Link>
      <Link to="/collection/admin/books" className="btn btn-primary col-4">
        Books
      </Link>
    </div>
  );
};

export default CollectionNavComponent;
