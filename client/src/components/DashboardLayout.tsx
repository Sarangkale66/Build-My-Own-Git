import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code2, 
  LayoutDashboard, 
  FolderGit2, 
  Clock, 
  AlertCircle, 
  FolderKanban, 
  GitPullRequest, 
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const sidebarVariants = {
  hidden: { x: -280, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1],
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1],
      delay: 0.3
    }
  }
};

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'repositories', label: 'Repositories', icon: FolderGit2, count: 24 },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'issues', label: 'Issues', icon: AlertCircle, count: 8 },
  { id: 'projects', label: 'Projects', icon: FolderKanban, count: 12 },
  { id: 'pull-requests', label: 'Pull Requests', icon: GitPullRequest, count: 3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

interface DashboardLayoutProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  children: React.ReactNode;
  onBack?: () => void;
}

export function DashboardLayout({ currentPage, onPageChange, children, onBack }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        className="hidden lg:flex w-64 bg-sidebar border-r border-sidebar-border flex-col"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Sidebar Header */}
        <motion.div className="p-6 border-b border-sidebar-border" variants={itemVariants}>
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="h-4 w-4 text-sidebar-primary-foreground" />
            </motion.div>
            <span className="text-lg font-semibold text-sidebar-foreground tracking-tight">CodeSync</span>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.nav className="flex-1 p-4" variants={itemVariants}>
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' 
                      : 'text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
                  }`}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <motion.span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        isActive 
                          ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground' 
                          : 'bg-sidebar-accent text-sidebar-accent-foreground group-hover:bg-sidebar-foreground/10'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                    >
                      {item.count}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.nav>

        {/* Recent Projects */}
        <motion.div className="p-4 border-t border-sidebar-border" variants={itemVariants}>
          <h3 className="text-xs font-semibold text-sidebar-accent-foreground uppercase tracking-wide mb-3">
            Recent
          </h3>
          <div className="space-y-2">
            {[
              { name: 'react-dashboard', type: 'TypeScript' },
              { name: 'api-gateway', type: 'Node.js' }
            ].map((project, index) => (
              <motion.button
                key={project.name}
                className="w-full flex items-center space-x-2 px-2 py-2 rounded-md hover:bg-sidebar-accent transition-colors duration-200"
                whileHover={{ x: 2 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                <div className="flex-1 text-left">
                  <div className="text-sm text-sidebar-foreground">{project.name}</div>
                  <div className="text-xs text-sidebar-accent-foreground">{project.type}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.21, 1, 0.81, 1] }}
            >
              {/* Mobile Header */}
              <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                    <Code2 className="h-4 w-4 text-sidebar-primary-foreground" />
                  </div>
                  <span className="text-lg font-semibold text-sidebar-foreground">CodeSync</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md hover:bg-sidebar-accent transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onPageChange(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                            : 'text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        {item.count && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isActive 
                              ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground' 
                              : 'bg-sidebar-accent text-sidebar-accent-foreground'
                          }`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <motion.header 
          className="glassmorphism border-b h-16 flex items-center justify-between px-6"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.21, 1, 0.81, 1] }}
        >
          <div className="flex items-center space-x-4">
            <motion.button
              className="lg:hidden btn-ghost btn-icon btn-sm"
              onClick={() => setIsMobileMenuOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-4 w-4" />
            </motion.button>
            
            {onBack && (
              <motion.button
                onClick={onBack}
                className="btn-ghost btn-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to Landing
              </motion.button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.div 
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search repositories..."
                className="w-64 pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
            </motion.div>

            {/* Notifications */}
            <motion.button
              className="btn-ghost btn-icon btn-sm relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </motion.button>

            <ThemeToggle />

            {/* Profile */}
            <motion.button
              className="btn-ghost btn-icon btn-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <User className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.header>

        {/* Page Content */}
        <motion.main 
          className="flex-1 overflow-auto"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}