import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import Library from "../Screens/Library";
import Liked from "../Screens/Liked";
import Playlist from "../Screens/Playlist";
import Profile from "../Screens/Profile";
import SearchScreen from "../Screens/SearchScreen";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";

function Body({ type, setNavColor, id }) {
  const [{}, dispatch] = useStateValue();

  const handleDropdownRemove = (e) => {
    dispatch({
      type: "SET_ACCOUNT_DROPDOWN",
      accountDropdown: false,
    });
    if (
      !e.target.classList.contains("profile__action") &&
      !e.target.classList.contains("edit__profile__dots")
    ) {
      dispatch({
        type: "SET_EDIT_PROFILE",
        profie_edit_dropdown: false,
      });
    }
  };
  return (
    <div
      className={`body ${type === "search" && "body__dark"}`}
      onClick={handleDropdownRemove}
    >
      {type === "home" && <HomeScreen />}
      {type === "search" && <SearchScreen setNavColor={setNavColor} />}
      {type === "library" && <Library />}
      {type === "profile" && <Profile />}
      {type === "playlist" && <Playlist id={id} />}
      {type === "libraries" && <Liked />}
    </div>
  );
}

export default Body;
