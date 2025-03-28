import { Routes, Route, Navigate } from "react-router-dom";
import HousePrediction from "./components/Houseprediction.js";
import Loginpage from "./components/Login.js"; 

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/houseprediction" element={<HousePrediction />} />
      </Routes>
  );
}

export default App;
