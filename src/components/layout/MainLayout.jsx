import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
}
