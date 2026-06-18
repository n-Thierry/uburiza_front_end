import React from 'react';
import { Bell, Search, Activity, Flame, Moon, Sun, Wifi } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TopNav({ view, setView }) {
  const { theme, toggleTheme, dataSaver, toggleDataSaver, streak } = useAppContext();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold text-xl cursor-pointer" onClick={() => setView('Dashboard')}>
          <Activity className="w-6 h-6" />
          <span>Uburiza Learn</span>
        </div>
        
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <button onClick={() => setView('Dashboard')} className={`${view === 'Dashboard' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}>Courses</button>
          <button onClick={() => setView('Resources')} className={`${view === 'Resources' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}>Resources</button>
          <button onClick={() => setView('Dashboard')} className={`${view === 'Dashboard' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'}`}>My Dashboard</button>
        </nav>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search skills..." 
            className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 transition-colors duration-300"
          />
        </div>
        
        <div className="flex items-center space-x-3 border-r border-gray-200 dark:border-gray-700 pr-6">
          <button onClick={toggleDataSaver} className={`p-2 rounded-full transition-colors ${dataSaver ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`} title="Data Saver Mode">
            <Wifi className="w-4 h-4" />
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Toggle Dark Mode">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="flex items-center space-x-1 text-orange-500 font-bold text-sm bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-full" title={`${streak} Day Streak!`}>
          <Flame className="w-4 h-4 fill-orange-500" />
          <span>{streak}</span>
        </div>

        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative cursor-pointer">
          <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
