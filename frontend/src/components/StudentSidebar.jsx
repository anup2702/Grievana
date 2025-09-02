import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const username = user.name || "User";
  const profileImage = user.image ? `data:image/jpeg;base64,${user.image}` : null;

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
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 min-w-[200px] md:w-72 h-screen bg-theme-primary shadow-theme p-4 md:p-6 flex flex-col justify-between">

      {/* Top Profile Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <CgProfile size={32} className="text-theme-primary" />
          )}
          <h2 className="text-lg font-semibold text-theme-primary">Greetings, {username}</h2>
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
                    ? "button-theme-primary text-white shadow-theme"
                    : "bg-theme-secondary text-theme-primary hover:bg-theme-tertiary"
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
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-error text-white rounded-md font-semibold hover:bg-error transition"
        >
          <IoIosLogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
