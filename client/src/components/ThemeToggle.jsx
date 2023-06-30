import {useContext} from "react";
import "./ThemeToggle.css";
import { ThemeContext } from "../ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="checkbox-div">
      <input type="checkbox" class="checkbox" id="checkbox" onClick={toggleTheme}/>
      <label for="checkbox" class="checkbox-label">
        <i class="fas"></i>
        <i class="fas"></i>
        <span class="ball"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
