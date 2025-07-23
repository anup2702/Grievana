import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const AdminSidebar = () => {
  const links = [
    { path: "feed", label: "Feed" },
    { path: "solved", label: "Solved" },
    { path: "edit", label: "Edit Profile" },
  ];

  return (
    <div className="w-70 h-screen bg-white shadow-md p-4 flex flex-col gap-10 justify-evenly">
      <div className="flex items-center gap-10">
        {/* <img src="" alt="profile_img" /> */}
        <CgProfile size={30}/>
        <h2 className="text-xl font-bold text-blue-600">Greetings, user</h2>
      </div>
      {links.map(({ path, label }) => (
        <NavLink
          key={path}
          to={`/dashboard/${path}`}
          className={({ isActive }) =>
            `text-sm px-4 py-2 rounded-md transition text-center h-8 w-full flex items-center justify-center ${
              isActive
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
      <div className="mt-auto flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md font-semibold hover:bg-red-200 transition shadow"
        >
          <IoIosLogOut size={30} />
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
