import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createApi } from '../../lib/api';
import { ChangePasswordBody, ProfileUpdateBody } from '../../types';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState<string>('');

  const api = createApi({ baseUrl: '', authToken: (window as any).__AUTH_TOKEN__ || '' });

  useEffect(() => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
  }, [user]);

  const onSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    try {
      const body: ProfileUpdateBody = { firstName, lastName };
      await api.updateProfile(body);
      setStatus('Profile updated');
    } catch (err: any) {
      setStatus(err?.message || 'Failed to update profile');
    }
  };

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    try {
      const body: ChangePasswordBody = { currentPassword, newPassword };
      await api.changePassword(body);
      setStatus('Password changed');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setStatus(err?.message || 'Failed to change password');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Profile</h2>
        <p className="text-gray-400">Manage your personal information and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={onSaveProfile} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-semibold">Personal info</h3>
          <label className="block">
            <span className="text-gray-400 text-sm">First name</span>
            <input value={firstName} onChange={e=>setFirstName(e.target.value)} className="mt-1 w-full bg-gray-900/60 text-white rounded-lg p-2 border border-gray-700/50" />
          </label>
          <label className="block">
            <span className="text-gray-400 text-sm">Last name</span>
            <input value={lastName} onChange={e=>setLastName(e.target.value)} className="mt-1 w-full bg-gray-900/60 text-white rounded-lg p-2 border border-gray-700/50" />
          </label>
          <div className="flex justify-end">
            <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
          </div>
        </form>

        <form onSubmit={onChangePassword} className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-semibold">Change password</h3>
          <label className="block">
            <span className="text-gray-400 text-sm">Current password</span>
            <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 w-full bg-gray-900/60 text-white rounded-lg p-2 border border-gray-700/50" />
          </label>
          <label className="block">
            <span className="text-gray-400 text-sm">New password</span>
            <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 w-full bg-gray-900/60 text-white rounded-lg p-2 border border-gray-700/50" />
          </label>
          <div className="flex justify-end">
            <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg">Update</button>
          </div>
        </form>
      </div>

      {user && (
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-2">Account</h3>
          <div className="text-gray-300">Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
          <div className="text-gray-400">Email: {user.email}</div>
        </div>
      )}

      {status && <div className="text-sm text-blue-300">{status}</div>}
    </div>
  );
};

export default Profile;
