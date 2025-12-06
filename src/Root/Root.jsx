import { Outlet } from "react-router";
import Navbar from "./../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";

const Root = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #6366f1 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Root;

