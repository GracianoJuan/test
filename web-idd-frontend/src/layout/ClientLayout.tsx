"use client";

import { usePage } from "@/hooks/usePage";
import { useState } from "react";
import Header from "@/layout/Header";
import Nav from "@/layout/Nav";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const currentPage = usePage()
  const [dropDownOpen, setDDOpen] = useState(false)
  const [navMobileOpen, setMobileNav] = useState(false)

  const handleDropDown = () => {
    setDDOpen(!dropDownOpen)
  }

  const handleNav = () => {
    setMobileNav(!navMobileOpen)
  }

  const handleNavClose = () => {
    setMobileNav(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={currentPage?.title}
        setOpen={handleDropDown}
        isOpen={dropDownOpen}
        setNav={handleNav}
        navOpen={navMobileOpen}
      />
      <Nav
        currentPage={currentPage?.path}
        isOpen={navMobileOpen}
        onClose={handleNavClose}
      />
      <main className="min-h-[calc(100vh-73px)]">
        {children}
      </main>
    </div>
  );
};

export default ClientLayout