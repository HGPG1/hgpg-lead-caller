"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Home from "@/components/Home";
import Dashboard from "@/components/Dashboard";
import PropertySearch from "@/components/PropertySearch";
import MyLists from "@/components/MyLists";
import CompsARV from "@/components/CompsARV";
import CallQueue from "@/components/CallQueue";
import Marketing from "@/components/Marketing";
import Team from "@/components/Team";
import Settings from "@/components/Settings";

export default function Page() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home": return <Home onNavigate={setActivePage} />;
      case "dashboard": return <Dashboard onNavigate={setActivePage} />;
      case "property-search": return <PropertySearch />;
      case "my-lists": return <MyLists />;
      case "comps-arv": return <CompsARV />;
      case "call-queue": return <CallQueue />;
      case "marketing": return <Marketing />;
      case "team": return <Team />;
      case "settings": return <Settings />;
      default: return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 ml-[240px]">
        {renderPage()}
      </main>
    </div>
  );
}
