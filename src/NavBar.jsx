import React from "react";
import { Link } from "react-router";
import { useAuthContext } from "./AuthContext";

export function NavBar() {
  const { user, logout } = useAuthContext();
  return (
    <nav className="flex flex-row items-center justify-end gap-4 p-2 bg-[#03071200] mt-6 mr-6">
      {!user && (
        <>
          <Link to="/register" className="btn-primary mr-4">
            Register
          </Link>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </>
      )}
      {user && (
        <>
          <div className="flex flex-row items-center justify-center gap-4">
            <p className="text-white">Welcome, {user.firstName}</p>
            <button onClick={logout} className="btn-primary mr-4">
              Logout
            </button>
            <Link to="/manage-profile" className="btn-primary mr-4">
              Manage Profile
            </Link>
            <Link to="/" className="btn-primary">
              Home
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
