import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Add from "./Add";
import Heart from "./Heart";
import Home from "./Home";
import Library from "./Library";
import Search from "./Search";
import SideBarOption from "./SideBarOption";

function Sidebar() {
  const options = [
    { id: 1, text: "Home", icon: Home, active: true, route: "/" },
    {
      id: 2,
      text: "Search",
      icon: Search,
      active: false,
      route: "/home/search/null",
    },
    {
      id: 3,
      text: "Your Library",
      icon: Library,
      active: false,
      route: "/home/library/null",
    },
  ];

  const [{ playlists }, dispatch] = useStateValue();

  console.log(playlists && playlists);

  const handleDropdownRemove = () => {
    dispatch({
      type: "SET_ACCOUNT_DROPDOWN",
      accountDropdown: false,
    });
  };
  return (
    <div className="sidebar" onClick={handleDropdownRemove}>
      <div className="sidebar__wrapper">
        {/* <div className="brand-logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="brand__logo"
            className="brand__logo"
          />
        </div> */}
        <div className="sidebar__options">
          {options.map((option) => {
            return (
              <SideBarOption
                text={option.text}
                Icon={option.icon}
                route={option.route}
              />
            );
          })}
          <br />
          <div className="personal__lists">
            <div className="personal__list">
              <div className="personal__icon add__icon">
                <Add />
              </div>
              <span>Create PlayList</span>
            </div>
            <Link className="personal__list" to="/libraries/liked">
              <div className="personal__icon like__icon">
                <Heart />
              </div>
              <span>Liked Songs</span>
            </Link>
          </div>
          <div
            style={{
              height: "1px",
              width: "100%",
              marginTop: "5px",
              marginBottom: "5px",
              backgroundColor: "#999",
            }}
          />
          <div className="uplaylists">
            {playlists != null &&
              playlists.map((playlist) => (
                <Link to={`/home/playlist/${playlist.id}`}>
                  {playlist.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
