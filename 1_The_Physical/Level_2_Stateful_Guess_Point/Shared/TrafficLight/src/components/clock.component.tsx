import { useEffect } from "react";
import { clock } from "../core/domain";
import { observer } from "mobx-react";

export const Clock = observer(() => {
  useEffect(() => {
    const interval = setInterval(() => {
      clock.tick();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>Clock time: {clock.getCurrentTime()} s</div>
      <div>Cycles: {Math.floor(clock.getCurrentTime() / 60)} </div>
    </div>
  );
});
