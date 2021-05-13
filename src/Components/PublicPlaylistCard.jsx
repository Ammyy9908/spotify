import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function PublicPlaylistCard({ image, id, name }) {
  return (
    <div className="publicPlaylistCard">
      <div className="publicPlaylistCard__wrapper">
        <div className="card__thumb">
          {image ? (
            <img src={image} alt="playlist__cover__image" />
          ) : (
            <img
              src="https://source.unsplash.com/177x177/?nature,water"
              alt="playlist__cover__image"
            />
          )}

          <button className="playButtonPlaylist">
            <PlayArrowIcon />
          </button>
        </div>
        <div className="card__info">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
}

export default PublicPlaylistCard;
