import { useState, useEffect } from "react";
import { useAuthContext } from "../AuthContext.jsx";
import { DeleteProfile } from "./DeleteProfile.jsx";
import { ChangePassword } from "./ChangePassword.jsx";
import { ChangeEmail } from "./ChangeEmail.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

export function ManageProfile() {
  const { user, accessToken } = useAuthContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${apiUrl}/users/${user.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setUserData(data);
    }

    if (user && accessToken) {
      fetchUserData();
    }
  }, [user, accessToken]);

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Manage Profile</h1>
          
          {/* User Information Display */}
          <div className="rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                  <div className="p-3 rounded-md border">
                    {userData?.firstName || user?.firstName || 'Not available'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                  <div className="p-3 rounded-md border">
                    {userData?.lastName || user?.lastName || 'Not available'}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <div className="p-3 rounded-md border">
                  {userData?.email || user?.email || 'Not available'}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
            <ChangePassword />
            <ChangeEmail />
            <DeleteProfile />
          </div>
        </div>
      </div>
    </>
  );
}
