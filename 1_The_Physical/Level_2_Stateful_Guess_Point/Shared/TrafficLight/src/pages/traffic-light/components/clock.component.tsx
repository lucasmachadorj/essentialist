import { useEffect } from "react";
import { observer } from "mobx-react";
import { controller } from "..";

export const Clock = observer(({ currentTime }: { currentTime: number }) => {
  return (
    <div>
      <div>Clock time: {currentTime} s</div>
      <div>Cycles: {Math.floor(currentTime / 60)} </div>
    </div>
  );
});
