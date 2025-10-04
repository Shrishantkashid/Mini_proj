import React from 'react';
import { Link } from 'react-router-dom';

function Skills() {
  return (
    <div className="min-h-screen app-bg">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold gradient-text">BlockLearn</h1>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/skills" className="text-primary-600 font-medium">
                Skills
              </Link>
              <Link to="/match" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Match
              </Link>
              <Link to="/sessions" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                Sessions
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skills Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover skills you can learn or share your expertise with fellow students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Skills I Can Teach */}
          <section className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills I Can Teach</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800">Programming</h3>
                <p className="text-green-600 text-sm">JavaScript, React, Python</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800">Design</h3>
                <p className="text-blue-600 text-sm">UI/UX, Figma, Adobe Creative Suite</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800">Languages</h3>
                <p className="text-purple-600 text-sm">Spanish, French, Mandarin</p>
              </div>
            </div>
            <button className="btn-primary w-full mt-6">Add New Skill</button>
          </section>

          {/* Skills I Want to Learn */}
          <section className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills I Want to Learn</h2>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-800">Music</h3>
                <p className="text-amber-600 text-sm">Guitar, Piano, Music Theory</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <h3 className="font-semibold text-pink-800">Photography</h3>
                <p className="text-pink-600 text-sm">Digital Photography, Editing</p>
              </div>
              <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <h3 className="font-semibold text-cyan-800">Cooking</h3>
                <p className="text-cyan-600 text-sm">Baking, International Cuisine</p>
              </div>
            </div>
            <button className="btn-blue w-full mt-6">Add Learning Goal</button>
          </section>
        </div>

        {/* Browse All Skills */}
        <section className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse All Skills</h2>
            <p className="text-gray-600">Explore the skills available in our community</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              'Programming', 'Design', 'Languages', 'Music', 'Photography', 
              'Cooking', 'Writing', 'Math', 'Science', 'Art', 'Sports', 'Business'
            ].map((skill) => (
              <div key={skill} className="card text-center hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900">{skill}</h3>
                <p className="text-sm text-gray-500 mt-1">12 mentors</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Skills;
