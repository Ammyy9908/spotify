import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { useStateValue } from "../StateProvider";
function ProfilePopUp() {
  const [{ modal, user }, dispatch] = useStateValue();
  const [value, setValue] = React.useState(user && user.display_name);

  const handlePopUpClose = (e) => {
    if (e.target.classList.contains("popup__backdrop")) {
      dispatch({ type: "SET_MODAL", modal: !modal });
    }
  };
  return (
    <>
      {modal && (
        <div className="popup__backdrop" onClick={handlePopUpClose}>
          <div className="profile-pop">
            <div className="pop-up__wrapper">
              <div className="popup__haeder">
                <h3>Profile Details</h3>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="popup__body">
                <div className="user__avatar">
                  <img
                    src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=266418780470287&height=300&width=300&ext=1621102815&hash=AeQDXKiKGlzwy8yhnPI"
                    alt="user__avatar"
                  />
                </div>

                <div className="fields">
                  <div className="form__control">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <button className="save__button">SAVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePopUp;
