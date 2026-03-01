import React from 'react';

export const Groups = () => {
  const groups = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Skupina ${i + 1}`,
  }));

  return (
    <div className="flex flex-col gap-8 w-full">
      
      <div className="bg-[#1C1C24]/50 backdrop-blur-sm rounded-[32px] p-8 min-h-[700px] border border-white/5 shadow-2xl">
        
        <h2 className="text-3xl font-bold text-white mb-8 tracking-wide">
          Skupiny
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {groups.map((group) => (
            <div 
              key={group.id}
              className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-[#08080C] via-[#0D0D14] to-[#801010] border border-white/5 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-red/20 transition-all duration-300 group"
            >
              <span className="absolute top-4 left-4 text-brand-red text-xs font-bold">
                {group.id}
              </span>

              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {group.name}
                </h3>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};