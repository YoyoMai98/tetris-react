import "./style.css";
import { Routes, Route } from "react-router-dom";

import Game from "./components/Game";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Game rows={20} columns={10} />} />
      </Routes>
    </div>
  );
}