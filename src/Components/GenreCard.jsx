import React from "react";

function GenreCard({ image, background, title, setNavColor }) {
  return (
    <a
      className="GenreCard"
      href="#"
      style={{ background: background }}
      onMouseOver={(e) => setNavColor(background)}
      onMouseLeave={(e) => setNavColor("rgb(2,3,61)")}
    >
      <div className="genre-card-wrapper">
        <h3>{title}</h3>
        {image != null && <img src={image} alt="card__thumb" />}
        {image === null && <div className="fallback__image"></div>}
      </div>
    </a>
  );
}

export default GenreCard;
