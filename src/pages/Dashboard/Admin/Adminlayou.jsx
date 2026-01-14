import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayou() {
  return (
    <div className="admin-layout p-4">
      {/* You can add a sidebar or admin header here */}
      <Outlet />
    </div>
  );
}
