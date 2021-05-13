import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function RecomendedSongCard({ name, thumb }) {
  return (
    <div className="recommended__album_card">
      <div className="album__thumb">
        <img src={thumb} alt="album-thumb" />
      </div>
      <div className="album__name__card">{name}</div>
      <button className="play__album">
        <PlayArrowIcon />
      </button>
    </div>
  );
}

export default RecomendedSongCard;
