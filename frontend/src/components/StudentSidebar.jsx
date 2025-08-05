import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const links = [
    { path: "feed", label: "Feed" },
    { path: "registered", label: "Registered" },
    { path: "solved", label: "Solved" },
    { path: "edit", label: "Edit Profile" },
    { path: "contact", label: "Contact Mgmt" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-w-[200px] h-screen bg-white shadow-md p-6 flex flex-col justify-between">
      
      {/* Top Profile Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <CgProfile size={32} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-blue-600">Greetings, {username}</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 mt-4">
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={`/dashboard/${path}`}
              className={({ isActive }) =>
                `text-sm px-4 py-2 rounded-md font-medium transition flex items-center justify-center ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md font-semibold hover:bg-red-200 transition"
        >
          <IoIosLogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
