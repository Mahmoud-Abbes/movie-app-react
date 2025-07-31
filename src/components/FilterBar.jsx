import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import ReactStars from "react-stars";

const FilterBar = ({
  movies,
  setQualityFilter,
  setTypeFilter,
  setRatingFilter,
  ratingFilter,
  modifyGenreFilter,
  textFilter,
  typesExtractor,
  qualityExtractor,
  genreExtractor,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div>
      <div className="filter-bar">
        <h1 className="filter-title">
          {textFilter.trim() === ""
            ? "Filter results"
            : `Search results for "${textFilter.trim()}"`}
        </h1>
        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter />
          <span>Filter</span>
        </button>
      </div>

      {showFilter ? (
        <div className="filter-content">
          <div className="filter-types">
            <div style={{ width: "49%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="filter-type-title">Type : </span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="Type"
                    defaultChecked
                    className="radio-input"
                    value="All"
                    onChange={(e) => setTypeFilter(e.target.value)}
                  />
                  <span className="radio-input-title">All</span>
                </div>

                {typesExtractor().map((el, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="radio"
                      name="Type"
                      className="radio-input"
                      value={el}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    />
                    <span className="radio-input-title">{el}</span>
                  </div>
                ))}
              </div>

              <hr style={{ color: "#707070ff" }} />
            </div>
            <div style={{ width: "49%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="filter-type-title">Quality : </span>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="Quality"
                    defaultChecked
                    className="radio-input"
                    value="All"
                    onChange={(e) => setQualityFilter(e.target.value)}
                  />
                  <span className="radio-input-title">All</span>
                </div>
                {qualityExtractor().map((el, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="radio"
                      name="Quality"
                      className="radio-input"
                      value={el}
                      onChange={(e) => setQualityFilter(e.target.value)}
                    />
                    <span className="radio-input-title">{el}</span>
                  </div>
                ))}
              </div>
              <hr style={{ color: "#707070ff" }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                className="filter-type-title"
                style={{ marginRight: "10px" }}
              >
                Rating :
              </span>
              <ReactStars
                className="rating-stars"
                count={5}
                size={27}
                color2={"#ffd700"}
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e)}
              />
            </div>
            <hr style={{ color: "#707070ff" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="filter-type-title">Genre : </span>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {genreExtractor().map((el, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginRight: "15px",
                  }}
                >
                  <input
                    type="checkbox"
                    name="genre"
                    className="genre-input"
                    value={el}
                    style={{ marginRight: "10px" }}
                    onClick={(e) => modifyGenreFilter(e.target.value)}
                  />
                  <label className="genre-label">{el}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FilterBar;
