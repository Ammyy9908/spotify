import React from "react";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import TopArtistCard from "../Components/TopArtistCard";
import axios from "axios";
import Cookies from "js-cookies";
import TopTrack from "../Components/TopTrack";
import PublicPlaylistCard from "../Components/PublicPlaylistCard";
import Toast from "../Components/Toast";
import ProfilePopUp from "../Components/ProfilePopUp";

function Profile() {
  const [isRendered, setRendered] = React.useState(false);
  const [
    {
      user,
      topArtist,
      topTracks,
      user_playlists,
      user__folowings,
      profie_edit_dropdown,
      modal,
    },
    dispatch,
  ] = useStateValue();
  React.useEffect(() => {
    //change active tab when comonent state change

    console.log(modal);
    dispatch({
      type: "SET_ACTIVE_TAB",
      activeTab: "profile",
    });

    //fetch top artists

    async function getTopArtists() {
      const token = Cookies.getItem("SPOTIFY_TOKEN");
      console.log(token);
      try {
        //topTracks
        const r = await axios.get("https://api.spotify.com/v1/me/top/artists", {
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

    //SET _USER PLAYLIST

    async function getUserPlaylists() {
      const token = Cookies.getItem("SPOTIFY_TOKEN");
      console.log(token);
      try {
        //topTracks
        const r = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
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

    // Set User followings
    async function getFollowings() {
      //user__folowings

      try {
        const r = await axios.get(
          `https://api.spotify.com/v1/me/following?type=artist`,
          {
            headers: {
              "Content-Type": "application/json",
              AUTHORIZATION: "Bearer " + Cookies.getItem("SPOTIFY_TOKEN"),
            },
          }
        );
        console.log(r.data);

        return r.data;
      } catch (e) {
        console.log(e.message);
      }
    }

    getTopArtists().then((data) => {
      console.log(topArtist);
      dispatch({
        type: "SET_TOP_ARTIST",
        topArtist: data.items,
      });
    });

    getTopTracks().then((data) => {
      dispatch({
        type: "SET_TOP_TRACKS",
        topTracks: data.items,
      });
    });

    getUserPlaylists().then((data) => {
      console.log("User Playlists", data);
      dispatch({
        type: "SET_USER_PLAYLIST",
        user_playlists: data.items.filter(
          (playlist) =>
            user && user.display_name === playlist.owner.display_name
        ),
      });
    });

    getFollowings().then((data) => {
      dispatch({
        type: "SET_FOLLOWINGS",
        user__folowings: data.artists.items,
      });
      return setRendered(true);
    });
  }, [isRendered]);

  console.log(user__folowings && user__folowings);
  return (
    <div className="profile">
      <Toast />
      <ProfilePopUp />
      <div className="profile__wrapper">
        <div className="profile__header">
          <div className="uavatar">
            <img
              src={
                user.images.length
                  ? user.images[0].url
                  : `https://avatars.dicebear.com/api/avataaars/${
                      user && user.display_name
                    }.svg`
              }
              alt="user__avatar"
            />
          </div>
          <div className="user__textual">
            <div className="screen__name">PROFILE</div>
            <h1>{user.display_name}</h1>
            <div className="user__followers">
              <span className="u_playlists">
                {user_playlists && user_playlists.length} Public Playlists
              </span>
              <span className="ufollowers">
                {user && user.followers.total} Followers
              </span>
              <span className="ufollowings">42 followings</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__detailed">
        <div className="profile__detailed__wrapper">
          <div className="profile__sections">
            <div
              className="profile__action"
              onClick={() => {
                dispatch({
                  type: "SET_EDIT_PROFILE",
                  profie_edit_dropdown: !profie_edit_dropdown,
                });
              }}
            >
              <div className="edit__profile__dots"></div>
              {profie_edit_dropdown && (
                <div className="profile__edit__dropdown">
                  <span
                    className="profile__option"
                    onClick={() => {
                      dispatch({ type: "SET_MODAL", modal: true });
                    }}
                  >
                    Edit profile
                  </span>
                  <span
                    className="profile__option"
                    onClick={() => {
                      dispatch({
                        type: "SET_TOAST",
                        toast: true,
                      });
                    }}
                  >
                    Copy link to profile
                  </span>
                </div>
              )}
            </div>
            {topArtist && topArtist.length > 0 && (
              <div className="profile__top__artists">
                <div className="profile__section__header">
                  <div className="profile__section__header__left">
                    <h3>Top artists</h3>
                    <span>Only visible to you</span>
                  </div>
                  <Link to="/">See all</Link>
                </div>
                <div className="artist__cards">
                  {isRendered &&
                    topArtist &&
                    topArtist
                      .slice(0, 5)
                      .map((artist) => (
                        <TopArtistCard
                          name={artist.name}
                          image={artist.images[0].url}
                        />
                      ))}
                </div>
              </div>
            )}

            {topTracks && topTracks.length > 0 && (
              <div className="profile__top__tracks">
                <div className="profile__section__header">
                  <div className="profile__section__header__left">
                    <h3>Top tracks</h3>
                    <span>Only visible to you</span>
                  </div>
                  <Link to="/">See all</Link>
                </div>
                <div className="tracks__list">
                  {topTracks &&
                    topTracks
                      .sort()
                      .slice(12, -1)
                      .map((track) => (
                        <TopTrack
                          name={track.name}
                          album_name={track.album.name}
                          artists={track.album.artists}
                          image={track.album.images[0].url}
                        />
                      ))}
                </div>
              </div>
            )}

            <div className="profile__public__playlists">
              <div className="profile__section__header">
                <div className="profile__section__header__left">
                  <h3>Public Playlists</h3>
                  <div className="public__playlists">
                    {user_playlists &&
                      user_playlists.map((playlist) => (
                        <PublicPlaylistCard
                          image={
                            playlist.images.length > 0 && playlist.images[0].url
                          }
                          name={playlist.name}
                          key={playlist.id}
                          id={playlist.id}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {user__folowings && user__folowings.length > 0 && (
              <div className="profile__top__artists">
                <div className="profile__section__header">
                  <div className="profile__section__header__left">
                    <h3>Followings</h3>
                  </div>
                  <Link to="/">See all</Link>
                </div>
                <div className="artist__cards">
                  {isRendered &&
                    user__folowings
                      .slice(0, 5)
                      .map((item, i) => (
                        <TopArtistCard
                          key={i}
                          name={item.name}
                          image={item.images[0].url}
                        />
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
