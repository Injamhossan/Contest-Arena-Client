import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import NavLogo from "../../../assets/logo.svg";
import { useAuth } from "../../../contexts/AuthContext";
import { LogOut, User, Shield, Users, Trophy } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setShowDropdown(false);
  };

  const links = (
    <>
      <Link to="/all-contests">
        <li>All Contest</li>
      </Link>
      <Link to="/leaderboard">
        <li>Leaderboard</li>
      </Link>
      <Link to="/about">
        <li>About</li>
      </Link>
      <Link to="/support-team">
        <li>Support Team</li>
      </Link>
    </>
  );

  return (
    <div className="py-1 sticky top-0 z-50 bg-white/90 backdrop-blur shadow-md">
      <div className="navbar mx-auto max-w-[1800px] ]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-gray-400"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img src={NavLogo} alt="Nav Logo" className="h-[50px]" />
            <span className="text-xl font-bold bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] bg-clip-text text-transparent">
              Contest Arena
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-400 hover:text-gray-700 gap-5 text-[15px]">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#4a37d8] to-[#6928d9] flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="hidden md:block text-gray-700 font-medium">
                  {user.name || 'User'}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {user.role === 'admin' ? (
                      <Shield className="h-4 w-4" />
                    ) : user.role === 'creator' ? (
                      <Users className="h-4 w-4" />
                    ) : (
                      <Trophy className="h-4 w-4" />
                    )}
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="login" className="btn bg-white border-none text-gray-800 rounded-4xl shadow-none hover:bg-[#f59f0a] hover:text-white hover:rounded-4xl">Sign In</Link>
              <Link to="register" className="btn bg-gradient-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] text-white border-none rounded-4xl">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
