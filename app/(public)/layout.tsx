import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <MobileHeader />
      <main className="main-content">
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </main>
    </>
  );
}
