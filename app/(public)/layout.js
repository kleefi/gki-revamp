import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
