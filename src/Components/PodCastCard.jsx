import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function PodCastCard({ thumb, author, title }) {
  return (
    <div className="podCastCard">
      <div className="podCastCard__wrapper">
        <div className="podCastCard__top">
          <div className="podcast__thumb">
            <img src={thumb} alt="podcast__thumb" />
          </div>
          <button className="play__podcast__button">
            <PlayArrowIcon />
          </button>
        </div>
        <div className="podCastCard__bottom">
          <a href="#" className="podcast__link">
            {title}
          </a>
          <span className="podcast__author">{author}</span>
        </div>
      </div>
    </div>
  );
}

export default PodCastCard;
