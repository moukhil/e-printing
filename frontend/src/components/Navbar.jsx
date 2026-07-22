import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 rounded-lg"
          />

          <div>
            <h1 className="text-2xl font-bold text-indigo-600">
              E-Printing
            </h1>

            <p className="text-xs text-gray-500">
              Smart Printing Solution
            </p>
          </div>
        </Link>

        {!user ? (
          <div className="flex gap-4">

            <Link
              to="/login"
              className="px-6 py-2 rounded-lg border border-indigo-600 text-indigo-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Register
            </Link>

          </div>
        ) : (
          <div className="flex items-center gap-6">

            <Link to="/">Home</Link>

            <Link to="/Shop">Shop</Link>

            <Link to="/Cart">Cart</Link>

            <Link to="/Orders">Orders</Link>

            <Link
              to="/Profile"
              className="flex items-center gap-3 px-2 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
                {user?.name?.toUpperCase()}
              </div>

            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;