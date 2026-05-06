import AdminAuthGuard from "./components/AdminAuthGuard";
import AdminLayoutContent from "./components/AdminLayoutContent";
import "../globals.css";

export const metadata = {
  title: "Admin Panel | ",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
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
