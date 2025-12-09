import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import NavLogo from "../../../assets/logo.svg";
import { useAuth } from "../../../contexts/AuthContext";
import { LogOut, User, Shield, Users, Trophy } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

  const getLinkClass = ({ isActive }) => {
    return isActive
      ? 'bg-linear-to-r from-[#4a37d8] to-[#6928d9] text-white shadow-md rounded-4xl'
      : 'text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:rounded-4xl';
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-contests" className={getLinkClass}>
          All Contest
        </NavLink>
      </li>
      <li>
        <NavLink to="/leaderboard" className={getLinkClass}>
          Leaderboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={getLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/support-team" className={getLinkClass}>
          Support Team
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="py-1 sticky top-0 z-50 bg-white/90 dark:bg-base-100/90 backdrop-blur shadow-md dark:shadow-sm dark:border-b dark:border-gray-800">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
          <ul className="menu menu-horizontal px-1 gap-5 text-[15px] dark:text-gray-300">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {user ? (
            <div className="relative" ref={dropdownRef}>
                <label className="swap swap-rotate mr-2">
                  <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                  {/* sun icon */}
                  <svg
                    className="swap-on h-8 w-8 fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                  {/* moon icon */}
                  <svg
                    className="swap-off h-8 w-8 fill-current text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>

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
                <span className="hidden md:block text-gray-700 dark:text-gray-200 font-medium">
                  {user.name || 'User'}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-base-200 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
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
