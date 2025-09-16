import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    (async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch {
        handleLogout(); // invalid/expired token → logout
      }
    })();
  }, [token, navigate]);

  const displayName =
    (user?.firstName || user?.first_name) && (user?.lastName || user?.last_name)
      ? `${user.firstName || user.first_name} ${user.lastName || user.last_name}`
      : "User";

  return (
    <div className="min-h-screen app-bg">
      {/* Top Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold gradient-text">SkillSwap</Link>
          <div className="flex items-center space-x-3">
            <span className="hidden sm:block text-gray-600">{displayName}</span>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!user ? (
          <div className="card text-center">
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-700">Loading your dashboard...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <section className="card lg:col-span-1">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold">
                  {displayName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${user.profileComplete ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {user.profileComplete ? "Profile Complete" : "Profile Incomplete"}
                  </span>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="card lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: "Find a Mentor", className: "btn-blue" },
                  { title: "Offer a Skill", className: "btn-purple" },
                  { title: "Schedule Session", className: "btn-cyan" },
                  { title: "Browse Skills", className: "btn-amber" },
                  { title: "My Sessions", className: "btn-pink" },
                  { title: "Settings", className: "btn-secondary" },
                ].map((action) => (
                  <button key={action.title} className={`${action.className} rounded-xl p-6 text-left`}>
                    <div className="text-sm opacity-90">Action</div>
                    <div className="text-lg font-semibold">{action.title}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Announcements */}
            <section className="card lg:col-span-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 rounded-full bg-primary-600 mt-2"></span>
                  <p className="text-gray-700">New matching algorithm improves skill pairing accuracy by 25%.</p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 rounded-full bg-primary-600 mt-2"></span>
                  <p className="text-gray-700">Dark mode coming soon! Stay tuned.</p>
                </li>
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;