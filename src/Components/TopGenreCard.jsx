import React from "react";

function TopGenreCard({ title, image, background, setNavColor }) {
  return (
    <a
      className="top-genre-card"
      href="#"
      style={{ background: background }}
      onMouseOver={(e) => setNavColor(background)}
      onMouseLeave={(e) => setNavColor("rgb(2,3,61)")}
    >
      <div className="top-genre-card-wrapper">
        <h3>{title}</h3>

        <img src={image} alt="genre--thumb" />
      </div>
    </a>
  );
}

export default TopGenreCard;
