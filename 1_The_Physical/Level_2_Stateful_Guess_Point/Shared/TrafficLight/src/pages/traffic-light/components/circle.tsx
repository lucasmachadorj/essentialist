import { CSSProperties } from "react";
import "./circle.css";

export default ({ color }: { color: CSSProperties }) => (
  <div className="circle" style={color}></div>
);
