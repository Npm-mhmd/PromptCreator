import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, changePassword } from '../services/authService';
import { FiUser, FiMail, FiLock, FiSave, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profileForm, setProfileForm] = useState({ name: user?.name || '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSavingProfile(true);
    try {
      const updated = await updateProfile(profileForm);
      updateUser(updated);
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="page-container max-w-2xl">
      <h1 className="text-3xl font-sketch font-bold text-ink-800 mb-8">Profile Settings</h1>

      <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 mb-6"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sketch-coral to-sketch-peach flex items-center justify-center text-2xl font-bold text-white shadow-sm border-2 border-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-sketch font-bold text-ink-800">{user?.name}</h2>
            <p className="text-sm text-ink-400">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-ink-200 rounded-2xl p-6 mb-6"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-lg font-sketch font-bold text-ink-800 mb-4 flex items-center gap-2">
          <FiUser size={18} className="text-sketch-coral" />
          Edit Profile
        </h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-sketch text-base text-ink-700 mb-2">Name</label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-sketch text-base text-ink-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="input-field opacity-50 cursor-not-allowed"
            />
            <p className="text-xs text-ink-300 mt-1">Email cannot be changed</p>
          </div>
          <button
            type="submit"
            disabled={savingProfile}
            className="btn-primary flex items-center gap-2"
          >
            {savingProfile ? <FiLoader className="animate-spin" size={16} /> : <FiSave size={16} />}
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="bg-white border-2 border-ink-200 rounded-2xl p-6"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <h2 className="text-lg font-sketch font-bold text-ink-800 mb-4 flex items-center gap-2">
          <FiLock size={18} className="text-sketch-coral" />
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-sketch text-base text-ink-700 mb-2">Current Password</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="input-field"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-sketch text-base text-ink-700 mb-2">New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="input-field"
              placeholder="Min 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-sketch text-base text-ink-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="input-field"
              placeholder="Repeat new password"
            />
          </div>
          <button
            type="submit"
            disabled={savingPassword}
            className="btn-primary flex items-center gap-2"
          >
            {savingPassword ? <FiLoader className="animate-spin" size={16} /> : <FiSave size={16} />}
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
