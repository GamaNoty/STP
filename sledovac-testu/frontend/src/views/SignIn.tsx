import { AlertCircle, Lock, LogIn, Mail, User, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    const payload = isLogin
      ? { email, password }
      : { name, email, password, Role_ID: 1 };

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Akce se nezdařila.");
      }

      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Nastal neočekávaný problém.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center w-full px-4">
      <div className="w-full max-w-md bg-[#1C1C24]/80 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide">
            {isLogin ? "Vítej zpět" : "Vytvořit účet"}
          </h2>
          <p className="text-brand-textMuted mb-8 text-sm">
            {isLogin
              ? "Přihlas se do svého Sledovače testů."
              : "Začni sledovat své studijní výsledky ještě dnes."}
          </p>

          {error && (
            <div className="mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">
                  Jméno a příjmení
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-textMuted">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-brand-red/50 focus:bg-[#0A0A10] transition-all"
                    placeholder="Např. John Doe"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-textMuted">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-brand-red/50 focus:bg-[#0A0A10] transition-all"
                  placeholder="tvoje@adresa.cz"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">
                  Heslo
                </label>
                {isLogin && (
                  <button
                    type="button"
                    className="text-xs text-brand-red hover:text-brand-redHover transition-colors"
                  >
                    Zapomenuté heslo?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-textMuted">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-brand-red/50 focus:bg-[#0A0A10] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-brand-red text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-50"
            >
              {isLoading
                ? "Pracuji..."
                : isLogin
                  ? "Přihlásit se"
                  : "Zaregistrovat se"}
              {!isLoading &&
                (isLogin ? <LogIn size={18} /> : <UserPlus size={18} />)}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-brand-textMuted border-t border-white/5 pt-6">
            {isLogin ? (
              <>
                Nemáš ještě účet?{" "}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                  }}
                  className="text-white font-bold hover:text-brand-red transition-colors"
                >
                  Vytvořit účet
                </button>
              </>
            ) : (
              <>
                Už máš svůj účet?{" "}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                  }}
                  className="text-white font-bold hover:text-brand-red transition-colors"
                >
                  Přihlásit se
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
