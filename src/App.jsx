import { Routes, Route, Navigate } from "react-router-dom";
import { SelectDragons } from "./SelectDragons.jsx";
import { FightArena } from "./FightArena.jsx";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SelectDragons />} />
        <Route path="/fight" element={<FightArena />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
