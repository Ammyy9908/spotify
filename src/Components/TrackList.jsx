import React from "react";

function TrackList({ name, image, number }) {
  return (
    <div className="track-list">
      <div className="track__info__left">
        <span className="track__number">{number}</span>
        <img src={image} alt="track__thumb" />
      </div>
      <span className="track__name">{name}</span>
      <span className="track__date__added">2 days ago</span>
      <span className="track__duration">3:05</span>
    </div>
  );
}

export default TrackList;
