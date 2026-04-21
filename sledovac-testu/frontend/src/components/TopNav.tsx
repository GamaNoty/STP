import { /*Bell, Settings,*/ User, LogOut } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const TopNav = () => {
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  const pageNames: Record<string, string> = {
    "/": "Dashboard",
    "/testy": "Testy",
    "/uceni": "Učení",
    "/detail": "Detail Testů",
    "/skupiny": "Skupiny",
    "/predmety": "Předměty",
  };

  const currentPageName = pageNames[location.pathname] || "Dashboard";

  useEffect(() => {
    document.title = `${currentPageName} | Sledovač testů`;
  }, [currentPageName]);
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <div className="text-brand-textMuted text-xs mb-1 flex gap-1">
          <span>Stránky</span>
          <span>/</span>
          <span className="text-white">{currentPageName}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-brand-textMuted">
      {isAuthenticated ? (
          <Link to={'/signin'}
            className="flex items-center gap-2 hover:text-brand-red transition-colors text-sm font-medium"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Odhlásit se</span>
          </Link>
        ) : (
          <Link to={'/signin'}
            className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium"
          >
            <User size={16} />
            <span>Přihlásit se</span>
          </Link>
        )}
        {/*<button className="hover:text-white transition-colors">
          <Settings size={16} />
        </button>
        <button className="hover:text-white transition-colors">
          <Bell size={16} />
        </button>
        */}
      </div>
    </header>
  );
};
