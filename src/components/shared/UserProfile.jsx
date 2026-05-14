import { useState } from 'react';
import { User, Mail, Building, Shield, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600" />
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white">
                <span className="text-3xl font-bold text-indigo-600">{user?.avatar || user?.name?.charAt(0) || 'U'}</span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500 capitalize">{user?.role} • {user?.department}</p>
          </div>

          {/* Details Grid */}
          <div className="grid gap-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Building className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-800">{user?.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium text-gray-800 capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium text-gray-800">EMP-{String(user?.id).padStart(4, '0')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
