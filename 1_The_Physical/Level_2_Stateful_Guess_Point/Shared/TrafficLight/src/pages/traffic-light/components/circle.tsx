import { CSSProperties } from "react";
import "./circle.css";

type Props = {
  color: CSSProperties;
};

export default ({ color }: Props) => (
  <div className="circle" style={color}></div>
);
