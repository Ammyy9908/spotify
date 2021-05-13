import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Screens/Main";
import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Login from "./Screens/Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebAPI from "spotify-web-api-js";
import axios from "axios";
import Cookies from "js-cookies";
import Playlist from "./Screens/Playlist";

const spotify = new SpotifyWebAPI();

window.onSpotifyWebPlaybackSDKReady = () => {
  // You can now initialize Spotify.Player and use the SDK
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function App() {
  const [{ maxWidthCross, user }, dispatch] = useStateValue();

  const [isUser, setUser] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    function handleResize() {
      if (windowDimensions.width < 968) {
        dispatch({
          type: "SET_MAX_WIDTH",
          width: true,
        });
      } else {
        dispatch({
          type: "SET_MAX_WIDTH",
          width: false,
        });
      }
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  React.useEffect(() => {
    const token = getTokenFromResponse();
    if (token) {
      console.log(token);
      Cookies.setItem("SPOTIFY_TOKEN", token.access_token);
    }
    if (Cookies.getItem("SPOTIFY_TOKEN")) {
      spotify.setAccessToken(Cookies.getItem("SPOTIFY_TOKEN"));
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      // Getting Playlists
      // spotify.getUserPlaylists().then((playlists) => {
      //   dispatch({
      //     type: "SET_PLAYLISTS",
      //     playlists: playlists,
      //   });
      // });

      axios
        .get(`https://api.spotify.com/v1/users/${user && user.id}/playlists`, {
          headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
          },
        })
        .then((r) => {
          console.log("User Playlists", r);
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: r.data.items,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });

      // get current played song

      axios
        .get("https://api.spotify.com/v1/me/player", {
          headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
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

      // SET RECENTS PLAYLIST

      axios
        .get("https://api.spotify.com/v1/me/player/recently-played", {
          headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
          },
        })
        .then((response) => {
          dispatch({
            type: "SET_RECENTS",
            recents: response.data.items,
          });
          return setUser(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isUser]);

  console.log(windowDimensions);
  console.log(maxWidthCross);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Main type="home" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route
            path="/home/:type/:id"
            render={(props) => {
              const type = props.match.params.type;
              const id = props.match.params.id;
              return <Main type={type} id={id && id} />;
            }}
          />
          <Route
            path="/:type/:name"
            render={(props) => {
              const pname = props.match.params.name;
              const type = props.match.params.type;
              return <Main type={type} name={pname} />;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
