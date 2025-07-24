import { Routes, Route } from "react-router-dom";
import { NavBar } from "./NavBar.jsx";
import { Register } from "./Register.jsx";
import { Login } from "./Login.jsx";
import { SelectDragons } from "./SelectDragons.jsx";
import { FightArena } from "./FightArena.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider, useAuthContext } from "./AuthContext.jsx";
import { ManageProfile } from "./manage-profile/ManageProfile.jsx";

export function App() {
  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <AppRoutes />
        </main>
      </div>
    </AuthContextProvider>
  );
}

function AppRoutes() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        {!user && (
          <>
            <Route path="register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        {user && (
          <>
            <Route path="/" element={<SelectDragons />} />
            <Route path="fight" element={<FightArena />} />
            <Route path="manage-profile" element={<ManageProfile />} />
          </>
        )}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <ToastContainer />
    </>
  );
}
