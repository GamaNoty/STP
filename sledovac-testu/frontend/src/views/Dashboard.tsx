import React from 'react';

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="relative overflow-hidden rounded-2xl p-8 min-h-[220px] flex flex-col justify-center bg-gradient-to-br from-[#0B0B19] to-[#13113C] border border-white/5 shadow-xl">
          
          <div className="relative z-10">
            <p className="text-brand-textMuted text-sm mb-1">Welcome back,</p>
            <h2 className="text-3xl font-bold text-white mb-4">John Doe</h2>
            <p className="text-brand-textMuted text-sm max-w-[200px] leading-relaxed">
              Glad to see you again! <br/>
              Ask me anything.
            </p>
          </div>
        </div>

        <div className="bg-[#B0B0B0] rounded-2xl p-6 text-black">
          <h3 className="text-xl font-bold mb-4">Testy</h3>
          <div className="space-y-4">
            <p className="text-sm border-b border-black/10 pb-2">Placeholder</p>
          </div>
        </div>

      </div>

    </div>
  );
};