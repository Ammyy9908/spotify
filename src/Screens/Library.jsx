import React from "react";
import { useStateValue } from "../StateProvider";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function Library() {
  const [{}, dispatch] = useStateValue();
  React.useEffect(() => {
    //change active tab when comonent state change

    dispatch({
      type: "SET_ACTIVE_TAB",
      activeTab: "your library",
    });
  }, []);
  return (
    <div className="library">
      <div className="library__wrapper">
        <div className="library__header">
          <h3>Playlists</h3>
          <div className="header__library__right">
            <div className="searchbar__small">
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
              <input
                type="text"
                name="key"
                id="key"
                placeholder="Search in playlist"
              />
            </div>
            <div className="order__container">
              Custom Order
              <ArrowDropDownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
