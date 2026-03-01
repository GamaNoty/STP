import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

export const TopNav = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <div className="text-brand-textMuted text-xs mb-1 flex gap-1">
          <span>Pages</span>
          <span>/</span>
          <span className="text-white">Dashboard</span>
        </div>
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4 text-brand-textMuted">
        <button className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium">
          <User size={16} />
          <span>Sign In</span>
        </button>
        <button className="hover:text-white transition-colors">
          <Settings size={16} />
        </button>
        <button className="hover:text-white transition-colors">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
};