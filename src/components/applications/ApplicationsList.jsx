import React from 'react';
import { ExternalLink, LayoutGrid, Mail } from 'lucide-react';
import { PiMicrosoftTeamsLogo } from "react-icons/pi";
import { PiSlackLogoLight } from "react-icons/pi";
import { PiGoogleDriveLogo } from "react-icons/pi";
import { SiJira } from "react-icons/si";
import { RxNotionLogo } from "react-icons/rx";

const ApplicationsList = () => {
  const applications = [
    {
      id: 1,
      name: 'Teams',
      description: 'Video conferencing & collaboration',
      icon: PiMicrosoftTeamsLogo,
      color: 'bg-[#6366F1]/10',
      borderColor: 'border-[#6366F1]/30',
      url: 'msteams://',
      webUrl: 'https://teams.microsoft.com',
      category: 'Communication'
    },
    {
      id: 2,
      name: 'Slack',
      description: 'Team messaging & channels',
      icon: PiSlackLogoLight,
      color: 'bg-[#6366F1]/10',
      borderColor: 'border-[#6366F1]/30',
      url: 'slack://',
      webUrl: 'https://slack.com',
      category: 'Communication'
    },
    {
      id: 3,
      name: 'Gmail',
      description: 'Email communication',
      icon: Mail,
      color: 'bg-[#6366F1]/10',
      borderColor: 'border-[#6366F1]/30',
      url: 'https://gmail.com',
      webUrl: 'https://gmail.com',
      category: 'Communication'
    },
    {
      id: 4,
      name: 'Drive',
      description: 'Cloud storage & documents',
      icon: PiGoogleDriveLogo,
      color: 'bg-[#6366F1]/10',
      borderColor: 'border-[#6366F1]/30',
      url: 'https://drive.google.com',
      webUrl: 'https://drive.google.com',
      category: 'Storage'
    },
    {
      id: 5,
      name: 'Jira',
      description: 'Project management',
      icon: SiJira,
      color: 'bg-[#6366F1]/10',
      borderColor: 'border-[#6366F1]/30',
      url: 'https://jira.atlassian.com',
      webUrl: 'https://jira.atlassian.com',
      category: 'Productivity'
    },
    {
      id: 6,
      name: 'Notion',
      description: 'Notes & documentation',
      icon: RxNotionLogo,
      color: 'bg-[#6366F1]/10',
      borderColor: 'border-[#6366F1]/30',
      url: 'notion://',
      webUrl: 'https://notion.so',
      category: 'Productivity'
    }
  ];

  const handleAppClick = (app) => {
    // Try to open with app scheme first, fallback to web URL
    try {
      window.location.href = app.url;
      
      // If app scheme doesn't work (after a short delay), open web URL
      setTimeout(() => {
        window.open(app.webUrl, '_blank');
      }, 500);
    } catch (error) {
      // Fallback to web URL
      window.open(app.webUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-zinc-100">
            Applications
          </h2>
          <p className="text-sm text-zinc-500 mt-1">Quick access to your essential apps</p>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app) => {
          const IconComponent = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="group relative bg-gradient-to-br from-[#1a1b1e] via-[#1D1E21] to-[#2a2b30] rounded-2xl p-5 border border-zinc-700/30 text-left shadow-lg"
            >
              {/* Icon and Name */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-3 items-center">
                <div className={`w-16 h-16 sm:w-12 sm:h-12 rounded-xl ${app.color} ${app.borderColor} border flex items-center justify-center`}>
                  <IconComponent className="w-8 h-8 sm:w-6 sm:h-6 text-zinc-200" />
                </div>
                <ExternalLink className="hidden sm:block w-4 h-4 text-zinc-500" />
              </div>

              {/* App Info */}
              <div className="text-center sm:text-left">
                <h3 className="text-base font-semibold text-zinc-100 mb-1">
                  {app.name}
                </h3>
                <p className="hidden sm:block text-xs text-zinc-500 mb-2">
                  {app.description}
                </p>
                <span className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                  {app.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationsList;
