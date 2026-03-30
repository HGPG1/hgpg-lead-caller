'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  MapPin,
  Home,
  Grid3x3,
  List,
  Plus,
  Bookmark,
  Eye,
  Phone,
  ChevronRight,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

type FilterTab =
  | 'all'
  | 'preforeclosure'
  | 'auctions'
  | 'bankowned'
  | 'cashbuyers'
  | 'vacant'
  | 'taxliens'
  | 'highequity';

type ViewMode = 'map' | 'grid' | 'list';

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  status: 'pre-foreclosure' | 'bank-owned' | 'cash-buyer' | 'vacant' | 'tax-lien';
  equity?: number;
}

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    address: '4521 Elm Ridge Drive',
    city: 'Charlotte',
    state: 'NC',
    zip: '28205',
    beds: 4,
    baths: 2,
    sqft: 2450,
    price: 285000,
    status: 'pre-foreclosure',
    equity: 65,
  },
  {
    id: '2',
    address: '8912 Prosperity Church Road',
    city: 'Charlotte',
    state: 'NC',
    zip: '28269',
    beds: 3,
    baths: 2,
    sqft: 1850,
    price: 245000,
    status: 'bank-owned',
    equity: 42,
  },
  {
    id: '3',
    address: '2845 Yadkinville Road',
    city: 'Charlotte',
    state: 'NC',
    zip: '28217',
    beds: 5,
    baths: 3,
    sqft: 3100,
    price: 325000,
    status: 'cash-buyer',
    equity: 78,
  },
  {
    id: '4',
    address: '6734 Providence Creek Lane',
    city: 'Charlotte',
    state: 'NC',
    zip: '28277',
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    price: 265000,
    status: 'vacant',
    equity: 55,
  },
  {
    id: '5',
    address: '1523 Cornwallis Road',
    city: 'Charlotte',
    state: 'NC',
    zip: '28205',
    beds: 4,
    baths: 2,
    sqft: 2200,
    price: 275000,
    status: 'tax-lien',
    equity: 38,
  },
  {
    id: '6',
    address: '9247 Shadowbrook Lane',
    city: 'Charlotte',
    state: 'NC',
    zip: '28226',
    beds: 3,
    baths: 1.5,
    sqft: 1650,
    price: 220000,
    status: 'pre-foreclosure',
    equity: 51,
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Properties' },
  { id: 'preforeclosure', label: 'Pre-Foreclosures' },
  { id: 'auctions', label: 'Auctions' },
  { id: 'bankowned', label: 'Bank Owned' },
  { id: 'cashbuyers', label: 'Cash Buyers' },
  { id: 'vacant', label: 'Vacant Properties' },
  { id: 'taxlines', label: 'Tax Liens' },
  { id: 'highequity', label: 'High Equity' },
];

const STATUS_COLORS: Record<Property['status'], string> = {
  'pre-foreclosure': 'bg-red-100 text-red-700',
  'bank-owned': 'bg-yellow-100 text-yellow-700',
  'cash-buyer': 'bg-green-100 text-green-700',
  'vacant': 'bg-blue-100 text-blue-700',
  'tax-lien': 'bg-purple-100 text-purple-700',
};

const STATUS_LABELS: Record<Property['status'], string> = {
  'pre-foreclosure': 'Pre-Foreclosure',
  'bank-owned': 'Bank Owned',
  'cash-buyer': 'Cash Buyer',
  'vacant': 'Vacant',
  'tax-lien': 'Tax Lien',
};

