'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  Clock,
  MapPin,
  FileText,
  ChevronDown,
  ChevronUp,
  SkipForward,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Home,
  Calendar,
  User,
  X,
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  type: 'Pre-Foreclosure' | 'Absentee Owner' | 'High Equity' | 'Probate' | 'Code Violation';
  propertyDetails: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
  };
  leadSource: string;
  lastContactDate: string;
  notes: string;
  priority: 'high' | 'medium' | 'low';
}

type CallStatus = 'idle' | 'calling' | 'connected' | 'wrap-up';
type Disposition =
  | 'not_interested'
  | 'wrong_number'
  | 'no_answer'
  | 'voicemail'
  | 'callback_scheduled'
  | 'hot_lead'
  | null;

const SAMPLE_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Margaret Johnson',
    phone: '(704) 555-0142',
    address: '1247 Oakmont Drive',
    city: 'Charlotte, NC',
    type: 'Pre-Foreclosure',
    propertyDetails: {
      bedrooms: 4,
      bathrooms: 2.5,
      squareFeet: 2840,
      yearBuilt: 1998,
    },
    leadSource: 'Zillow Pre-Foreclosure',
    lastContactDate: '2 days ago',
    notes: 'Interested in quick sale. Has rental property also.',
    priority: 'high',
  },
  {
    id: '2',
    name: 'David Chen',
    phone: '(704) 555-0198',
    address: '5621 Crescent Oak Lane',
    city: 'South Charlotte, NC',
    type: 'Absentee Owner',
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1920,
      yearBuilt: 2004,
    },
    leadSource: 'Skip Trace',
    lastContactDate: 'Never',
    notes: 'Out of state owner, property needs repairs',
    priority: 'high',
  },
  {
    id: '3',
    name: 'Patricia Williams',
    phone: '(704) 555-0156',
    address: '892 Willow Creek Court',
    city: 'Charlotte, NC',
    type: 'High Equity',
    propertyDetails: {
      bedrooms: 5,
      bathrooms: 3,
      squareFeet: 3250,
      yearBuilt: 1995,
    },
    leadSource: 'County Records',
    lastContactDate: 'Last week',
    notes: 'Motivated to sell. Family relocating.',
    priority: 'high',
  },
  {
    id: '4',
    name: 'Robert Martinez',
    phone: '(704) 555-0167',
    address: '3421 Forest Hill Boulevard',
    city: 'Charlotte, NC',
    type: 'Pre-Foreclosure',
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 1.5,
      squareFeet: 1680,
      yearBuilt: 1989,
    },
    leadSource: 'Public Records',
    lastContactDate: '5 days ago',
    notes: 'Behind on payments. Needs quick solution.',
    priority: 'high',
  },
  {
    id: '5',
    name: 'Linda Thompson',
    phone: '(803) 555-0124',
    address: '7642 Indian Land Road',
    city: 'Fort Mill, SC',
    type: 'Absentee Owner',
    propertyDetails: {
      bedrooms: 4,
      bathrooms: 2,
      squareFeet: 2100,
      yearBuilt: 2001,
    },
    leadSource: 'Direct Mail',
    lastContactDate: 'Never',
    notes: 'Inherited property. Lives in California.',
    priority: 'medium',
  },
  {
    id: '6',
    name: 'James Anderson',
    phone: '(704) 555-0145',
    address: '1965 Silverstone Drive',
    city: 'Charlotte, NC',
    type: 'High Equity',
    propertyDetails: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2950,
      yearBuilt: 2006,
    },
    leadSource: 'Facebook Ads',
    lastContactDate: '3 days ago',
    notes: 'Downsizing. Empty nesters.',
    priority: 'medium',
  },
  {
    id: '7',
    name: 'Sandra Lee',
    phone: '(704) 555-0178',
    address: '4118 Meadowbrook Lane',
    city: 'South Charlotte, NC',
    type: 'Probate',
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1850,
      yearBuilt: 1993,
    },
    leadSource: 'Estate Attorney',
    lastContactDate: 'Never',
    notes: 'Estate sale. Multiple heirs. Needs coordination.',
    priority: 'high',
  },
  {
    id: '8',
    name: 'Michael Torres',
    phone: '(704) 555-0189',
    address: '6543 Pinewood Court',
    city: 'Indian Land, SC',
    type: 'Code Violation',
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 1.5,
      squareFeet: 1620,
      yearBuilt: 1987,
    },
    leadSource: 'City Code Violations',
    lastContactDate: 'Never',
    notes: 'Property has code violations. Owner seeking resolution.',
    priority: 'medium',
  },
  {
    id: '9',
    name: 'Carol Robinson',
    phone: '(704) 555-0156',
    address: '2847 Ashby Oak Drive',
    city: 'Charlotte, NC',
    type: 'High Equity',
    propertyDetails: {
      bedrooms: 4,
      bathrooms: 2.5,
      squareFeet: 2720,
      yearBuilt: 2000,
    },
    leadSource: 'Zillow Pre-Foreclosure',
    lastContactDate: '1 week ago',
    notes: 'Considering sale. Job opportunity out of state.',
    priority: 'medium',
  },
  {
    id: '10',
    name: 'Thomas Gray',
    phone: '(803) 555-0156',
    address: '5024 Valley View Road',
    city: 'Fort Mill, SC',
    type: 'Absentee Owner',
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1780,
      yearBuilt: 1996,
    },
    leadSource: 'Skip Trace',
    lastContactDate: 'Never',
    notes: 'Rental property. Tenant moved out.',
    priority: 'low',
  },
  {
    id: '11',
    name: 'Jennifer Walsh',
    phone: '(704) 555-0134',
    address: '3652 Westchester Lane',
    city: 'Charlotte, NC',
    type: 'Pre-Foreclosure',
    propertyDetails: {
      bedrooms: 5,
      bathrooms: 3,
      squareFeet: 3100,
      yearBuilt: 1999,
    },
    leadSource: 'County Records',
    lastContactDate: 'Never',
    notes: 'Recently divorced. Wants to liquidate asset.',
    priority: 'high',
  },
  {
    id: '12',
    name: 'Dennis Kelly',
    phone: '(704) 555-0167',
    address: '7891 Heritage Hills Drive',
    city: 'South Charlotte, NC',
    type: 'High Equity',
    propertyDetails: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2880,
      yearBuilt: 2003,
    },
    leadSource: 'Direct Mail',
    lastContactDate: 'Never',
    notes: 'Significant equity. Motivated to explore options.',
    priority: 'medium',
  },
];

