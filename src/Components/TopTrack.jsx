import React from "react";
import { Link } from "react-router-dom";

function TopTrack({ name, album_name, artists, image }) {
  return (
    <div className="top-track">
      <div className="top_track__left">
        <img src={image} alt="top_track_thumb" />
        <div className="track__info">
          <h3>{album_name}</h3>
          <div className="track__artists">
            {artists.map((artist) => (
              <Link to="/" className="track__artists">
                {artist.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="track__center">
        <h3 className="track_name">{name}</h3>
      </div>

      <div className="track__right">
        <span className="track__duration">2:34</span>
      </div>
    </div>
  );
}

export default TopTrack;
