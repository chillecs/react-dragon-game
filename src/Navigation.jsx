import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext.jsx';

export function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-white hover:text-purple-300 transition-colors duration-200"
            >
              Dragon Adventure
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              // User is logged in - show logout and user info
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">
                  Welcome, {user.firstName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              // User is not logged in - show login and register buttons
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 