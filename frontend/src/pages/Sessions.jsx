import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeedbackModal from '../components/FeedbackModal';

function Sessions() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState({
    upcoming: [],
    completed: []
  });
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    sessionId: null,
    userRole: null,
    existingFeedback: null
  });
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    // Simulate loading sessions
    setTimeout(() => {
      setSessions({
        upcoming: [
          {
            id: 1,
            title: 'JavaScript Fundamentals',
            mentor: 'Alex Johnson',
            time: 'Tomorrow, 2:00 PM',
            duration: '1 hour',
            location: 'Online',
            status: 'scheduled'
          },
          {
            id: 2,
            title: 'UI/UX Design Basics',
            mentor: 'Sarah Chen',
            time: 'Friday, 4:00 PM',
            duration: '1.5 hours',
            location: 'Library Room 201',
            status: 'scheduled'
          }
        ],
        completed: [
          {
            id: 3,
            title: 'React Advanced Concepts',
            mentor: 'Mike Rodriguez',
            time: 'Yesterday, 3:00 PM',
            duration: '2 hours',
            location: 'Online',
            status: 'completed',
            hasFeedback: false
          },
          {
            id: 4,
            title: 'Node.js Backend Development',
            mentor: 'Emma Wilson',
            time: 'Last week, 1:00 PM',
            duration: '1.5 hours',
            location: 'Online',
            status: 'completed',
            hasFeedback: true
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(feedbackData)
      });

      if (response.ok) {
        // Update local state to show feedback was submitted
        setSessions(prev => ({
          ...prev,
          completed: prev.completed.map(session =>
            session.id === feedbackData.session_id
              ? { ...session, hasFeedback: true }
              : session
          )
        }));
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  const openFeedbackModal = async (sessionId, userRole) => {
    try {
      // Fetch existing feedback for the session
      const response = await fetch(`/api/feedback/session/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFeedbackModal({
          isOpen: true,
          sessionId,
          userRole,
          existingFeedback: data.data
        });
      } else {
        setFeedbackModal({
          isOpen: true,
          sessionId,
          userRole,
          existingFeedback: null
        });
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackModal({
        isOpen: true,
        sessionId,
        userRole,
        existingFeedback: null
      });
    }
  };

  const closeFeedbackModal = () => {
    setFeedbackModal({
      isOpen: false,
      sessionId: null,
      userRole: null,
      existingFeedback: null
    });
  };

  const renderSessionCard = (session) => (
    <div key={session.id} className="card">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
            session.status === 'completed'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
          }`}>
            {session.mentor.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
              {session.title}
            </h3>
            <p className="text-gray-600 dark:text-slate-400">with {session.mentor}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-slate-400">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {session.time}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {session.duration}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {session.location}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
          {session.status === 'completed' ? (
            <>
              {session.hasFeedback ? (
                <div className="px-3 py-2 text-sm text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  Feedback Submitted
                </div>
              ) : (
                <button
                  onClick={() => openFeedbackModal(session.id, 'student')}
                  className="btn-primary"
                >
                  Give Feedback
                </button>
              )}
            </>
          ) : (
            <>
              <button className="btn-secondary">Reschedule</button>
              <button className="btn-primary">Join Session</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
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
              <Link to="/match" className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                Match
              </Link>
              <Link to="/sessions" className="text-primary-600 dark:text-primary-400 font-medium">
                Sessions
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">Learning Sessions</h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            Manage your scheduled learning sessions and track your progress
          </p>
        </div>

        {/* Session Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-slate-700">
            <button className="px-6 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-md">
              Upcoming
            </button>
            <button className="px-6 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 transition-colors">
              In Progress
            </button>
            <button className="px-6 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 transition-colors">
              Completed
            </button>
          </div>
        </div>

        {/* Dynamic Sessions Content */}
        <div className="space-y-4 sm:space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : activeTab === 'upcoming' ? (
            sessions.upcoming.length > 0 ? (
              sessions.upcoming.map(session => renderSessionCard(session))
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-100">No upcoming sessions</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Get started by scheduling a new session.</p>
              </div>
            )
          ) : activeTab === 'completed' ? (
            sessions.completed.length > 0 ? (
              sessions.completed.map(session => renderSessionCard(session))
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-100">No completed sessions</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Completed sessions will appear here.</p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-slate-100">No sessions in progress</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Sessions in progress will appear here.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Quick Actions</h2>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">Schedule New Session</button>
            <button className="btn-secondary">View Calendar</button>
          </div>
        </div>
      </main>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={closeFeedbackModal}
        onSubmit={handleFeedbackSubmit}
        sessionId={feedbackModal.sessionId}
        userRole={feedbackModal.userRole}
        existingFeedback={feedbackModal.existingFeedback}
      />
    </div>
  );
}

export default Sessions;
