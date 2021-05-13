import React from "react";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Body from "../Components/Body";
import FriendList from "../Components/FriendList";
import Player from "../Components/Player";
import { useStateValue } from "../StateProvider";
import Login from "./Login";
import DeviceInfo from "../Components/DeviceInfo";

function Main({ type, id }) {
  console.log(type);
  const [navColor, setNavColor] = React.useState("rgb(2,3,61)");
  const [{ maxWidthCross, user }] = useStateValue();

  return (
    <React.Fragment>
      {!maxWidthCross ? (
        <>
          {user ? (
            <div className="App">
              <Sidebar />
              <Navbar
                type={type}
                navColor={type === "search" ? navColor : "#121212"}
              />
              <Body type={type} setNavColor={setNavColor} id={id} />
              <FriendList />
              <Player />
            </div>
          ) : (
            <Login />
          )}
        </>
      ) : (
        <div className="small_screen_message">
          <h1>Application doesn't support small Screens</h1>
          <p>Please Increase Your Device Width or Run in Desktop</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Main;
