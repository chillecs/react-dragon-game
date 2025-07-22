import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import { SelectDragons } from "./SelectDragons.jsx";
import { FightArena } from "./FightArena.jsx";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./AuthContext.jsx";
import { Navigation } from "./Navigation.jsx";

export function App() {
  return (
    <>
      <AuthContextProvider>
        <div className="flex flex-col h-screen">
          <Navigation />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<SelectDragons />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="fight" element={<FightArena />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </main>
        </div>
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}
