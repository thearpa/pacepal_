import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LogInPage from "./Pages/LogInPage";
import RegisterPage from "./Pages/RegisterPage";
import RouteDisplay from "./Pages/RouteDisplay";
import AccountPage from "./Pages/AccountPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/routeDisplay" element={<RouteDisplay />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
}
export default App;
