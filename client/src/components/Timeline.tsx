import { motion } from "motion/react";
import { 
  GitCommit, 
  GitBranch, 
  Star, 
  Eye, 
  MessageCircle, 
  User,
  Calendar,
  Filter,
  Clock,
  GitPullRequest,
  AlertCircle,
  FolderGit2
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

const timelineEvents = [
  {
    id: 1,
    type: 'commit',
    title: 'Added dark mode support',
    description: 'Implemented comprehensive dark mode theme with improved accessibility',
    repo: 'react-dashboard',
    branch: 'main',
    author: 'You',
    time: '2 hours ago',
    avatar: 'user',
    changes: { added: 45, removed: 12 }
  },
  {
    id: 2,
    type: 'star',
    title: 'Repository starred',
    description: 'sarah_dev starred your repository',
    repo: 'ui-components',
    author: 'sarah_dev',
    time: '4 hours ago',
    avatar: 'sarah',
    count: 156
  },
  {
    id: 3,
    type: 'fork',
    title: 'Repository forked',
    description: 'tech_lead forked your repository to their account',
    repo: 'api-gateway',
    author: 'tech_lead',
    time: '6 hours ago',
    avatar: 'tech',
    count: 32
  },
  {
    id: 4,
    type: 'pr',
    title: 'Pull request opened',
    description: 'Add user authentication system with JWT tokens',
    repo: 'react-dashboard',
    branch: 'feature/auth',
    author: 'frontend_dev',
    time: '8 hours ago',
    avatar: 'dev1',
    prNumber: 42
  },
  {
    id: 5,
    type: 'issue',
    title: 'New issue opened',
    description: 'Performance optimization needed for large datasets',
    repo: 'ml-analytics',
    author: 'data_scientist',
    time: '10 hours ago',
    avatar: 'data',
    issueNumber: 18,
    priority: 'high'
  },
  {
    id: 6,
    type: 'release',
    title: 'New release published',
    description: 'Version 2.1.0 with bug fixes and new features',
    repo: 'ui-components',
    author: 'You',
    time: '1 day ago',
    avatar: 'user',
    version: 'v2.1.0'
  },
  {
    id: 7,
    type: 'commit',
    title: 'Updated API documentation',
    description: 'Added comprehensive examples and improved structure',
    repo: 'api-gateway',
    branch: 'docs',
    author: 'You',
    time: '2 days ago',
    avatar: 'user',
    changes: { added: 23, removed: 8 }
  },
  {
    id: 8,
    type: 'watch',
    title: 'Repository watched',
    description: 'mobile_dev is now watching your repository',
    repo: 'mobile-app',
    author: 'mobile_dev',
    time: '3 days ago',
    avatar: 'mobile',
    count: 6
  }
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'commit': return GitCommit;
    case 'star': return Star;
    case 'fork': return GitBranch;
    case 'pr': return GitPullRequest;
    case 'issue': return AlertCircle;
    case 'release': return FolderGit2;
    case 'watch': return Eye;
    default: return GitCommit;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'commit': return 'bg-blue-500';
    case 'star': return 'bg-yellow-500';
    case 'fork': return 'bg-green-500';
    case 'pr': return 'bg-purple-500';
    case 'issue': return 'bg-red-500';
    case 'release': return 'bg-indigo-500';
    case 'watch': return 'bg-cyan-500';
    default: return 'bg-gray-500';
  }
};

export function Timeline() {
  return (
    <motion.div 
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Timeline</h1>
          <p className="text-muted-foreground">Track all activities across your repositories</p>
        </div>
        <div className="flex gap-2">
          <motion.button 
            className="btn-outline btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </motion.button>
          <motion.button 
            className="btn-outline btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        {[
          { label: "Today's Activity", value: "12", icon: Clock, color: "bg-blue-500" },
          { label: "This Week", value: "87", icon: Calendar, color: "bg-green-500" },
          { label: "Active Repos", value: "8", icon: FolderGit2, color: "bg-purple-500" }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="glassmorphism p-6 rounded-xl figma-hover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Timeline */}
      <motion.div 
        className="glassmorphism rounded-xl p-6"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
          
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const Icon = getEventIcon(event.type);
              const colorClass = getEventColor(event.type);
              
              return (
                <motion.div
                  key={event.id}
                  className="relative flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className={`relative z-10 w-12 h-12 ${colorClass} rounded-full flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <motion.div 
                    className="flex-1 glass-card p-4 rounded-lg border figma-hover"
                    whileHover={{ scale: 1.01, x: 4 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{event.author}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <FolderGit2 className="h-4 w-4 text-primary" />
                          <span className="text-primary font-mono text-sm">{event.repo}</span>
                        </div>
                        
                        {event.branch && (
                          <div className="flex items-center space-x-1">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground font-mono text-sm">{event.branch}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Event-specific info */}
                      <div className="text-sm text-muted-foreground">
                        {event.changes && (
                          <span className="text-green-600 font-mono">
                            +{event.changes.added} -{event.changes.removed}
                          </span>
                        )}
                        {event.count && (
                          <span className="font-semibold">{event.count} total</span>
                        )}
                        {event.prNumber && (
                          <span className="text-primary font-mono">#{event.prNumber}</span>
                        )}
                        {event.issueNumber && (
                          <span className="text-red-500 font-mono">#{event.issueNumber}</span>
                        )}
                        {event.version && (
                          <span className="text-indigo-600 font-mono">{event.version}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Load More */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button 
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Activity
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}