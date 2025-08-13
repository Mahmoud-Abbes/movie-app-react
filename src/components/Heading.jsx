import { useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdLocalMovies, MdOutlineSearch } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import AddMovie from "./Admin/AddMovie";
import { BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";

const Heading = ({
  setTextFilter,
  typesExtractor,
  qualityExtractor,
  genreExtractor,
}) => {
  const [showAddMovie, setShowAddMovie] = useState(false);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { currentPage } = useSelector((state) => state.reducer);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <div>
      <Navbar
        expand="lg"
        className={`hading-bar ${
          currentPage === "Movie" ? "movie-heading" : null
        }`}
      >
        <AddMovie
          typesExtractor={typesExtractor}
          qualityExtractor={qualityExtractor}
          genreExtractor={genreExtractor}
          show={showAddMovie}
          setShow={setShowAddMovie}
        />
        <Container fluid>
          <Link
            to="/"
            style={{
              width: "20%",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Navbar.Brand id="nav-image">
              <MdLocalMovies style={{ marginRight: "15px" }} />
              <span className="nav-title">
                {currentPage !== "Home" ? "MOVIES FOR ALL" : null}
              </span>
            </Navbar.Brand>
          </Link>

          <Form className="d-flex" id="search-bar">
            {currentPage === "Movies" ? (
              <>
                <Button id="search-btn">
                  <MdOutlineSearch />
                </Button>
                <Form.Control
                  type="search"
                  placeholder="Enter keywords"
                  className="me-2"
                  aria-label="Search"
                  id="search-input"
                  onChange={(e) => setTextFilter(e.target.value)}
                />
              </>
            ) : null}
          </Form>

          <div className="nav-icons" style={{ width: "20%" }}>
            {currentPage === "Home" ? (
              <div>
                <Link to="/movies">
                  <BiMovie className="nav-icon" />
                </Link>
                {currentUser ? (
                  currentUser.role === "Admin" ? (
                    <RiAdminLine className="nav-icon" onClick={() => setShowProfileDropdown(!showProfileDropdown)}/>
                  ) : (
                    <AiOutlineUser className="nav-icon" onClick={() => setShowProfileDropdown(!showProfileDropdown)} />
                  )
                ) : (
                  <Link to={"/login"}>
                    <IoMdLogIn className="nav-icon" />
                  </Link>
                )}
              </div>
            ) : currentPage === "Movies" ? (
              currentUser && currentUser.role === "Admin" ? (
                <>
                  <FaPlus
                    className="nav-icon"
                    onClick={() => setShowAddMovie(true)}
                  />
                  <RiAdminLine className="nav-icon" onClick={() => setShowProfileDropdown(!showProfileDropdown)}/>
                </>
              ) : (
                <AiOutlineUser className="nav-icon" onClick={() => setShowProfileDropdown(!showProfileDropdown)}/>
              )
            ) : (
              <>
                <Link to="/movies">
                  <BiMovie className="nav-icon" />
                </Link>
                <AiOutlineUser className="nav-icon" onClick={() => setShowProfileDropdown(!showProfileDropdown)}/>
              </>
            )}
            
            {showProfileDropdown ? <ProfileDropdown setShow={setShowProfileDropdown}/> : null}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Heading;
