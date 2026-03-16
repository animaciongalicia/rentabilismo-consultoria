import Sidebar from "@/components/Sidebar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="main-content">{children}</main>
    </>
  );
}