const CALL_SCRIPT = {
  greeting: "Hi, is this [Lead Name]? This is [Your Name] with Homegrown Property Group. How are you doing today?",
  qualification: [
    "I'm reaching out because we specialize in helping homeowners in your area who are looking to explore options with their property.",
    "Are you currently open to exploring a potential sale of your property at [Address]?",
    "Do you have a timeline in mind, or are you still in the exploratory phase?",
  ],
  nextSteps:
    "If interested, I'd like to schedule a time for one of our team members to do a no-obligation consultation. Does your calendar work better in the morning or afternoon?",
};

export default function CallQueue() {
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0);
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [disposition, setDisposition] = useState<Disposition>(null);
  const [notes, setNotes] = useState('');
  const [scriptExpanded, setScriptExpanded] = useState(true);
  const [notesExpanded, setNotesExpanded] = useState(true);
  const [callHistory, setCallHistory] = useState<Array<{
    leadName: string;
    disposition: Disposition;
    duration: number;
    timestamp: string;
  }>>([]);
  const [callStats, setCallStats] = useState({
    callsToday: 23,
    connected: 4,
    callbacks: 7,
  });

  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Call timer effect
  useEffect(() => {
    if (callStatus === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [callStatus]);

  const currentLead = SAMPLE_LEADS[currentLeadIndex];

  const handleCall = () => {
    setCallStatus('calling');
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const handleDisposition = (disp: Disposition) => {
    setDisposition(disp);

    // Add to call history
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    setCallHistory((prev) => [
      {
        leadName: currentLead.name,
        disposition: disp,
        duration: callDuration,
        timestamp,
      },
      ...prev.slice(0, 9),
    ]);

    // Update stats
    if (disp === 'hot_lead') {
      setCallStats((prev) => ({
        ...prev,
        connected: prev.connected + 1,
      }));
    } else if (disp === 'callback_scheduled') {
      setCallStats((prev) => ({
        ...prev,
        callbacks: prev.callbacks + 1,
      }));
    }

    setCallStats((prev) => ({
      ...prev,
      callsToday: prev.callsToday + 1,
    }));

    // Move to next lead
    setTimeout(() => {
      advanceToNextLead();
    }, 800);
  };

  const advanceToNextLead = () => {
    setCurrentLeadIndex((prev) => (prev + 1) % SAMPLE_LEADS.length);
    setCallStatus('idle');
    setDisposition(null);
    setNotes('');
  };

  const handleSkip = () => {
    advanceToNextLead();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDispositionColor = (disp: string | null) => {
    switch (disp) {
      case 'hot_lead':
        return 'text-green-600 bg-green-50 border-green-300';
      case 'callback_scheduled':
        return 'text-blue-600 bg-blue-50 border-blue-300';
      case 'not_interested':
      case 'wrong_number':
      case 'no_answer':
        return 'text-red-600 bg-red-50 border-red-300';
      case 'voicemail':
        return 'text-amber-600 bg-amber-50 border-amber-300';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-300';
    }
  };

  const getDispositionLabel = (disp: Disposition) => {
    switch (disp) {
      case 'not_interested':
        return 'Not Interested';
      case 'wrong_number':
        return 'Wrong Number';
      case 'no_answer':
        return 'No Answer';
      case 'voicemail':
        return 'Left Voicemail';
      case 'callback_scheduled':
        return 'Callback Scheduled';
      case 'hot_lead':
        return 'Hot Lead - To FUB';
      default:
        return '-';
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <Phone className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">Call Queue</h1>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Calls Today</p>
              <p className="text-2xl font-bold text-orange-500">{callStats.callsToday}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Connected</p>
              <p className="text-2xl font-bold text-orange-500">{callStats.connected}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Callbacks</p>
              <p className="text-2xl font-bold text-orange-500">{callStats.callbacks}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Call Interface */}
          <div className="lg:col-span-3 space-y-6">
            {/* Call Script Panel */}
            <div className="rounded-xl border border-gray-200 bg-gray-50">
              <button
                onClick={() => setScriptExpanded(!scriptExpanded)}
                className="flex w-full items-center justify-between border-b border-gray-200 px-6 py-4 hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-orange-500" />
                  <h2 className="font-semibold text-gray-900">Call Script</h2>
                </div>
                {scriptExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {scriptExpanded && (
                <div className="space-y-4 px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Greeting:</p>
                    <p className="mt-1 text-sm text-gray-600">{CALL_SCRIPT.greeting}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Qualification Questions:</p>
                    <ul className="mt-2 space-y-2">
                      {CALL_SCRIPT.qualification.map((q, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          {i + 1}. {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Next Steps:</p>
                    <p className="mt-1 text-sm text-gray-600">{CALL_SCRIPT.nextSteps}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Active Call Interface */}
            <div className="rounded-xl border border-gray-200 bg-white">
              {/* Lead Info */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentLead.name}</h3>
                    <p className="mt-1 text-lg text-orange-500 font-semibold">{currentLead.phone}</p>
                  </div>
                  <div
                    className={`rounded-lg border px-3 py-2 ${getPriorityColor(
                      currentLead.priority
                    )}`}
                  >
                    <p className="text-xs font-semibold uppercase">{currentLead.priority} Priority</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{currentLead.address}</p>
                      <p className="text-gray-600">{currentLead.city}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {currentLead.propertyDetails.bedrooms}bd /{' '}
                        {currentLead.propertyDetails.bathrooms}ba
                      </p>
                      <p className="text-gray-600">{currentLead.propertyDetails.squareFeet} sqft</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{currentLead.type}</p>
                      <p className="text-gray-600">Lead Type</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{currentLead.leadSource}</p>
                      <p className="text-gray-600">Last Contact: {currentLead.lastContactDate}</p>
                    </div>
                  </div>
                </div>

                {currentLead.notes && (
                  <div className="mt-4 rounded-lg bg-blue-50 p-3">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Notes:</span> {currentLead.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Call Status */}
              <div className="border-b border-gray-200 px-6 py-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Call Status</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          callStatus === 'idle'
                            ? 'bg-gray-400'
                            : callStatus === 'calling'
                              ? 'animate-pulse bg-yellow-500'
                              : callStatus === 'connected'
                                ? 'animate-pulse bg-green-500'
                                : 'bg-blue-500'
                        }`}
                      />
                      <span className="font-semibold text-gray-900 capitalize">{callStatus}</span>
                    </div>
                  </div>
                  {callStatus === 'connected' && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">Call Duration</p>
                      <p className="mt-1 font-mono text-2xl font-bold text-orange-500">
                        {formatDuration(callDuration)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {callStatus === 'idle' && (
                    <button
                      onClick={handleCall}
                      className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      Start Call
                    </button>
                  )}
                  {(callStatus === 'calling' || callStatus === 'connected') && (
                    <>
                      <button
                        onClick={() => {
                          setCallStatus('wrap-up');
                          setTimeout(() => {
                            setCallStatus('idle');
                          }, 300);
                        }}
                        className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600 transition-colors"
                      >
                        <PhoneOff className="h-5 w-5" />
                        End Call
                      </button>
                      <button
                        onClick={handleSkip}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <SkipForward className="h-5 w-5" />
                        Skip
                      </button>
                    </>
                  )}
                  {callStatus === 'idle' && (
                    <>
                      <button
                        onClick={handleSkip}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <SkipForward className="h-5 w-5" />
                        Skip
                      </button>
                      <button
                        onClick={() => handleDisposition('callback_scheduled')}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Calendar className="h-5 w-5" />
                        Mark Callback
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Disposition Buttons */}
              {(callStatus === 'wrap-up' || (callStatus === 'idle' && disposition === null)) && (
                <div className="border-b border-gray-200 px-6 py-6">
                  <p className="mb-3 font-semibold text-gray-900">Call Disposition</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    <button
                      onClick={() => handleDisposition('hot_lead')}
                      className="rounded-lg border-2 border-green-300 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors"
                    >
                      Hot Lead
                    </button>
                    <button
                      onClick={() => handleDisposition('callback_scheduled')}
                      className="rounded-lg border-2 border-blue-300 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      Callback
                    </button>
                    <button
                      onClick={() => handleDisposition('voicemail')}
                      className="rounded-lg border-2 border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
                    >
                      Voicemail
                    </button>
                    <button
                      onClick={() => handleDisposition('no_answer')}
                      className="rounded-lg border-2 border-red-300 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                    >
                      No Answer
                    </button>
                    <button
                      onClick={() => handleDisposition('wrong_number')}
                      className="rounded-lg border-2 border-red-300 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                    >
                      Wrong #
                    </button>
                    <button
                      onClick={() => handleDisposition('not_interested')}
                      className="rounded-lg border-2 border-red-300 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                    >
                      Not Interested
                    </button>
                  </div>
                </div>
              )}

              {/* Notes Section */}
              {(callStatus !== 'idle' || disposition !== null) && (
                <div className="border-b border-gray-200 px-6 py-6">
                  <button
                    onClick={() => setNotesExpanded(!notesExpanded)}
                    className="mb-3 flex items-center gap-2 font-semibold text-gray-900"
                  >
                    <MessageSquare className="h-5 w-5 text-orange-500" />
                    Add Note
                    {notesExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {notesExpanded && (
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this call..."
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                      rows={3}
                    />
                  )}
                </div>
              )}

              {/* Transfer Button */}
              {callStatus === 'connected' && (
                <div className="px-6 py-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-500 bg-orange-50 px-6 py-3 font-semibold text-orange-600 hover:bg-orange-100 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                    Transfer to FUB
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Queue List */}
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="font-semibold text-gray-900">Queue ({SAMPLE_LEADS.length})</h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {SAMPLE_LEADS.map((lead, index) => (
                  <button
                    key={lead.id}
                    onClick={() => {
                      setCurrentLeadIndex(index);
                      setCallStatus('idle');
                      setDisposition(null);
                      setNotes('');
                    }}
                    className={`w-full border-b border-gray-100 px-6 py-4 text-left transition-colors hover:bg-orange-50 ${
                      index === currentLeadIndex ? 'bg-orange-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.phone}</p>
                        <p className="mt-1 text-xs text-gray-600">{lead.address}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                            {lead.type}
                          </span>
                          <span
                            className={`inline-block rounded px-2 py-1 text-xs font-medium ${getPriorityColor(
                              lead.priority
                            ).replace('bg-', 'bg-').replace('text-', 'text-')}`}
                          >
                            {lead.priority}
                          </span>
                        </div>
                      </div>
                      {index === currentLeadIndex && (
                        <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-orange-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Call History */}
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="font-semibold text-gray-900">Recent Calls</h2>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {callHistory.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-sm text-gray-500">No calls yet</p>
                  </div>
                ) : (
                  callHistory.map((call, index) => (
                    <div
                      key={index}
                      className={`border-b border-gray-100 px-6 py-4 text-sm ${getDispositionColor(
                        call.disposition
                      )}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{call.leadName}</p>
                          <p className="mt-1 text-xs opacity-75">
                            {getDispositionLabel(call.disposition)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-75">{call.timestamp}</p>
                          <p className="mt-1 font-mono text-xs">
                            {Math.floor(call.duration / 60)}:{(call.duration % 60)
                              .toString()
                              .padStart(2, '0')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
