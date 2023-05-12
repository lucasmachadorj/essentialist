import { observer } from "mobx-react";
import { CSSProperties } from "react";
import "./clock.css";

type Props = {
  currentTime: number;
};

export const Clock = ({ currentTime }: Props) => {
  return (
    <>
      <div className="description">Total time: {currentTime} </div>
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
    </>
  );
};
