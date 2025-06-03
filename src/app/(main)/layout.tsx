// src/app/(main)/layout.tsx
import Sidebar from "@/app/components/Sidebar/Sidebar";
import Header from "@/app/components/Header/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="grow bg-white m-2 rounded-2xl flex flex-col overflow-hidden">
        <Header />
        <main className="grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

