import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { LogOut, User, TrendingUp, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { unreadCount, notifications, markAllAsRead, markAsRead } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(o => !o);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#notif-dd')) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">CryptoArmory</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="relative z-[10000]" id="notif-dd">
              <button
                onClick={toggleOpen}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {open && createPortal(
                <div className="fixed right-6 top-16 w-80 rounded-xl border border-gray-700/50 bg-gray-800/95 p-2 shadow-xl z-[100000]">
                  <div className="flex items-center justify-between px-2 pb-2">
                    <span className="text-gray-300 text-sm">Notifications</span>
                    <button onClick={markAllAsRead} className="text-xs text-purple-300 hover:text-purple-200">Mark all as read</button>
                  </div>
                  <div className="max-h-72 overflow-auto">
                    {notifications.length === 0 ? (
                      <div className="p-3 text-gray-400 text-sm">No notifications</div>
                    ) : notifications.map(n => (
                      <button key={n.id} onClick={() => markAsRead(n.id)} className={`w-full text-left rounded-lg p-2 text-sm ${n.read ? 'text-gray-400' : 'text-gray-200'} hover:bg-gray-700/50`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{n.title}</span>
                          <span className="text-[10px] text-gray-400">{new Date(n.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-gray-400">{n.message}</p>
                      </button>
                    ))}
                  </div>
                </div>,
                document.body
              )}
            </div>
            <Link to="/dashboard?tab=profile" className="flex items-center space-x-2 text-white hover:opacity-90">
              <User className="w-4 h-4" />
              <span className="hidden sm:block text-sm">
                {user?.firstName} {user?.lastName}
              </span>
            </Link>
            <button
              onClick={logout}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;