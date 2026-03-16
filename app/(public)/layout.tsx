import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <MobileHeader />
      <main className="main-content">{children}</main>
    </>
  );
}
