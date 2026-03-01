import {
  CalendarDays,
  FileText,
  Home,
  Layers,
  Package,
  Rocket,
  User,
} from "lucide-react";
import React from "react";
import { useLocation, Link } from "react-router-dom";

export const Sidebar = () => {
  const mainNav = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Testy", icon: CalendarDays, path: "/testy" },
    { name: "Kalendář", icon: CalendarDays, path: "/kalendar" },
    { name: "Skupiny", icon: Layers, path: "/skupiny" },
    { name: "Předměty", icon: Package, path: "/predmety" },
  ];

  const accountNav = [
    { name: "Profile", icon: User },
    { name: "Sign In", icon: FileText },
    { name: "Sign Up", icon: Rocket },
  ];
  const location = useLocation();
  return (
    <aside className="w-64 h-screen bg-brand-sidebar relative flex flex-col border-r border-white/5 z-10">
      <div className="absolute bottom-0 left-0 w-full h-64 bg-red-900/20 blur-[80px] pointer-events-none rounded-tr-full"></div>

      <div className="h-24 flex items-center justify-center relative">
        <h1 className="text-xl font-semibold tracking-wider text-white">
          Sledovač testů
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent shadow-[0_0_8px_rgba(229,57,53,0.5)]"></div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8 custom-scrollbar relative z-10">
        <nav>
          <ul className="space-y-2">
            {mainNav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-brand-red text-white shadow-lg shadow-brand-red/20"
                        : "text-brand-textMuted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon
                      size={20}
                      className={isActive ? "text-white" : "text-brand-red"}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav>
          <h2 className="text-xs font-bold text-brand-textMuted mb-4 ml-4 uppercase tracking-wider">
            Account pages
          </h2>
          <ul className="space-y-2">
            {accountNav.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-brand-textMuted hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <div className="bg-brand-card p-1.5 rounded-lg border border-white/5">
                    <item.icon size={16} className="text-brand-red" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
