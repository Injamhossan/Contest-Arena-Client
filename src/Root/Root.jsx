import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";

const Root = () => {
  return (
      <div className="min-h-screen bg-white dark:bg-base-100 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
  );
};

export default Root;

