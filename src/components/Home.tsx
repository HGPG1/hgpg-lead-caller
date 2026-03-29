"use client";

import {
  Database, Filter, ListChecks, TrendingUp, Calculator, Megaphone, Phone, ArrowRight
} from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: Database,
    title: "Comprehensive Property Data",
    desc: "Access detailed information on over 160 million properties nationwide, including ownership, mortgage, tax, and foreclosure data.",
  },
  {
    icon: Filter,
    title: "Advanced Search Filters",
    desc: "Use 165+ search filters to find exactly the properties you're looking for, from pre-foreclosures to high-equity opportunities.",
  },
  {
    icon: ListChecks,
    title: "List Automator",
    desc: "Create and automate lead lists that update with new properties matching your criteria, ensuring you never miss an opportunity.",
  },
  {
    icon: TrendingUp,
    title: "Property Valuation",
    desc: "Get accurate property values with our Automated Valuation Model (AVM) and comparable sales data from public records and MLS.",
  },
  {
    icon: Calculator,
    title: "Rehab Calculator",
    desc: "Estimate renovation costs with our customizable rehab calculator, adjustable by material quality and zip code.",
  },
  {
    icon: Megaphone,
    title: "Marketing Tools",
    desc: "Reach property owners with built-in marketing tools including postcards, email campaigns, and skip tracing.",
  },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold text-gray-800">HGPG Lead Caller</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            Log In
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-6 mt-6 rounded-2xl bg-[#1a1a1a] text-white p-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Find More Leads, Close More Deals</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Access nationwide property data, generate targeted lead lists, and market to motivated sellers with our comprehensive real estate investment platform.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 flex items-center gap-2"
          >
            <Phone size={18} />
            Start Calling
          </button>
          <button
            onClick={() => onNavigate("property-search")}
            className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 flex items-center gap-2"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-12">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Powerful Features for Real Estate Investors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-8 text-center border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-orange-500" size={28} />
                </div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">{f.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-6 mb-6 rounded-2xl bg-orange-500 text-white p-12 text-center">
        <h3 className="text-3xl font-bold mb-3">Ready to Find Your Next Deal?</h3>
        <p className="text-white/90 mb-6 max-w-xl mx-auto">
          Start exploring our platform today and discover how HGPG Lead Caller can help you find more leads and close more deals.
        </p>
        <button
          onClick={() => onNavigate("call-queue")}
          className="px-6 py-3 bg-white text-orange-500 rounded-lg font-medium hover:bg-gray-100 flex items-center gap-2 mx-auto"
        >
          <Phone size={18} />
          Start Calling Now
        </button>
      </div>

      {/* Footer */}
      <footer className="mx-6 mb-6 rounded-xl bg-[#333] text-white p-8 text-center">
        <div className="flex justify-center gap-8 mb-4 text-sm">
          <span className="hover:text-orange-400 cursor-pointer">About</span>
          <span className="hover:text-orange-400 cursor-pointer">Features</span>
          <span className="hover:text-orange-400 cursor-pointer">Pricing</span>
          <span className="hover:text-orange-400 cursor-pointer">Support</span>
          <span className="hover:text-orange-400 cursor-pointer">Contact</span>
        </div>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Homegrown Property Group | Real Broker LLC. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
