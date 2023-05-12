import { State } from "../../domain/states";
import { TrafficLight } from "../../domain/trafficLight";

const colors = {
  off: {
    backgroundColor: "black",
  },
  booting: {
    backgroundColor: "grey",
  },
  red: {
    backgroundColor: "#cc3232",
  },
  yellow: {
    backgroundColor: "#e7b416",
  },
  green: {
    backgroundColor: "#2dc937",
  },
  grey: {
    backgroundColor: "grey",
  },
};

export const renderColor = (state: State) => {
  console.log(state);
  if (state === State.Off) {
    return {
      red: colors.off,
      yellow: colors.off,
      green: colors.off,
    };
  }
  if (state === State.Red) {
    return {
      red: colors.red,
      yellow: colors.grey,
      green: colors.grey,
    };
  }
  if (state === State.Yellow) {
    return {
      red: colors.grey,
      yellow: colors.yellow,
      green: colors.grey,
    };
  }
  if (state === State.Green) {
    return {
      red: colors.grey,
      yellow: colors.grey,
      green: colors.green,
    };
  } else {
    return {
      red: colors.grey,
      yellow: colors.grey,
      green: colors.grey,
    };
  }
};
