import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import NewAnalysis from "./pages/NewAnalysis";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar will be displayed on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/NewAnalysis"
          element={<NewAnalysis />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;