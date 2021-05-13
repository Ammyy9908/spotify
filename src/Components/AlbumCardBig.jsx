import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function AlbumCardBig({ thumb, artist, type, track }) {
  return (
    <div className="album-card-big">
      <div className={`album__card__image`}>
        <img
          src={thumb}
          alt="album__card__image"
          style={{ borderRadius: type && type === "artist" && "50%" }}
        />
      </div>

      <button className="play__album__large">
        <PlayArrowIcon />
      </button>
      <div className="album__card__meta">
        <a href="#">{track}</a>
        <div className="artists">
          <a href="#">{artist}</a>
        </div>
      </div>
    </div>
  );
}

export default AlbumCardBig;
