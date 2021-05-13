import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "./SearchIcon";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { useStateValue } from "../StateProvider";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
function Navbar({ type, navColor }) {
  const [
    { accountDropDown, activeTab, user, profie_edit_dropdown },
    dispatch,
  ] = useStateValue();
  console.log(user);
  const history = useHistory();
  const classes = useStyles();
  const image = `https://scontent-maa2-1.xx.fbcdn.net/v/l/t1.6435-9/141262359_1184417768670379_8423145511402179873_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=fdzSSyuwujcAX-Kwvjt&_nc_ht=scontent-maa2-1.xx&oh=a226ad5c4279944606ee771ef4d9c54a&oe=6094E962`;

  const handleDropDown = () => {
    dispatch({
      type: "SET_ACCOUNT_DROPDOWN",
      accountDropdown: !accountDropDown,
    });
  };

  const handleDropdownRemove = (e) => {
    const element = e.target;

    if (
      !element.classList.contains("nav__user__name") &&
      !element.classList.contains("uname") &&
      !element.classList.contains("MuiAvatar-img") &&
      !element.classList.contains("MuiSvgIcon-root")
    ) {
      dispatch({
        type: "SET_ACCOUNT_DROPDOWN",
        accountDropdown: false,
      });
      dispatch({
        type: "SET_EDIT_PROFILE",
        profie_edit_dropdown: false,
      });
    }
  };

  const handleBack = () => {
    history.goBack();
  };
  const handleForward = () => {
    history.goForward();
  };
  return (
    <div
      className={`navbar ${type === "search" && "navbar__black"}`}
      style={{ background: `${type === "search" ? navColor : "#121212"}` }}
      onClick={handleDropdownRemove}
    >
      <div className={`navbar__wrapper navbar__main`}>
        <div className="navbar__left">
          <div className="nav__buttons">
            <button onClick={history.location.pathname !== "/" && handleBack}>
              <ChevronLeftIcon
                style={{ fill: history.location.pathname === "/" && "#000" }}
              />
            </button>
            <button onClick={handleForward}>
              <ChevronRightIcon />
            </button>
          </div>
          {type === "search" && (
            <div className="nav__searchbar">
              <div className="searchbar">
                <span className="search__icon">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  name="key"
                  id="key"
                  placeholder="Artists,songs,or podcasts"
                />
              </div>
            </div>
          )}
          {type === "library" && (
            <div className="library__tabs">
              <Link to="#" className="active__library__tab">
                Playlists
              </Link>
              <Link to="/">Podcasts</Link>
              <Link to="">Artists</Link>
              <Link to="">Albums</Link>
            </div>
          )}
        </div>
        <nav className="nav__user__name" onClick={handleDropDown}>
          <Avatar
            src={user && user.images.length > 0 && user.images[0].url}
            className={`${classes.small}`}
          />
          <span className="uname">{user && user.display_name}</span>
          {!accountDropDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          {accountDropDown && (
            <div className="account__Dropdown">
              <a
                href="https://www.spotify.com/us/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account"
                className="account__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Account <OpenInNewIcon />
              </a>
              <Link to="/home/profile/null">Profile</Link>
              <Link to="/settings">Settings</Link>
              <hr />
              <Link to="/login">Log out</Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
