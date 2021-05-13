import React from "react";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

function FriendList() {
  return (
    <div className="friendList">
      <div className="friend__list__header">
        <span>Friend Activity</span>
        <PersonAddOutlinedIcon style={{ fill: "#fff" }} />
      </div>
    </div>
  );
}

export default FriendList;
