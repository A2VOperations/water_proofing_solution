import AdminAuthGuard from "./components/AdminAuthGuard";
import AdminLayoutContent from "./components/AdminLayoutContent";
import "../globals.css";

export const metadata = {
  title: "Admin Panel | WP Solutions",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AdminAuthGuard>
          <AdminLayoutContent>
            {children}
          </AdminLayoutContent>
        </AdminAuthGuard>
      </body>
    </html>
  );
}
