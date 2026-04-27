import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/user/Home";
import Rooms from "./pages/user/Rooms";
import Booking from "./pages/user/Booking";
import Contact from "./pages/user/Contact";
import AuthPage from "./pages/user/Login";
import ScrollToTop from "./components/common/ScrollToTop";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
