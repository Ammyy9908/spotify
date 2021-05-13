import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { IconButton } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import HeightOutlinedIcon from "@material-ui/icons/HeightOutlined";
import VolumeOffOutlinedIcon from "@material-ui/icons/VolumeOffOutlined";
import PauseIcon from "@material-ui/icons/Pause";
import { useStateValue } from "../StateProvider";
import DeviceInfo from "./DeviceInfo";
import axios from "axios";
import Cookies from "js-cookies";

function Player() {
  const [volume, setVolume] = React.useState(0);
  const [isPlay, setPlay] = React.useState(false);
  const [{ currentTrack }, dispatch] = useStateValue();

  const handleVolume = (e) => {
    setVolume(e.target.value);
    fetch(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const token = Cookies.getItem("SPOTIFY_TOKEN");

  const handlePrevSong = () => {
    fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(function (response) {
      if (response.status !== 204) {
        return alert("Skipping to Previous song only for Premium Users");
      }
      axios
        .get("https://api.spotify.com/v1/me/player", {
          headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log("current track", response);
          dispatch({
            type: "SET_CURRENT_TRACK",
            currentTrack: response.data,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
  };

  const handleNextSong = () => {
    fetch("https://api.spotify.com/v1/me/player/next", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        if (response.status !== 204) {
          return alert("Skipping to Next song only for Premium Users");
        }
        axios
          .get("https://api.spotify.com/v1/me/player", {
            headers: {
              "Content-Type": "application/json",
              AUTHORIZATION: "Bearer " + token,
            },
          })
          .then((response) => {
            console.log("current track", response);
            dispatch({
              type: "SET_CURRENT_TRACK",
              currentTrack: response.data,
            });
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              console.log(err.response.data);
            }
          });
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      });
  };

  //handle pause
  const handlePause = () => {
    console.log("Pause");
    setPlay(false);
    fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
      },
    })
      .then((response) => {
        fetch("https://api.spotify.com/v1/me/player", {
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            dispatch({
              type: "SET_CURRENT_TRACK",
              currentTrack: data,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle play
  const handlePlay = () => {
    setPlay(true);
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
      },
    })
      .then((response) => {
        fetch("https://api.spotify.com/v1/me/player", {
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            dispatch({
              type: "SET_CURRENT_TRACK",
              currentTrack: data,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {currentTrack && (
        <div className="player">
          <div className="player__wrapper">
            <div className="player__left">
              <div className="song__info">
                <div className="song__thumb">
                  <img
                    src={currentTrack.item.album.images[0].url}
                    alt="song-thumb"
                  />
                </div>
                <div className="song__text__info">
                  <strong className="song__name">
                    {currentTrack.item.name}
                  </strong>
                  <span className="song__album">
                    {currentTrack.item.artists[0].name}
                  </span>
                </div>
              </div>
            </div>
            <div className="player__center">
              <div className="player__center__top">
                <IconButton onClick={handlePrevSong}>
                  <SkipPreviousIcon style={{ fill: "#fff" }} />
                </IconButton>
                <button
                  className="play__button"
                  onClick={() => (!isPlay ? handlePlay() : handlePause())}
                >
                  {!currentTrack.is_playing ? <PlayArrowIcon /> : <PauseIcon />}
                </button>

                <IconButton onClick={handleNextSong}>
                  <SkipNextIcon style={{ fill: "#fff" }} />
                </IconButton>
              </div>
              <div className="player__center__bottom">
                <span className="time_elapsed">
                  {Math.floor((currentTrack.progress_ms / 1000 / 60) << 0) +
                    ":" +
                    Math.floor((currentTrack.progress_ms / 1000) % 60)}
                </span>
                <div className="player__progress">
                  <div
                    className="progress__value"
                    style={{
                      width:
                        (currentTrack.progress_ms /
                          currentTrack.item.duration_ms) *
                          100 +
                        "%",
                      height: "100%",
                    }}
                  ></div>
                </div>
                <span className="time_elapsed">
                  {Math.floor(
                    (currentTrack.item.duration_ms / 1000 / 60) << 0
                  ) +
                    ":" +
                    Math.floor((currentTrack.item.duration_ms / 1000) % 60)}
                </span>
              </div>
            </div>
            <div className="player__right">
              <div className="player__volume__control">
                {volume < 1 ? (
                  <VolumeOffOutlinedIcon
                    style={{ fill: "#ccc", fontSize: "16px" }}
                  />
                ) : (
                  <VolumeUpIcon style={{ fill: "#ccc", fontSize: "16px" }} />
                )}
                <div className="player__song__volume__range">
                  <div
                    className="volume__range"
                    style={{ width: volume + "%" }}
                    id="volume__range"
                  >
                    <span className="thumb" id="thumb"></span>
                  </div>
                  <input
                    type="range"
                    name="volume"
                    id="volume"
                    value={volume}
                    min="0"
                    max="100"
                    onChange={handleVolume}
                  />
                </div>
                <HeightOutlinedIcon
                  style={{ fill: "#fff", transform: "rotate(45deg)" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Player;
