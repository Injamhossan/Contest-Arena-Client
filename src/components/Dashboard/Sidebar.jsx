import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Trophy, 
  PlusCircle, 
  CreditCard, 
  Users, 
  FileText, 
  Award, 
  UserCircle 
} from 'lucide-react';
import NavLogo from '../../assets/logo.svg';

const Sidebar = () => {
  const { user } = useAuth();

  const getLinks = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Manage Users', path: '/dashboard/users', icon: Users },
          { name: 'Manage Contests', path: '/dashboard/contests', icon: Trophy },
        ];
      case 'creator':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Add Contest', path: '/contests/create', icon: PlusCircle },
          { name: 'My Contests', path: '/dashboard/my-contests', icon: FileText },
          { name: 'Contest Submitted', path: '/dashboard/submitted', icon: Award },
        ];
      case 'user':
      default:
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Winning Contests', path: '/dashboard/winning', icon: Trophy },
          { name: 'My Profile', path: '/dashboard/profile', icon: UserCircle },
          { name: 'Leaderboard', path: '/leaderboard', icon: Award },
        ];
    }
  };

  const links = getLinks();

  return (
    <div className="w-64 bg-white min-h-screen border-r border-gray-200 hidden lg:block sticky top-0 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <img src={NavLogo} alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-gray-900">ContestArena</span>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/dashboard'} // Only exact match for root dashboard
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#4a37d8] text-white shadow-md shadow-[#4a37d8]/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#4a37d8]'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info at Bottom */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
            <img 
                src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.name} 
                alt={user?.name}
                className="w-10 h-10 rounded-full border border-gray-200"
            />
            <div className="overflow-hidden">
                <p className="font-medium text-sm text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
