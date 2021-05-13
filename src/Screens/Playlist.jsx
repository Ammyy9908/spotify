import React from "react";
import axios from "axios";
import Cookies from "js-cookies";
import analyze from "rgbaster";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import TrackList from "../Components/TrackList";
import Skeleton from "@material-ui/lab/Skeleton";
function Playlist({ id }) {
  const [playlist, setPlaylist] = React.useState(null);
  const [isDone, setDone] = React.useState(false);
  const [color, setColor] = React.useState(null);

  // or an URL (of your own server)
  var img = playlist && playlist.images[0].url;

  if (img) {
    const result = analyze(img); // also supports base64 encoded image strings
    result.then((result) => {
      setColor(result[1].color);
      console.log(
        `The dominant color is ${result[0].color} with ${result[0].count} occurrence(s)`
      );
    });
  }

  // calculate duration for playlists

  let dur = 0;

  playlist &&
    playlist.tracks.items.forEach((song) => {
      dur += song.track.duration_ms;
    });

  console.log("Total duration", dur);

  let min = Math.floor((dur / 1000 / 60) % 60);
  let hours = Math.floor((dur / 1000 / 60 / 60) << 0);

  //   // => The  dominant color is rgb(0,0,255) with 2 occurrence(s)

  //   console.log(
  //     `The secondary color is ${result[1].color} with ${result[1].count} occurrence(s)`
  //   );

  //fetch playlist info by its id

  React.useEffect(() => {
    const getPlaylist = async () => {
      try {
        const r = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
            },
          }
        );
        return r.data;
      } catch (e) {
        if (e.response && e.response.data) {
          console.log(e.response.data);
        }
      }
    };

    getPlaylist().then((playlist) => {
      console.log(playlist);
      setPlaylist(playlist);
      return setDone(true);
    });
  }, [id]);

  console.log(playlist && playlist);

  return (
    <>
      {color && (
        <div>
          <div className="playlist__screen" style={{ backgroundColor: color }}>
            <div className="playlist__screen__wrapper">
              <div className="play__list__hero">
                {isDone && (
                  <div className="play__list__hero__container">
                    <div className="playlist__thumb">
                      <img src={playlist.images[0].url} alt="playlist__thumb" />
                    </div>
                    <div className="play__list__details__section">
                      <h4>Playlist</h4>
                      <h1>{playlist.name}</h1>
                      <span className="play__list__desc">
                        {playlist.description}
                      </span>
                      <div className="playlist__statics">
                        <span className="playlist__likes">0 likes</span>
                        <span className="playlist__songs__count">
                          {playlist.tracks.items.length} songs
                        </span>
                        <span className="playlist__song_dur">
                          {hours} hr {min}min.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
              {playlist.tracks.items.length > 0 ? (
                playlist.tracks.items.map((track, i) => {
                  return (
                    <TrackList
                      name={track.track.name}
                      key={i}
                      image={track.track.album.images[0].url}
                      number={i + 1}
                    />
                  );
                })
              ) : (
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={45}
                  animation="wave"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Playlist;
