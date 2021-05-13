import React from "react";
import { useStateValue } from "../StateProvider";

function Toast() {
  const [{ toast }, dispatch] = useStateValue();

  return (
    <>
      {toast && (
        <div
          className="custom__toast"
          onClick={() => {
            dispatch({
              type: "SET_TOAST",
              toast: !toast,
            });
          }}
        >
          <span className="toast__message">Copied to clipboard</span>
        </div>
      )}
    </>
  );
}

export default Toast;
