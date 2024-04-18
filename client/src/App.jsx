import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard} from "./screens";
import { Groupement } from "./screens/groupement/Goupement";
import { User } from "./screens/user/User";
import { F12Screen } from "./screens/F12/F12";
import { BeneficiaireScreen } from "./screens/beneficiaire/Beneficiaire";
import { DepotScreen } from "./screens/depot/Depot";
import { AgenceScreen } from "./screens/agence/AgenceScreens";
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/groupement" element={<Groupement />} />
            <Route path="/user" element={<User />} />
            <Route path="/F12" element={<F12Screen />} />
            <Route path="/Beneficiaire" element={<BeneficiaireScreen />} />
            <Route path="/depot" element={<DepotScreen />} />
            <Route path="/agence" element={<AgenceScreen />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;
