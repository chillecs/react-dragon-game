import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const apiUrl = import.meta.env.VITE_API_URL;

export function ChangePassword() {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });
  const [error, setError] = useState("");

  const { user, accessToken } = useAuthContext();

  useEffect(() => {
    fetch(`${apiUrl}/users/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [user.id, accessToken]);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6 || formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    await fetch(`${apiUrl}/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({ password: formData.newPassword }),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    toast.success("Password changed successfully!");
    setFormData({ password: "", newPassword: "" });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-2xl border-2 text-center h-[300px]">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <input
        onChange={handleInputChange}
        name="password"
        type="password"
        placeholder="Current Password"
        className="p-2 rounded-md border-2 border-gray-300"
        value={formData.password}
      />
      <input
        onChange={handleInputChange}
        name="newPassword"
        type="password"
        placeholder="New Password"
        className="p-2 rounded-md border-2 border-gray-300"
        value={formData.newPassword}
      />
      {error && <p className="inputError">{error}</p>}
      <button className="btn-primary" onClick={handleChangePassword}>Change Password</button>
    </div>
  );
}
