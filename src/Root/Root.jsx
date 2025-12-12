import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";

const Root = () => {
  return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <div className="grow">
          <Outlet />
        </div>
        <Footer />
      </div>
  );
};

export default Root;

