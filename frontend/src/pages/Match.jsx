import React from 'react';
import { Link } from 'react-router-dom';

function Match() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold gradient-text">BlockLearn</h1>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/skills" className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                Skills
              </Link>
              <Link to="/match" className="text-primary-600 dark:text-primary-400 font-medium">
                Match
              </Link>
              <Link to="/sessions" className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                Sessions
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">Find Your Perfect Match</h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Connect with peers who can teach you new skills or learn from your expertise
          </p>
        </div>

        {/* Filter Section */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">Filter Matches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Skill Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>All Skills</option>
                <option>Programming</option>
                <option>Design</option>
                <option>Languages</option>
                <option>Music</option>
                <option>Photography</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Match Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Both (Teach & Learn)</option>
                <option>I can teach</option>
                <option>I want to learn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Availability</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Any time</option>
                <option>Weekdays</option>
                <option>Weekends</option>
                <option>Evenings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Match Card 1 */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg font-bold">
                A
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100">Alex Johnson</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Computer Science</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Can Teach:</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">JavaScript</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">React</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Python</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Wants to Learn:</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Photography</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Spanish</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="btn-primary flex-1">Connect</button>
              <button className="btn-secondary">View Profile</button>
            </div>
          </div>

          {/* Match Card 2 */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-lg font-bold">
                S
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100">Sarah Chen</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Graphic Design</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Can Teach:</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">UI/UX Design</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Figma</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Photoshop</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Wants to Learn:</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Web Development</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">JavaScript</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="btn-primary flex-1">Connect</button>
              <button className="btn-secondary">View Profile</button>
            </div>
          </div>

          {/* Match Card 3 */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 text-lg font-bold">
                M
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100">Mike Rodriguez</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Music</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Can Teach:</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Guitar</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Music Theory</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Wants to Learn:</h4>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Programming</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Data Science</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="btn-primary flex-1">Connect</button>
              <button className="btn-secondary">View Profile</button>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="btn-secondary">Load More Matches</button>
        </div>
      </main>
    </div>
  );
}

export default Match;
