import React from "react";
import { DeleteProfile } from "./DeleteProfile.jsx";
import { ChangePassword } from "./ChangePassword.jsx";
import { ChangeEmail } from "./ChangeEmail.jsx";

export function ManageProfile() {
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
          <ChangePassword />
          <ChangeEmail />
          <DeleteProfile />
        </div>
      </div>
    </>
  );
}
