import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
