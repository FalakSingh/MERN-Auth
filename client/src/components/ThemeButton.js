import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext } from "react";
import { themeContext } from "../App";

export default function ThemeButton(props) {
  const themeVal = useContext(themeContext);

  return (
    <span
      onClick={() => {
        props.themeChange(!themeVal);
      }}
      className="theme-mode"
    >
      {themeVal ? (
        <LightModeOutlinedIcon fontSize="large" />
      ) : (
        <DarkModeOutlinedIcon fontSize="large" />
      )}
    </span>
  );
}
