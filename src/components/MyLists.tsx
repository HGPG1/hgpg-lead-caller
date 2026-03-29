'use client';

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Eye,
  Phone,
  Download,
  Trash2,
  ChevronDown,
  Tag,
  Calendar,
  Home,
  Clock,
} from 'lucide-react';

interface List {
  id: string;
  name: string;
  propertyCount: number;
  dateCreated: string;
  status: 'Active' | 'Archived';
  lastUpdated: string;
  tags: string[];
}

const sampleLists: List[] = [
  {
    id: '1',
    name: 'South Charlotte Pre-Foreclosures',
    propertyCount: 45,
    dateCreated: '2026-01-15',
    status: 'Active',
    lastUpdated: '2026-03-28',
    tags: ['foreclosure', 'distressed'],
  },
  {
    id: '2',
    name: 'Ballantyne Absentee Owners',
    propertyCount: 128,
    dateCreated: '2025-12-10',
    status: 'Active',
    lastUpdated: '2026-03-27',
    tags: ['absentee', 'investment'],
  },
  {
    id: '3',
    name: 'Fort Mill High Equity',
    propertyCount: 67,
    dateCreated: '2026-02-01',
    status: 'Active',
    lastUpdated: '2026-03-26',
    tags: ['equity', 'refinance'],
  },
  {
    id: '4',
    name: 'Indian Land Vacant',
    propertyCount: 23,
    dateCreated: '2026-01-20',
    status: 'Active',
    lastUpdated: '2026-03-25',
    tags: ['vacant', 'opportunity'],
  },
  {
    id: '5',
    name: 'Hot Leads Q1 2026',
    propertyCount: 15,
    dateCreated: '2026-01-05',
    status: 'Active',
    lastUpdated: '2026-03-29',
    tags: ['hot', 'priority'],
  },
  {
    id: '6',
    name: 'Waxhaw Tax Liens',
    propertyCount: 34,
    dateCreated: '2025-11-30',
    status: 'Active',
    lastUpdated: '2026-03-24',
    tags: ['tax-lien', 'distressed'],
  },
  {
    id: '7',
    name: 'Callback List',
    propertyCount: 12,
    dateCreated: '2026-03-01',
    status: 'Active',
    lastUpdated: '2026-03-29',
    tags: ['follow-up', 'warm-lead'],
  },
  {
    id: '8',
    name: 'Charlotte Metro Cash Buyers',
    propertyCount: 89,
    dateCreated: '2025-10-15',
    status: 'Archived',
    lastUpdated: '2026-02-14',
    tags: ['buyer', 'cash'],
  },
];

export default function MyLists() {
  const [lists, setLists] = useState<List[]>(sampleLists);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'count'>('date');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredAndSortedLists = lists
    .filter((list) =>
      list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        return (
          new Date(b.lastUpdated).getTime() -
          new Date(a.lastUpdated).getTime()
        );
      } else {
        return b.propertyCount - a.propertyCount;
      }
    });

  const handleDeleteList = (id: string) => {
    if (confirm('Are you sure you want to delete this list?')) {
      setLists(lists.filter((list) => list.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Lists</h1>
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus size={20} />
            Create New List
          </button>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search lists or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <span>Sort: {sortBy === 'name' ? 'Name' : sortBy === 'date' ? 'Last Updated' : 'Property Count'}</span>
              <ChevronDown size={18} />
            </button>

            {showSortMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setSortBy('name');
                    setShowSortMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-orange-50 ${
                    sortBy === 'name' ? 'text-orange-500 font-medium' : 'text-gray-700'
                  }`}
                >
                  Name
                </button>
                <button
                  onClick={() => {
                    setSortBy('date');
                    setShowSortMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-orange-50 ${
                    sortBy === 'date' ? 'text-orange-500 font-medium' : 'text-gray-700'
                  }`}
                >
                  Last Updated
                </button>
                <button
                  onClick={() => {
                    setSortBy('count');
                    setShowSortMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 hover:bg-orange-50 ${
                    sortBy === 'count' ? 'text-orange-500 font-medium' : 'text-gray-700'
                  }`}
                >
                  Property Count
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="px-8 py-8">
        {filteredAndSortedLists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No lists found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedLists.map((list) => (
              <div
                key={list.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Card Header */}
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2 line-clamp-2">
                      {list.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        list.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {list.status}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 py-4 space-y-3">
                  {/* Property Count */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <Home size={18} className="text-orange-500" />
                    <span className="text-sm font-medium">
                      {list.propertyCount.toLocaleString()} properties
                    </span>
                  </div>

                  {/* Date Created */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    <span>Created {formatDate(list.dateCreated)}</span>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock size={16} className="text-gray-400" />
                    <span>Updated {formatDate(list.lastUpdated)}</span>
                  </div>

                  {/* Tags */}
                  {list.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {list.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full text-xs font-medium"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                      {list.tags.length > 3 && (
                        <span className="inline-flex items-center bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium">
                          +{list.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="border-t border-gray-200 px-6 py-4 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium text-sm transition-colors">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg font-medium text-sm transition-colors">
                    <Phone size={16} />
                    Call List
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg font-medium text-sm transition-colors">
                    <Download size={16} />
                    Export
                  </button>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium text-sm transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
