import React from "react";
import { Link } from "react-router-dom";
import Heart from "../Components/Heart";
import { useStateValue } from "../StateProvider";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Cookies from "js-cookies";
import axios from "axios";
import TrackList from "../Components/TrackList";

function Liked() {
  const [{ user, topTracks }, dispatch] = useStateValue();
  console.log(user);

  React.useEffect(() => {
    // Top Tracks

    async function getTopTracks() {
      const token = Cookies.getItem("SPOTIFY_TOKEN");
      console.log(token);
      try {
        //topTracks
        const r = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
          },
        });

        return r.data;
      } catch (e) {
        console.log(e.message);
      }
    }
    getTopTracks()
      .then((tracks) => {
        console.log(tracks);
        dispatch({
          type: "SET_TOP_TRACKS",
          topTracks: tracks.items,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="liked__songs">
      <div className="liked__song__hero">
        <div className="liked__songs__hero__wrapper">
          <div className="liked__song__thumb">
            <Heart />
          </div>
          <div className="liked__song__hero__textual">
            <span className="hero__title">PLAYLIST</span>
            <h1>Liked Songs</h1>
            <div className="user__info">
              <img
                src={user && user.images[0].url}
                alt="user__avatar"
                className="user__avatar"
                width="25"
                height="25"
              />
              <Link to="/home/profile/null">
                <span className="user__info__uname">
                  {user && user.display_name}
                </span>
              </Link>
              <span className="user__playlist__tracks__counts">60 songs</span>
            </div>
          </div>
        </div>
      </div>
      <div className="playlist__screen__body">
        <div className="playlist__screen__body__header">
          <button className="playlist__play__button">
            <PlayArrowIcon />
          </button>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <GetAppIcon />
          </IconButton>
          <div className="playlist__more_button">
            <span className="more__dot"></span>
          </div>
        </div>

        <div className="playlist__track__lists__header">
          <div className="track__info__left">
            <span className="track_num"># TITLE</span>
          </div>
          <span className="track_album">ALBUM</span>
          <span className="track_date">DATE ADDED</span>
          <span className="track_duration">
            <QueryBuilderIcon />
          </span>
        </div>
        <div className="playlist-tracks">
          {topTracks && topTracks.length > 0 && (
            <div className="profile__top__tracks">
              <div className="tracks__list">
                {topTracks &&
                  topTracks
                    .sort()
                    .map((track) => (
                      <TrackList
                        name={track.name}
                        album_name={track.album.name}
                        image={track.album.images[0].url}
                      />
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Liked;
