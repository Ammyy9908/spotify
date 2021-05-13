import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function TopArtistCard({ name, image }) {
  return (
    <div className="top-artist-card">
      <div className="artist__card__wrapper">
        <div className="artist__image">
          <img src={image} alt="top-artist-thumb" />
        </div>
        <button className="artist__playbutton">
          <PlayArrowIcon />
        </button>
        <div className="artist__info">
          <h3>{name}</h3>
          <span className="type_artist">Artist</span>
        </div>
      </div>
    </div>
  );
}

export default TopArtistCard;
