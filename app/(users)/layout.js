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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
      </head>
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
