import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";

const Root = () => {
  return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
  );
};

export default Root;

