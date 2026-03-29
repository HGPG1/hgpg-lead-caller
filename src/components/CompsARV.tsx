'use client';

import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Home } from 'lucide-react';

const CompsARV = () => {
  const [address, setAddress] = useState('');
  const [arvEstimate, setArvEstimate] = useState(485000);
  const [adjustmentFactors, setAdjustmentFactors] = useState({
    condition: 5000,
    updates: -8000,
    location: 15000,
  });

  const comps = [
    {
      id: 1,
      address: '4521 Sardis Rd, Charlotte, NC 28270',
      saleDate: '2025-11-15',
      price: 425000,
      beds: 4,
      baths: 2.5,
      sqft: 2800,
      distance: 0.3,
    },
    {
      id: 2,
      address: '7840 Ballantyne Commons Pkwy, Charlotte, NC 28277',
      saleDate: '2025-12-02',
      price: 495000,
      beds: 4,
      baths: 3,
      sqft: 3100,
      distance: 1.2,
    },
    {
      id: 3,
      address: '15228 Ardrey Kell Rd, Charlotte, NC 28277',
      saleDate: '2025-10-28',
      price: 465000,
      beds: 3,
      baths: 2.5,
      sqft: 2650,
      distance: 0.8,
    },
    {
      id: 4,
      address: '14420 Randolph Way, Charlotte, NC 28277',
      saleDate: '2025-11-30',
      price: 510000,
      beds: 4,
      baths: 3,
      sqft: 3200,
      distance: 1.5,
    },
    {
      id: 5,
      address: '4817 Blakeney Church Rd, Charlotte, NC 28277',
      saleDate: '2025-09-14',
      price: 445000,
      beds: 3,
      baths: 2,
      sqft: 2500,
      distance: 0.6,
    },
    {
      id: 6,
      address: '9000 Stonewall Ridge Dr, Charlotte, NC 28277',
      saleDate: '2025-12-10',
      price: 520000,
      beds: 5,
      baths: 3.5,
      sqft: 3400,
      distance: 2.1,
    },
  ];

  const totalAdjustment = Object.values(adjustmentFactors).reduce((a, b) => a + b, 0);
  const avgCompPrice = Math.round(comps.reduce((sum, c) => sum + c.price, 0) / comps.length);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold">Comps & ARV Analysis</h1>
          </div>
          <p className="text-slate-400">Analyze comparable sales and estimate property value</p>
        </div>

        {/* Property Address Input */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Property Address
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter property address..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition">
              Search
            </button>
          </div>
        </div>

        {/* ARV Estimate Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Average Comp Price</p>
                <p className="text-3xl font-bold">${(avgCompPrice / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-30" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 border border-slate-600">
            <p className="text-slate-400 text-sm font-medium mb-1">Adjustments</p>
            <p className="text-3xl font-bold text-orange-400">
              {totalAdjustment > 0 ? '+' : ''}{(totalAdjustment / 1000).toFixed(0)}K
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 border border-slate-600">
            <p className="text-slate-400 text-sm font-medium mb-1">ARV Estimate</p>
            <p className="text-3xl font-bold text-white">${(arvEstimate / 1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* Adjustment Factors */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Adjustment Factors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(adjustmentFactors).map(([key, value]) => (
              <div key={key} className="bg-slate-700 rounded p-4">
                <label className="block text-sm text-slate-300 capitalize mb-2">{key}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    setAdjustmentFactors({ ...adjustmentFactors, [key]: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Comparable Sales Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Comparable Sales
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Address</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Sale Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Price</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">Beds/Baths</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">SqFt</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">Distance</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">$/SqFt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {comps.map((comp) => (
                  <tr
                    key={comp.id}
                    className="hover:bg-slate-700 transition cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-white font-medium">{comp.address}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {new Date(comp.saleDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-orange-400">
                      ${(comp.price / 1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 text-center">
                      {comp.beds}/{comp.baths}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 text-center">
                      {comp.sqft.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 text-center">
                      {comp.distance} mi
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 text-center">
                      ${(comp.price / comp.sqft).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompsARV;
