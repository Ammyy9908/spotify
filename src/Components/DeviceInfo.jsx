import React from "react";
import { useStateValue } from "../StateProvider";

function DeviceInfo() {
  const [{ currentTrack }] = useStateValue();
  return (
    <>
      {currentTrack.is_playing && (
        <div className="DeviceInfo">
          <span>
            You are listening in{" "}
            <strong style={{ fontWeight: 900 }}>
              {currentTrack.device.name.toUpperCase()}
            </strong>
          </span>
        </div>
      )}
    </>
  );
}

export default DeviceInfo;
