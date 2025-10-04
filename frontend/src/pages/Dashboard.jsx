import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from "next-themes";
import { Sun, Moon, Wallet, Award, BookOpen, Users } from "lucide-react";
import WalletConnect from "../components/WalletConnect";
import FlowerLoader from "../components/FlowerLoader";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };


  useEffect(() => {
    // Check if we have a token and try to get real user data
    if (token) {
      (async () => {
        try {
          const res = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch (error) {
          console.log("Backend not available, using local storage data");
          // If backend is not available, try to get user data from localStorage
          const savedUser = localStorage.getItem("userData");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            // No saved data, redirect to login
            handleLogout();
          }
        }
      })();
    } else {
      // No token, check if we have saved user data
      const savedUser = localStorage.getItem("userData");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // No saved data, redirect to login
        navigate("/");
      }
    }
  }, [token, navigate]);

  const nameAvailable = (user?.firstName || user?.first_name) && (user?.lastName || user?.last_name);
  const emailLocal = (user?.email || "").split("@")[0];
  const displayName = nameAvailable
    ? `${user.firstName || user.first_name} ${user.lastName || user.last_name}`
    : (emailLocal || "User");
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 relative">
      <div className="relative z-10">
        {/* Top Nav */}
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="text-lg sm:text-xl font-bold gradient-text">BlockLearn</Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="hidden md:block text-gray-600 dark:text-slate-300 text-sm sm:text-base truncate max-w-32 sm:max-w-none">{displayName}</span>
              {mounted && (
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className={`inline-flex items-center justify-center rounded-full p-2 transition-all duration-200 ${
                    resolvedTheme === "dark"
                      ? "bg-slate-800 hover:bg-slate-700 text-yellow-400 shadow-lg shadow-slate-900/20"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="h-4 w-4 transition-transform hover:scale-110" />
                  ) : (
                    <Moon className="h-4 w-4 transition-transform hover:scale-110" />
                  )}
                </button>
              )}
              <button onClick={handleLogout} className="btn-secondary text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3">Logout</button>
            </div>
          </div>
        </nav>

        {/* Quick actions removed from navbar. They are now in the profile card. */}
        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {!user ? (
            <div className="card text-center">
              <div className="flex items-center justify-center">
                <FlowerLoader size="medium" color="#5c3d99" showText={true} text="Loading your dashboard..." />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Profile Card */}
              <section className="card lg:col-span-1">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 dark:bg-slate-800 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl sm:text-3xl font-bold">
                    {displayName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-slate-100 break-words">{displayName}</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm break-all">{user.email}</p>
                  </div>
                  {/* Quick actions moved to the right card */}
                </div>
              </section>

              {/* Blockchain Wallet Card */}
              <section className="card lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Blockchain Wallet</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Connect to earn rewards</p>
                  </div>
                </div>
                <WalletConnect />
              </section>

              {/* Quick Actions - now in place of previous announcements card */}
              <section className="card lg:col-span-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-100 mb-3 sm:mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/match" className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Find a Mentor</Link>
                  <Link to="/skills" className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Offer a Skill</Link>
                  <Link to="/sessions" className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Schedule Session</Link>
                  <Link to="/skills" className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Browse Skills</Link>
                  <Link to="/sessions" className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 dark:focus:ring-offset-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">My Sessions</Link>
                  <Link to="/settings" className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">Settings</Link>
                  <Link to="/blockchain-certificates" className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">🏆 Certificates</Link>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;