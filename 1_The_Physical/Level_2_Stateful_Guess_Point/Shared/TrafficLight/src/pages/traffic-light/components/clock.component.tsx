import { observer } from "mobx-react";
import { CSSProperties } from "react";
import "./clock.css";

export const Clock = observer(({ currentTime }: { currentTime: number }) => {
  return (
    <div
      className="clock"
      style={
        {
          "--seconds": `${currentTime % 60}`,
        } as CSSProperties
      }
    >
      <span className="clock__seconds" />
    </div>
  );
});
