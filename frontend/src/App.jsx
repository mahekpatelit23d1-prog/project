import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewAnalysis from "./pages/NewAnalysis";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AnalysisResult from "./pages/AnalysisResult";

function AppRoutes() {
  const { pathname } = useLocation();
  const hideNavbar = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/NewAnalysis" element={<NewAnalysis />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/analysis-result" element={<AnalysisResult />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;