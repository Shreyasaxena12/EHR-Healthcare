import { Outlet } from "react-router-dom";

export default function DoctorsLayout() {
  return (
    <div className="p-4">
      {/* Optional: Add sidebar or topnav here */}
      <Outlet />
    </div>
  );
}
