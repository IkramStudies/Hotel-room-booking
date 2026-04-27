import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow ">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
