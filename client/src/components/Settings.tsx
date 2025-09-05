import { motion } from "motion/react";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Key, 
  Globe,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Link,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    mobile: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Picture */}
            <motion.div 
              className="flex items-center gap-6"
              variants={itemVariants}
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <motion.button 
                  className="btn-primary btn-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Photo
                </motion.button>
                <motion.button 
                  className="btn-outline btn-sm ml-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </motion.button>
                <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 5MB</p>
              </div>
            </motion.div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alex Johnson"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  defaultValue="alexjohnson"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    defaultValue="alex.johnson@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="San Francisco, CA"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bio */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
              />
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Social Links</h3>
              <div className="space-y-4">
                {[
                  { icon: Github, label: "GitHub", placeholder: "github.com/username" },
                  { icon: Twitter, label: "Twitter", placeholder: "twitter.com/username" },
                  { icon: Linkedin, label: "LinkedIn", placeholder: "linkedin.com/in/username" }
                ].map((social, index) => (
                  <motion.div 
                    key={social.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground" />
                    <input
                      type="url"
                      placeholder={social.placeholder}
                      className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Password */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>

            {/* Two-Factor Authentication */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
              <div className="glassmorphism p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Authenticator App</h4>
                    <p className="text-sm text-muted-foreground">Use an authenticator app to generate codes</p>
                  </div>
                  <motion.button 
                    className="btn-primary btn-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enable
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Active Sessions */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
              <div className="space-y-3">
                {[
                  { device: "MacBook Pro - Chrome", location: "San Francisco, CA", current: true, lastActive: "Now" },
                  { device: "iPhone 14 - Safari", location: "San Francisco, CA", current: false, lastActive: "2 hours ago" },
                  { device: "Windows PC - Edge", location: "New York, NY", current: false, lastActive: "1 day ago" }
                ].map((session, index) => (
                  <motion.div 
                    key={index}
                    className="glass-card p-4 rounded-lg border flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{session.device}</h4>
                        {session.current && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                    </div>
                    {!session.current && (
                      <motion.button 
                        className="btn-outline btn-sm text-red-600 border-red-200 hover:bg-red-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Revoke
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'push', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                  { key: 'desktop', label: 'Desktop Notifications', description: 'Show desktop notifications' },
                  { key: 'mobile', label: 'Mobile Notifications', description: 'Receive notifications on mobile app' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.key}
                    className="glass-card p-4 rounded-lg border flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div>
                      <h4 className="font-medium">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <motion.label 
                      className="relative inline-flex items-center cursor-pointer"
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-11 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'} translate-y-0.5`} />
                      </div>
                    </motion.label>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Theme Preferences</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light', preview: 'bg-white border-gray-200' },
                  { id: 'dark', label: 'Dark', preview: 'bg-gray-900 border-gray-700' },
                  { id: 'system', label: 'System', preview: 'bg-gradient-to-br from-white to-gray-900 border-gray-400' }
                ].map((theme, index) => (
                  <motion.div 
                    key={theme.id}
                    className="cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-full h-20 rounded-lg border-2 ${theme.preview} mb-2`}></div>
                    <p className="text-sm font-medium text-center">{theme.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      default:
        return (
          <motion.div 
            className="text-center py-12"
            variants={itemVariants}
          >
            <SettingsIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">This settings section is under development.</p>
          </motion.div>
        );
    }
  };

  return (
    <motion.div 
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.div 
          className="lg:w-64 glassmorphism p-6 rounded-xl"
          variants={itemVariants}
        >
          <nav className="space-y-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="flex-1 glassmorphism p-6 rounded-xl"
          variants={itemVariants}
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>

          {/* Save Button */}
          {activeTab !== 'api' && (
            <motion.div 
              className="flex justify-end pt-6 mt-6 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}