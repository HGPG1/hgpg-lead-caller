'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Eye, EyeOff, ToggleLeft, Bell, Lock, Plug } from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Brian McCarthy',
    email: 'brian@homegrownpropertygroup.com',
    phone: '(704) 555-0142',
  });

  const [integrations, setIntegrations] = useState({
    propstream: { connected: true, apiKey: 'ps_live_7f3c8b2a1e9d4k5m' },
    followUpBoss: { connected: true, apiKey: 'fub_sk_live_9c4d2e8f1a3b7k9m' },
    twilio: { connected: false, accountSid: '', authToken: '' },
  });

  const [callSettings, setCallSettings] = useState({
    defaultAreaCode: '704',
    voicemailDrop: true,
    callRecording: true,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
  });

  const [showApiKey, setShowApiKey] = useState({
    propstream: false,
    followUpBoss: false,
    twilioSid: false,
    twilioToken: false,
  });

  const maskApiKey = (key: string) => {
    if (!key) return '';
    return key.substring(0, 10) + '*'.repeat(Math.max(0, key.length - 16)) + key.substring(key.length - 6);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleIntegrationToggle = (integration: string) => {
    setIntegrations({
      ...integrations,
      [integration]: {
        ...integrations[integration as keyof typeof integrations],
        connected: !integrations[integration as keyof typeof integrations].connected,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <p className="text-slate-400">Manage your profile, integrations, and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-500" />
            Profile Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plug className="w-5 h-5 text-orange-500" />
            Integrations
          </h2>

          {/* PropStream */}
          <div className="mb-6 pb-6 border-b border-slate-700 last:border-0 last:mb-0 last:pb-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">PropStream API</h3>
                <p className="text-sm text-slate-400">Access property data and lead lists</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                integrations.propstream.connected
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-slate-600/20 text-slate-400'
              }`}>
                {integrations.propstream.connected ? 'Connected' : 'Not Connected'}
              </div>
            </div>

            {integrations.propstream.connected && (
              <div className="bg-slate-700 rounded p-3 mb-3">
                <div className="flex items-center justify-between">
                  <input
                    type={showApiKey.propstream ? 'text' : 'password'}
                    value={integrations.propstream.apiKey}
                    readOnly
                    className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none"
                  />
                  <button
                    onClick={() => setShowApiKey({ ...showApiKey, propstream: !showApiKey.propstream })}
                    className="ml-2 p-2 hover:bg-slate-500 rounded transition"
                  >
                    {showApiKey.propstream ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <button className={`px-4 py-2 rounded font-semibold transition ${
              integrations.propstream.connected
                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}>
              {integrations.propstream.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          {/* Follow Up Boss */}
          <div className="mb-6 pb-6 border-b border-slate-700 last:border-0 last:mb-0 last:pb-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">Follow Up Boss API</h3>
                <p className="text-sm text-slate-400">Sync leads and manage follow-ups</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                integrations.followUpBoss.connected
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-slate-600/20 text-slate-400'
              }`}>
                {integrations.followUpBoss.connected ? 'Connected' : 'Not Connected'}
              </div>
            </div>

            {integrations.followUpBoss.connected && (
              <div className="bg-slate-700 rounded p-3 mb-3">
                <div className="flex items-center justify-between">
                  <input
                    type={showApiKey.followUpBoss ? 'text' : 'password'}
                    value={integrations.followUpBoss.apiKey}
                    readOnly
                    className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none"
                  />
                  <button
                    onClick={() => setShowApiKey({ ...showApiKey, followUpBoss: !showApiKey.followUpBoss })}
                    className="ml-2 p-2 hover:bg-slate-500 rounded transition"
                  >
                    {showApiKey.followUpBoss ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => handleIntegrationToggle('followUpBoss')}
              className={`px-4 py-2 rounded font-semibold transition ${
                integrations.followUpBoss.connected
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {integrations.followUpBoss.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          {/* Twilio */}
          <div className="mb-6 pb-6 border-b border-slate-700 last:border-0 last:mb-0 last:pb-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">Twilio</h3>
                <p className="text-sm text-slate-400">Power your calling and SMS features</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                integrations.twilio.connected
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-slate-600/20 text-slate-400'
              }`}>
                {integrations.twilio.connected ? 'Connected' : 'Not Connected'}
              </div>
            </div>

            {!integrations.twilio.connected ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Account SID</label>
                  <input
                    type="password"
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Auth Token</label>
                  <input
                    type="password"
                    placeholder="your_auth_token_here"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2 mb-3">
                <div className="bg-slate-700 rounded p-3">
                  <label className="block text-xs text-slate-400 mb-1">Account SID</label>
                  <div className="flex items-center justify-between">
                    <input
                      type={showApiKey.twilioSid ? 'text' : 'password'}
                      value="ACxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => setShowApiKey({ ...showApiKey, twilioSid: !showApiKey.twilioSid })}
                      className="ml-2 p-1 hover:bg-slate-500 rounded transition"
                    >
                      {showApiKey.twilioSid ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="bg-slate-700 rounded p-3">
                  <label className="block text-xs text-slate-400 mb-1">Auth Token</label>
                  <div className="flex items-center justify-between">
                    <input
                      type={showApiKey.twilioToken ? 'text' : 'password'}
                      value="your_auth_token_here"
                      readOnly
                      className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => setShowApiKey({ ...showApiKey, twilioToken: !showApiKey.twilioToken })}
                      className="ml-2 p-1 hover:bg-slate-500 rounded transition"
                    >
                      {showApiKey.twilioToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => handleIntegrationToggle('twilio')}
              className={`px-4 py-2 rounded font-semibold transition ${
                integrations.twilio.connected
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {integrations.twilio.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        {/* Call Settings Section */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ToggleLeft className="w-5 h-5 text-orange-500" />
            Call Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Default Area Code</label>
              <input
                type="text"
                value={callSettings.defaultAreaCode}
                onChange={(e) =>
                  setCallSettings({ ...callSettings, defaultAreaCode: e.target.value })
                }
                placeholder="704"
                maxLength={3}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <p className="text-xs text-slate-400 mt-1">Charlotte area: 704, 980</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700 rounded">
              <div>
                <p className="font-semibold text-white">Voicemail Drop</p>
                <p className="text-sm text-slate-400">Automatically drop voicemail when calling</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition cursor-pointer ${
                callSettings.voicemailDrop ? 'bg-orange-500' : 'bg-slate-600'
              }`}
                onClick={() =>
                  setCallSettings({ ...callSettings, voicemailDrop: !callSettings.voicemailDrop })
                }
              >
                <div className={`w-6 h-6 bg-white rounded-full transition transform ${
                  callSettings.voicemailDrop ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700 rounded">
              <div>
                <p className="font-semibold text-white">Call Recording</p>
                <p className="text-sm text-slate-400">Record all incoming and outgoing calls</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition cursor-pointer ${
                callSettings.callRecording ? 'bg-orange-500' : 'bg-slate-600'
              }`}
                onClick={() =>
                  setCallSettings({ ...callSettings, callRecording: !callSettings.callRecording })
                }
              >
                <div className={`w-6 h-6 bg-white rounded-full transition transform ${
                  callSettings.callRecording ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences Section */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            Notification Preferences
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded">
              <div>
                <p className="font-semibold text-white">Email Notifications</p>
                <p className="text-sm text-slate-400">Receive email alerts for new leads and updates</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition cursor-pointer ${
                notifications.emailNotifications ? 'bg-orange-500' : 'bg-slate-600'
              }`}
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    emailNotifications: !notifications.emailNotifications,
                  })
                }
              >
                <div className={`w-6 h-6 bg-white rounded-full transition transform ${
                  notifications.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700 rounded">
              <div>
                <p className="font-semibold text-white">SMS Notifications</p>
                <p className="text-sm text-slate-400">Receive text messages for urgent updates</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition cursor-pointer ${
                notifications.smsNotifications ? 'bg-orange-500' : 'bg-slate-600'
              }`}
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    smsNotifications: !notifications.smsNotifications,
                  })
                }
              >
                <div className={`w-6 h-6 bg-white rounded-full transition transform ${
                  notifications.smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-700 rounded">
              <div>
                <p className="font-semibold text-white">Push Notifications</p>
                <p className="text-sm text-slate-400">Browser notifications for important events</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition cursor-pointer ${
                notifications.pushNotifications ? 'bg-orange-500' : 'bg-slate-600'
              }`}
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    pushNotifications: !notifications.pushNotifications,
                  })
                }
              >
                <div className={`w-6 h-6 bg-white rounded-full transition transform ${
                  notifications.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition">
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
