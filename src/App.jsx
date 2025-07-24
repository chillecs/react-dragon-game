import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "./NavBar.jsx";
import { Register } from "./Register.jsx";
import { SelectDragons } from "./SelectDragons.jsx";
import { FightArena } from "./FightArena.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./AuthContext.jsx";

export function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<SelectDragons />} />
          <Route path="/fight" element={<FightArena />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}
