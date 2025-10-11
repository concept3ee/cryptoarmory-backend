import React from 'react';
import { useNotifications } from '../../context/NotificationContext';

const Toast: React.FC = () => {
  const { notifications } = useNotifications();
  const [visibleId, setVisibleId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (notifications.length === 0) return;
    const latest = notifications[0];
    setVisibleId(latest.id);
    const t = setTimeout(() => setVisibleId(null), 3000);
    return () => clearTimeout(t);
  }, [notifications]);

  const current = notifications.find(n => n.id === visibleId);
  if (!current) return null;

  const color = current.type === 'success' ? 'bg-green-600' : current.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`text-white px-4 py-3 rounded-lg shadow-lg ${color}`}>
        <div className="font-semibold text-sm">{current.title}</div>
        {current.message && <div className="text-xs opacity-90">{current.message}</div>}
      </div>
    </div>
  );
};

export default Toast;


