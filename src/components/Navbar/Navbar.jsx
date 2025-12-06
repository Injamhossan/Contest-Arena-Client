import React from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "../../assets/logo.svg";

const Navbar = () => {
  const links = (
    <>
      <NavLink to="allcontest">
        <li>All Contest</li>
      </NavLink>
      <NavLink to="allcontest">
        <li>Leaderboard</li>
      </NavLink>
      <NavLink to="allcontest">
        <li>About</li>
      </NavLink>
      <NavLink to="allcontest">
        <li>Support Team</li>
      </NavLink>
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
          <div className="flex items-center gap-2">
            <img src={NavLogo} alt="Nav Logo" className="h-[50px]" />
            <a class="text-xl font-bold bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] bg-clip-text text-transparent">
              Contest Arena
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-400 hover:text-gray-700 gap-5 text-[15px]">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <a className="btn bg-white border-none text-gray-800 rounded-4xl shadow-none hover:bg-[#f59f0a] hover:text-white hover:rounded-4xl">Sign In</a>
<a class="btn bg-linear-to-r from-[#4a37d8] via-[#6928d9] to-[#1f3092] text-white border-none rounded-4xl">
  Get Started
</a>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
