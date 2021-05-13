import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function SideBarOption({ Icon, text, active, setActive, route }) {
  const [{ activeTab }, dispatch] = useStateValue();
  console.log(activeTab);
  const handleActive = () => {
    dispatch({
      type: "SET_ACTIVE_TAB",
      activeTab: text.toLowerCase(),
    });
  };
  return (
    <Link
      to={route}
      className={`sidebar__option ${
        activeTab === text.toLowerCase() && "option__active"
      }`}
      onClick={handleActive}
    >
      <Icon /> <span>{text}</span>
    </Link>
  );
}

export default SideBarOption;
