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

export const renderColor = (trafficLight: TrafficLight) => {
  if (trafficLight.isOff()) {
    return {
      red: colors.off,
      yellow: colors.off,
      green: colors.off,
    };
  }
  if (trafficLight.isRed()) {
    return {
      red: colors.red,
      yellow: colors.grey,
      green: colors.grey,
    };
  }
  if (trafficLight.isYellow()) {
    return {
      red: colors.grey,
      yellow: colors.yellow,
      green: colors.grey,
    };
  }
  if (trafficLight.isGreen()) {
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
