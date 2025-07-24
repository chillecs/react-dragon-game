import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

export function DeleteProfile() {
  const navigate = useNavigate();

  const { accessToken, user, logout } = useAuthContext();

  useEffect(() => {
    fetch(`${apiUrl}/users/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then(user);
  }, [user.id, accessToken]);

  async function handleDelete() {
    const shouldDelete = confirm(
      `Are you sure you want to delete your account?`
    );

    if (shouldDelete) {
      try {
        const response = await fetch(`${apiUrl}/users/${user.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to change password");
        }
        logout();
      } catch (error) {
        alert("Error changing password. Please try again.");
      }
    }
  }

  if (!user) {
    return navigate("/");
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-6 rounded-2xl border-2 text-center h-[300px]">
        <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
        <button className="btn-primary" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </>
  );
}
