import React from "react";

import { accessUrl } from "../spotify";
import Cookies from "js-cookies";

function Login() {
  React.useEffect(() => {
    Cookies.removeItem("SPOTIFY_TOKEN");
  }, []);

  return (
    <div className="login_screen">
      <div className="login__modal">
        <div className="login__modal__wrapper">
          <div className="brand__logo">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
              alt="brand__logo"
            />
          </div>
          <h1>Millions of songs. Free on Spotify</h1>
          <a className="login__button" href={accessUrl}>
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
