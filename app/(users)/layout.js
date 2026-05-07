import "../globals.css";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppButton from "../components/WhatsappButton";

export const metadata = {
  title: "Best Waterproofing Services in Delhi NCR | RAS Care",
  description:
    "Expert waterproofing services in Delhi, Noida & Ghaziabad. " +
    "Terrace, basement, bathroom & wall seepage solutions. " +
    "15+ years experience. Call now for a free estimate.",
  keywords: [
    "waterproofing services Delhi",
    "waterproofing company Delhi NCR",
    "terrace waterproofing Delhi",
    "basement waterproofing Noida",
    "seepage solution Delhi",
    "water leakage repair Ghaziabad",
    "home waterproofing contractor Delhi",
    "waterproofing before monsoon Delhi",
  ],
  openGraph: {
    title: "Best Waterproofing Services in Delhi NCR | RAS Care",
    description:
      "Stop wall seepage & leaks for good. Serving Delhi, Noida, Gurugram & Ghaziabad.",
    url: "https://water-proofing-solution.vercel.app",
    siteName: "RAS Care Waterproofing",
    locale: "en_IN",
    type: "website",
  },
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
