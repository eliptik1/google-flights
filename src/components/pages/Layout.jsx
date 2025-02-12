import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import HeroSection from "../HeroSection";

const Layout = () => {
  return (
    <div className="text-[#242020] bg-white">
      <HeroSection />
      <div className="flex flex-col max-w-5xl p-4 md:px-8 mx-auto">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
