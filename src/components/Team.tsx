'use client';

import React, { useState } from 'react';
import { Users, Plus, Phone, TrendingUp, FileText, Crown, Mail } from 'lucide-react';

const Team = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const teamMembers = [
    {
      id: 1,
      name: 'Brian McCarthy',
      email: 'brian@propstream.local',
      role: 'Admin',
      avatar: 'BM',
      callsMade: 256,
      leadsConverted: 28,
      listsManaged: 5,
      joinDate: '2025-01-15',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah@propstream.local',
      role: 'Agent',
      avatar: 'SC',
      callsMade: 142,
      leadsConverted: 16,
      listsManaged: 3,
      joinDate: '2025-02-01',
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      email: 'marcus@propstream.local',
      role: 'Agent',
      avatar: 'MJ',
      callsMade: 89,
      leadsConverted: 9,
      listsManaged: 2,
      joinDate: '2025-02-20',
    },
    {
      id: 4,
      name: 'Jessica Williams',
      email: 'jessica@propstream.local',
      role: 'Agent',
      avatar: 'JW',
      callsMade: 178,
      leadsConverted: 22,
      listsManaged: 4,
      joinDate: '2025-03-01',
    },
  ];

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      // Handle invite logic here
      console.log('Inviting:', inviteEmail);
      setInviteEmail('');
      setShowInviteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl font-bold">Team Management</h1>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition"
            >
              <Plus className="w-5 h-5" />
              Invite Member
            </button>
          </div>
          <p className="text-slate-400">Manage team members and monitor performance metrics</p>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Invite Team Member</h2>
              <p className="text-slate-400 mb-4">
                Send an invitation to a new team member. They'll receive an email with setup instructions.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="agent@example.com"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleInvite}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition"
                >
                  Send Invitation
                </button>
                <button
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteEmail('');
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500/50 transition"
            >
              {/* Member Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                      {member.role === 'Admin' && <Crown className="w-5 h-5 text-orange-500" />}
                    </div>
                    <p className="text-sm text-slate-400">{member.role}</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-4 flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                {member.email}
              </div>

              {/* Stats */}
              <div className="bg-slate-700 rounded p-4 mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Phone className="w-4 h-4 text-orange-500" />
                    Calls Made
                  </div>
                  <span className="font-semibold text-white">{member.callsMade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Leads Converted
                  </div>
                  <span className="font-semibold text-white">{member.leadsConverted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <FileText className="w-4 h-4 text-blue-500" />
                    Lists Managed
                  </div>
                  <span className="font-semibold text-white">{member.listsManaged}</span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-orange-500/10 rounded p-3 border border-orange-500/20 mb-4">
                <p className="text-sm text-slate-300 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-400">
                  {((member.leadsConverted / (member.callsMade / 3)) * 100).toFixed(1)}%
                </p>
              </div>

              {/* Join Date */}
              <p className="text-xs text-slate-500">
                Joined {new Date(member.joinDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 font-semibold rounded transition text-sm">
                  Edit
                </button>
                {member.role !== 'Admin' && (
                  <button className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded transition text-sm">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Team Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Team Members</p>
            <p className="text-3xl font-bold text-white">{teamMembers.length}</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Calls Made</p>
            <p className="text-3xl font-bold text-orange-400">
              {teamMembers.reduce((sum, m) => sum + m.callsMade, 0)}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Leads Converted</p>
            <p className="text-3xl font-bold text-green-400">
              {teamMembers.reduce((sum, m) => sum + m.leadsConverted, 0)}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-1">Team Conversion Rate</p>
            <p className="text-3xl font-bold text-blue-400">
              {(
                (teamMembers.reduce((sum, m) => sum + m.leadsConverted, 0) /
                  (teamMembers.reduce((sum, m) => sum + m.callsMade, 0) / 3)) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
