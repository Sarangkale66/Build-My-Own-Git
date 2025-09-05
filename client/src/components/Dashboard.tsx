import { motion } from "motion/react";
import { 
  FolderGit2, 
  Star, 
  Users, 
  GitCommit, 
  TrendingUp, 
  Activity, 
  Eye,
  GitBranch,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";

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

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

const statsData = [
  {
    title: "Repositories",
    value: "24",
    change: "+3",
    icon: FolderGit2,
    color: "bg-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30"
  },
  {
    title: "Total Stars",
    value: "1,847",
    change: "+127",
    icon: Star,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30"
  },
  {
    title: "Followers",
    value: "892",
    change: "+24",
    icon: Users,
    color: "bg-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30"
  },
  {
    title: "Contributions",
    value: "2,341",
    change: "+89",
    icon: GitCommit,
    color: "bg-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30"
  }
];

const recentRepos = [
  {
    name: "react-dashboard",
    description: "A modern, responsive dashboard built with React and TypeScript",
    language: "TypeScript",
    stars: 247,
    forks: 45,
    updated: "2 hours ago",
    isPrivate: false
  },
  {
    name: "api-gateway",
    description: "High-performance microservices API gateway with authentication",
    language: "Node.js",
    stars: 189,
    forks: 32,
    updated: "4 hours ago",
    isPrivate: true
  },
  {
    name: "ui-components",
    description: "Reusable UI component library with Tailwind CSS",
    language: "JavaScript",
    stars: 156,
    forks: 28,
    updated: "1 day ago",
    isPrivate: false
  },
  {
    name: "ml-analytics",
    description: "Machine learning analytics platform with real-time insights",
    language: "Python",
    stars: 324,
    forks: 67,
    updated: "3 days ago",
    isPrivate: false
  }
];

const recentActivity = [
  {
    type: "push",
    repo: "react-dashboard",
    branch: "main",
    message: "feat: add dark mode support",
    time: "2 hours ago",
    user: "You"
  },
  {
    type: "star",
    repo: "ui-components",
    message: "starred your repository",
    time: "4 hours ago",
    user: "sarah_dev"
  },
  {
    type: "fork",
    repo: "api-gateway",
    message: "forked your repository",
    time: "6 hours ago",
    user: "tech_lead"
  },
  {
    type: "issue",
    repo: "ml-analytics",
    message: "opened a new issue: Performance optimization needed",
    time: "8 hours ago",
    user: "data_scientist"
  },
  {
    type: "pr",
    repo: "react-dashboard",
    message: "opened pull request: Add user authentication",
    time: "1 day ago",
    user: "frontend_dev"
  }
];

const languageColors: Record<string, string> = {
  'TypeScript': 'bg-blue-500',
  'JavaScript': 'bg-yellow-500', 
  'Node.js': 'bg-green-500',
  'Python': 'bg-blue-600',
  'React': 'bg-cyan-500'
};

export function Dashboard() {
  return (
    <motion.div 
      className="p-6 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className={`glassmorphism p-6 rounded-xl figma-hover ${stat.bgColor}`}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              custom={index}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <motion.div 
                  className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500 }}
                >
                  {stat.change}
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Repositories */}
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <div className="glassmorphism rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Repositories</h2>
              <motion.button 
                className="btn-ghost btn-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {recentRepos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  className="glass-card p-4 rounded-lg border figma-hover"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-primary">{repo.name}</h3>
                      {repo.isPrivate && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          Private
                        </span>
                      )}
                    </div>
                    <motion.button
                      className="btn-ghost btn-icon btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{repo.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 ${languageColors[repo.language]} rounded-full`}></div>
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="h-4 w-4" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{repo.updated}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <div className="glassmorphism rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <motion.button 
                className="text-sm text-primary hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                View all
              </motion.button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    {activity.type === 'push' && <GitCommit className="h-4 w-4 text-primary" />}
                    {activity.type === 'star' && <Star className="h-4 w-4 text-yellow-500" />}
                    {activity.type === 'fork' && <GitBranch className="h-4 w-4 text-green-500" />}
                    {activity.type === 'issue' && <Activity className="h-4 w-4 text-red-500" />}
                    {activity.type === 'pr' && <GitBranch className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.message}</span>
                      {activity.branch && (
                        <span className="text-primary"> to {activity.branch}</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <span className="font-mono text-primary">{activity.repo}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <div className="glassmorphism rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'New Repository', icon: FolderGit2, description: 'Create a new project' },
              { label: 'Import Repository', icon: ExternalLink, description: 'Import from GitHub' },
              { label: 'View Analytics', icon: TrendingUp, description: 'See project insights' }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  className="glass-card p-4 rounded-lg border text-left figma-hover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{action.label}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}