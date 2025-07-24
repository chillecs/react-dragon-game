import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthContext";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export function ChangeEmail() {
  const [formData, setFormData] = useState({
    newEmail: "",
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

    // Use a simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.newEmail)) {
      setError("Please enter a valid email.");
      return;
    }

    await fetch(`${apiUrl}/users/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({ email: formData.newEmail }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    toast.success("Email changed successfully!");
    setFormData({ newEmail: "" });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-2xl border-2 text-center h-[300px]">
      <h2 className="text-2xl font-bold mb-4">Change Email</h2>
      <input
        onChange={handleInputChange}
        name="newEmail"
        type="text"
        placeholder="New Email"
        className="p-2 rounded-md border-2 border-gray-300"
        value={formData.newEmail}
      />
      {error && <p className="inputError">{error}</p>}
      <button className="btn-primary" onClick={handleChangePassword}>
        Change Email
      </button>
    </div>
  );
}