export default function PropertySearch() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    location: true,
    characteristics: true,
    financial: false,
  });

  const [filterState, setFilterState] = useState({
    address: '',
    radius: '1',
    propertyTypes: [] as string[],
    minPrice: '',
    maxPrice: '',
    minEquity: '',
    mortgageStatus: 'all' as 'all' | 'mortgaged' | 'clear',
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const togglePropertyType = (type: string) => {
    setFilterState((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState((prev) => ({
      ...prev,
      radius: e.target.value,
    }));
  };

  const handlePriceChange = (
    field: 'minPrice' | 'maxPrice',
    value: string
  ) => {
    setFilterState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEquityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((prev) => ({
      ...prev,
      minEquity: e.target.value,
    }));
  };

  const handleMortgageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState((prev) => ({
      ...prev,
      mortgageStatus: e.target.value as 'all' | 'mortgaged' | 'clear',
    }));
  };

  const filteredProperties = SAMPLE_PROPERTIES.filter((property) => {
    if (activeTab === 'highequity') {
      return (property.equity || 0) >= 60;
    }
    if (activeTab !== 'all') {
      const statusMap: Record<FilterTab, Property['status'] | null> = {
        all: null,
        preforeclosure: 'pre-foreclosure',
        auctions: null,
        bankowned: 'bank-owned',
        cashbuyers: 'cash-buyer',
        vacant: 'vacant',
        taxliens: 'tax-lien',
        highequity: null,
      };
      const targetStatus = statusMap[activeTab];
      if (targetStatus && property.status !== targetStatus) return false;
    }

    if (
      filterState.minPrice &&
      property.price < parseInt(filterState.minPrice)
    ) {
      return false;
    }

    if (
      filterState.maxPrice &&
      property.price > parseInt(filterState.maxPrice)
    ) {
      return false;
    }

    if (
      filterState.minEquity &&
      (property.equity || 0) < parseInt(filterState.minEquity)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Search</h1>
              <p className="text-sm text-gray-500 mt-1">
                Find and manage investment properties
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Bookmark className="w-5 h-5" />
                Save Search
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <Plus className="w-5 h-5" />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FilterTab)}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 sticky top-20">
              {/* Location Filter */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('location')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.location ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.location && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={filterState.address}
                          onChange={handleAddressChange}
                          placeholder="Enter address"
                          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Radius
                      </label>
                      <select
                        value={filterState.radius}
                        onChange={handleRadiusChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      >
                        <option value="0.5">0.5 miles</option>
                        <option value="1">1 mile</option>
                        <option value="3">3 miles</option>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="25">25 miles</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Property Characteristics Filter */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('characteristics')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">
                    Property Characteristics
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.characteristics ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.characteristics && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                    {['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Land'].map(
                      (type) => (
                        <label
                          key={type}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filterState.propertyTypes.includes(type)}
                            onChange={() => togglePropertyType(type)}
                            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Financial Filters */}
              <div>
                <button
                  onClick={() => toggleSection('financial')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">Financial Filters</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.financial ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedSections.financial && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={filterState.minPrice}
                          onChange={(e) =>
                            handlePriceChange('minPrice', e.target.value)
                          }
                          placeholder="Enter amount"
                          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={filterState.maxPrice}
                          onChange={(e) =>
                            handlePriceChange('maxPrice', e.target.value)
                          }
                          placeholder="Enter amount"
                          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Equity %
                      </label>
                      <div className="relative">
                        <TrendingUp className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={filterState.minEquity}
                          onChange={handleEquityChange}
                          placeholder="Enter percentage"
                          className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mortgage Status
                      </label>
                      <select
                        value={filterState.mortgageStatus}
                        onChange={handleMortgageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      >
                        <option value="all">All</option>
                        <option value="mortgaged">Mortgaged</option>
                        <option value="clear">Clear Title</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredProperties.length} properties found
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {activeTab === 'all'
                    ? 'Showing all properties'
                    : `Filtered by ${
                        FILTER_TABS.find((t) => t.id === activeTab)?.label || activeTab
                      }`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg border transition-colors ${
                    viewMode === 'map'
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg border transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg border transition-colors ${
                    viewMode === 'list'
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Property Cards Grid */}
            <div
              className={`space-y-4 ${
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                  : 'space-y-4'
              }`}
            >
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Property Image Placeholder */}
                  <div className="bg-gradient-to-br from-gray-300 to-gray-400 h-48 flex items-center justify-center">
                    <Home className="w-16 h-16 text-gray-500 opacity-40" />
                  </div>

                  {/* Property Info */}
                  <div className="p-4 space-y-4">
                    {/* Address & Status */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 text-base">
                          {property.address}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                            STATUS_COLORS[property.status]
                          }`}
                        >
                          {STATUS_LABELS[property.status]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {property.city}, {property.state} {property.zip}
                      </p>
                    </div>

                    {/* Beds/Baths/SqFt */}
                    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {property.beds}
                        </p>
                        <p className="text-xs text-gray-500">Beds</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {property.baths}
                        </p>
                        <p className="text-xs text-gray-500">Baths</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">
                          {property.sqft.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">Sq Ft</p>
                      </div>
                    </div>

                    {/* Price & Equity */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Price</p>
                        <p className="text-2xl font-bold text-orange-500">
                          ${(property.price / 1000).toFixed(0)}k
                        </p>
                      </div>
                      {property.equity && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Equity</p>
                          <p className="text-2xl font-bold text-green-600">
                            {property.equity}%
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                        <Phone className="w-4 h-4" />
                        Skip Trace
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500 text-sm">
                  Try adjusting your filters to find more properties
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
