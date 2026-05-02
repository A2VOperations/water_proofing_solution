import "../globals.css";
import Navbar from "../components/navBar";
import Footer from "../components/footer";


export const metadata = {
  title: "Waterproofing Solutions | Expert Appliance Care",
  description: "We handle repairs & maintenance for all your appliances with expert efficiency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-['Inter',_sans-serif]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
