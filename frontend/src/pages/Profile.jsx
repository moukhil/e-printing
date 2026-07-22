import React, { useEffect, useState } from "react";
import { User, Mail, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("user"));

    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white text-4xl font-bold flex items-center justify-center shadow-lg">
            {user.name.toUpperCase()}
          </div>

        </div>

        {/* User Info */}

        <div className="mt-8 space-y-4">

          <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl">
            <User className="text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <h3 className="font-semibold">{user.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl">
            <Mail className="text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <h3 className="font-semibold">{user.email}</h3>
            </div>
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            My Orders
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}