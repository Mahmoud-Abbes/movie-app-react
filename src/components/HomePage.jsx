import { Carousel } from "react-bootstrap";
import { coverImages } from "../DataBase";
import { Link, useParams } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

const HomePage = () => {
  console.log(useParams());
  return (
    <div style={{ height: "300vh", backgroundColor: "#1953aa" }}>
      <div
        style={{
          height: "89.743vh",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Carousel
          controls={false}
          indicators={false}
          interval={5000}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundColor: "red",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {coverImages.map((el) => (
            <Carousel.Item
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "yellow",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: "300",
                  position: "relative",
                  backgroundImage: `url(${el})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              ></div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="image-over-cover">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "-50px",
            }}
          >
            <MdLocalMovies className="home-image" />
            <h1 className="home-title">Movies for all</h1>
            <span className="home-description">
              Rate your favorite movies, discover new ones, and see what others
              think — all in one simple app!
            </span>
            <Link to="/movies">
              <button
                class="button-36"
                style={{ fontSize: "20px", borderRadius: "35px" }}
              >
                <span style={{ marginRight: "30px" }}>Browse All Movies</span>
                <FaArrowRightLong
                  style={{ fontSize: "25px", marginTop: "-1px" }}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
