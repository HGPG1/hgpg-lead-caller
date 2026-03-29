"use client";

import {
  Home, LayoutDashboard, Search, List, BarChart3,
  Phone, Megaphone, Users, Settings
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "property-search", label: "Property Search", icon: Search },
  { id: "my-lists", label: "My Lists", icon: List },
  { id: "comps-arv", label: "Comps & ARV", icon: BarChart3 },
  { id: "call-queue", label: "Call Queue", icon: Phone },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[240px] bg-[#2d2d2d] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg">
            HG
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">Homegrown</div>
            <div className="text-xs text-gray-400 leading-tight">Property Group</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-[#4d4d4d] text-white border-l-3 border-orange-500"
                  : "text-gray-300 hover:bg-[#3d3d3d] hover:text-white border-l-3 border-transparent"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {item.id === "call-queue" && (
                <span className="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  12
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
            B
          </div>
          <div>
            <div className="text-sm font-medium">Brian</div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
