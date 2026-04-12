"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Search } from "@/components/layout/Search";
import { useState } from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-64 shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 min-w-0">
          <Header onMenuClick={() => setMobileNavOpen(true)} />
          <MobileNav
            isOpen={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />
          <main className="px-4 md:px-6 lg:px-8 py-6 lg:py-8">{children}</main>
        </div>
      </div>
      <Search />
    </>
  );
}
