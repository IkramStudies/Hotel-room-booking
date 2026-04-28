import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/user/Home";
import Rooms from "./pages/user/Rooms";
import Booking from "./pages/user/Booking"; // Keeping your existing booking page
import MyBookings from "./pages/user/MyBookings"; // Adding history page
import Contact from "./pages/user/Contact";
import AuthPage from "./pages/user/Login";
import ScrollToTop from "./components/common/ScrollToTop";
import BookingSuccess from "./components/booking/BookingSuccess";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/book-now" element={<Booking />} />
          {/* <Route path="/book-now/:id" element={<Booking />} /> */}
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
