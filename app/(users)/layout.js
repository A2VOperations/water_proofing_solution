import "../globals.css";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppButton from "../components/WhatsappButton";

export const metadata = {
  title: "Premium Waterproofing Solutions India | Expert Seepage Control",
  description: "Professional waterproofing services for terraces, basements, and wet areas. Protecting Indian homes from seepage and dampness with advanced technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <WhatsAppButton/>
      </body>
    </html>
  );
}
