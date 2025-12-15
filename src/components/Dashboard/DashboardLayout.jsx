import React from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-black flex transition-colors duration-300">
      <aside className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-800 sticky top-0 h-screen overflow-hidden">
        <Sidebar />
      </aside>
      
      {/* Drawer Overlay */}
      {isMobileOpen && (
        <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 lg:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0">
         {/* Mobile Header */}
         <div className="lg:hidden bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 sticky top-0 z-30">
            <button onClick={() => setIsMobileOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="font-bold text-gray-900 dark:text-white">Menu</span>
         </div>

         <div className="p-4 sm:p-6 lg:p-8">
            {children}
         </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
