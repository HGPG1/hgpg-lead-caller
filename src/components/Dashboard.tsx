"use client";

import {
  Eye, List, Bookmark, Megaphone, Search, ListChecks,
  Calculator, BarChart3, Phone, Bell, Plus, ArrowUpRight
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: "Properties Viewed", value: "127", change: "+12% from last week", icon: Eye, color: "text-green-500" },
  { label: "Active Lists", value: "8", change: "+2 new lists", icon: List, color: "text-green-500" },
  { label: "Saved Searches", value: "15", change: "+3 from last month", icon: Bookmark, color: "text-green-500" },
  { label: "Calls Made Today", value: "23", change: "4 connected", icon: Phone, color: "text-orange-500" },
];

const recentProperties = [
  { address: "1425 South Blvd, Charlotte, NC 28203", beds: 3, baths: 2, sqft: 1850, price: "$385,000", status: "Pre-Foreclosure" },
  { address: "789 Providence Rd, Charlotte, NC 28207", beds: 4, baths: 3, sqft: 2200, price: "$525,000", status: "High Equity" },
  { address: "234 Park Rd, Charlotte, NC 28209", beds: 2, baths: 2, sqft: 1500, price: "$295,000", status: "Vacant" },
];

const recentActivity = [
  { icon: Search, text: 'New search: "Pre-foreclosures in South Charlotte"', time: "Today, 10:23 AM", color: "bg-orange-100 text-orange-600" },
  { icon: ListChecks, text: 'Added 15 properties to "Hot Leads Q1"', time: "Yesterday, 3:45 PM", color: "bg-blue-100 text-blue-600" },
  { icon: Phone, text: "Called 8 leads from Ballantyne list", time: "Yesterday, 1:12 PM", color: "bg-green-100 text-green-600" },
  { icon: BarChart3, text: "Generated comps for 789 Providence Rd", time: "Mar 28, 2026, 11:30 AM", color: "bg-purple-100 text-purple-600" },
  { icon: Megaphone, text: 'Created postcard campaign for "Absentee Owners"', time: "Mar 27, 2026, 4:15 PM", color: "bg-pink-100 text-pink-600" },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <button
            onClick={() => onNavigate("property-search")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2"
          >
            <Plus size={16} /> New Search
          </button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{s.label}</span>
                  <Icon size={18} className="text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-800">{s.value}</div>
                <div className={`text-sm mt-1 ${s.color}`}>{s.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Properties */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-bold text-gray-800">Recently Viewed Properties</h2>
              <button className="text-sm text-orange-500 font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y">
              {recentProperties.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-5 hover:bg-gray-50 cursor-pointer">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 truncate">{p.address}</div>
                    <div className="text-sm text-gray-500">
                      {p.beds} beds &middot; {p.baths} baths &middot; {p.sqft.toLocaleString()} sqft
                    </div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded">
                      {p.status}
                    </span>
                  </div>
                  <div className="text-orange-500 font-bold text-lg">{p.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-5 border-b">
              <h2 className="font-bold text-gray-800">Recent Activity</h2>
            </div>
            <div className="divide-y">
              {recentActivity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${a.color}`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700">{a.text}</div>
                      <div className="text-xs text-gray-400 mt-1">{a.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Search Properties", icon: Search, page: "property-search" },
              { label: "Call Queue", icon: Phone, page: "call-queue" },
              { label: "My Lists", icon: List, page: "my-lists" },
              { label: "Run Comps", icon: BarChart3, page: "comps-arv" },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  onClick={() => onNavigate(action.page)}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <Icon size={20} className="text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  <ArrowUpRight size={14} className="ml-auto text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
