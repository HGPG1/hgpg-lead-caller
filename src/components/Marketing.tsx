'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Plus, FileText, Phone, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const Marketing = () => {
  const [selectedCampaignType, setSelectedCampaignType] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const activeCampaigns = [
    {
      id: 1,
      name: 'Ballantyne Investor Outreach',
      type: 'Postcards',
      status: 'active',
      sent: 156,
      opens: 89,
      responseRate: 12.8,
      startDate: '2026-03-15',
    },
    {
      id: 2,
      name: 'Off-Market Properties Alert',
      type: 'Email',
      status: 'active',
      sent: 342,
      opens: 187,
      responseRate: 8.5,
      startDate: '2026-03-10',
    },
    {
      id: 3,
      name: 'South Charlotte SMS Sequence',
      type: 'SMS',
      status: 'active',
      sent: 287,
      opens: 256,
      responseRate: 15.3,
      startDate: '2026-03-20',
    },
  ];

  const campaignHistory = [
    {
      id: 1,
      name: 'Q1 Landlord Campaign',
      type: 'Email',
      status: 'completed',
      sent: 523,
      responseRate: 11.2,
      endDate: '2026-02-28',
    },
    {
      id: 2,
      name: 'Skip Trace - Distressed Properties',
      type: 'Skip Trace',
      status: 'completed',
      sent: 89,
      responseRate: 18.5,
      endDate: '2026-02-20',
    },
    {
      id: 3,
      name: 'Valentine\'s Day - New Agents',
      type: 'Postcards',
      status: 'completed',
      sent: 250,
      responseRate: 6.8,
      endDate: '2026-02-14',
    },
    {
      id: 4,
      name: 'Holiday Property Buyers',
      type: 'Email',
      status: 'completed',
      sent: 445,
      responseRate: 9.3,
      endDate: '2026-01-31',
    },
  ];

  const campaignTypes = [
    { id: 'postcards', name: 'Postcards', icon: FileText, description: 'Physical direct mail campaigns' },
    { id: 'email', name: 'Email', icon: Mail, description: 'Email marketing sequences' },
    { id: 'sms', name: 'SMS', icon: MessageSquare, description: 'Text message campaigns' },
    { id: 'skip-trace', name: 'Skip Trace', icon: Phone, description: 'Find and verify contact info' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/20 text-slate-400';
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Send className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition"
            >
              <Plus className="w-5 h-5" />
              New Campaign
            </button>
          </div>
          <p className="text-slate-400">Manage and track your marketing campaigns across multiple channels</p>
        </div>

        {/* Create Campaign Section */}
        {showCreateForm && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Create New Campaign</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="Enter campaign name..."
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Target Area</label>
                <input
                  type="text"
                  placeholder="e.g., South Charlotte, Ballantyne..."
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-300 mb-3">Campaign Type</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {campaignTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedCampaignType(type.id)}
                    className={`p-4 rounded border-2 transition text-left ${
                      selectedCampaignType === type.id
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-slate-600 bg-slate-700 hover:border-orange-400'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-orange-500 mb-2" />
                    <p className="font-semibold text-sm">{type.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{type.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition">
                Create Campaign
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setSelectedCampaignType(null);
                }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Active Campaigns Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Active Campaigns
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {activeCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-orange-500/50 transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{campaign.name}</h3>
                    <p className="text-sm text-slate-400">{campaign.type}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)}
                    <span className="text-xs font-semibold capitalize">{campaign.status}</span>
                  </div>
                </div>

                <div className="bg-slate-700 rounded p-3 mb-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Sent:</span>
                    <span className="font-semibold text-orange-400">{campaign.sent}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Opened:</span>
                    <span className="font-semibold text-white">{campaign.opens}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Response Rate:</span>
                    <span className="font-semibold text-green-400">{campaign.responseRate}%</span>
                  </div>
                </div>

                <button className="w-full px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-semibold rounded transition text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign History Table */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold">Campaign History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Campaign Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Type</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">Sent</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">Response Rate</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">End Date</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-slate-200">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {campaignHistory.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-slate-700 transition"
                  >
                    <td className="px-6 py-4 text-sm text-white font-medium">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{campaign.type}</td>
                    <td className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(campaign.status)}`}>
                        {getStatusIcon(campaign.status)}
                        <span className="text-xs font-semibold capitalize">{campaign.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 text-center font-semibold">
                      {campaign.sent}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className="text-green-400 font-semibold">{campaign.responseRate}%</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300 text-center">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition">
                        View
                      </button>
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

export default Marketing;
