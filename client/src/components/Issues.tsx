import { motion } from "motion/react";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  User,
  Calendar,
  Filter,
  Plus,
  Search,
  Tag,
  FolderGit2,
  Users
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

const issues = [
  {
    id: 1,
    title: "Performance optimization needed for large datasets",
    description: "The application becomes slow when handling datasets with more than 10,000 records. Need to implement pagination or virtualization.",
    status: "open",
    priority: "high",
    repo: "ml-analytics",
    assignee: "data_scientist",
    author: "performance_team",
    created: "2 hours ago",
    comments: 5,
    labels: ["performance", "enhancement", "high-priority"]
  },
  {
    id: 2,
    title: "Dark mode toggle not working in Safari",
    description: "The theme toggle button doesn't respond in Safari browsers. Works fine in Chrome and Firefox.",
    status: "open",
    priority: "medium",
    repo: "react-dashboard",
    assignee: "frontend_dev",
    author: "qa_tester",
    created: "6 hours ago",
    comments: 3,
    labels: ["bug", "safari", "ui"]
  },
  {
    id: 3,
    title: "Add TypeScript support to component library",
    description: "Convert existing JavaScript components to TypeScript for better type safety and developer experience.",
    status: "in_progress",
    priority: "medium",
    repo: "ui-components",
    assignee: "You",
    author: "You",
    created: "1 day ago",
    comments: 8,
    labels: ["typescript", "enhancement", "good-first-issue"]
  },
  {
    id: 4,
    title: "API rate limiting documentation missing",
    description: "The API documentation doesn't explain rate limiting policies. Developers are hitting limits without understanding why.",
    status: "open",
    priority: "low",
    repo: "api-gateway",
    assignee: null,
    author: "docs_team",
    created: "2 days ago",
    comments: 2,
    labels: ["documentation", "api"]
  },
  {
    id: 5,
    title: "Memory leak in WebSocket connections",
    description: "WebSocket connections are not properly cleaned up when components unmount, causing memory leaks over time.",
    status: "closed",
    priority: "high",
    repo: "react-dashboard",
    assignee: "backend_dev",
    author: "monitoring_team",
    created: "3 days ago",
    comments: 12,
    labels: ["bug", "websocket", "memory-leak", "fixed"]
  },
  {
    id: 6,
    title: "Mobile app crashes on Android 12",
    description: "The mobile application consistently crashes on Android 12 devices during the login process.",
    status: "open",
    priority: "critical",
    repo: "mobile-app",
    assignee: "mobile_dev",
    author: "user_reports",
    created: "4 days ago",
    comments: 15,
    labels: ["critical", "android", "crash", "mobile"]
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'text-red-600 dark:text-red-400';
    case 'in_progress': return 'text-yellow-600 dark:text-yellow-400';
    case 'closed': return 'text-green-600 dark:text-green-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open': return AlertCircle;
    case 'in_progress': return Clock;
    case 'closed': return CheckCircle;
    default: return AlertCircle;
  }
};

export function Issues() {
  const openIssues = issues.filter(issue => issue.status === 'open').length;
  const inProgressIssues = issues.filter(issue => issue.status === 'in_progress').length;
  const closedIssues = issues.filter(issue => issue.status === 'closed').length;

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
          <h1 className="text-3xl font-bold mb-2">Issues</h1>
          <p className="text-muted-foreground">Track bugs, feature requests, and tasks across repositories</p>
        </div>
        <motion.button 
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Issue
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        {[
          { label: "Open", value: openIssues, icon: AlertCircle, color: "bg-red-500" },
          { label: "In Progress", value: inProgressIssues, icon: Clock, color: "bg-yellow-500" },
          { label: "Closed", value: closedIssues, icon: CheckCircle, color: "bg-green-500" }
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

      {/* Filters */}
      <motion.div 
        className="glassmorphism p-4 rounded-xl flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search issues..."
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="flex gap-2">
          <motion.button 
            className="btn-outline btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Status
          </motion.button>
          <motion.button 
            className="btn-outline btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Tag className="h-4 w-4 mr-2" />
            Labels
          </motion.button>
          <motion.button 
            className="btn-outline btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="h-4 w-4 mr-2" />
            Assignee
          </motion.button>
        </div>
      </motion.div>

      {/* Issues List */}
      <motion.div 
        className="glassmorphism rounded-xl p-6"
        variants={itemVariants}
      >
        <div className="space-y-4">
          {issues.map((issue, index) => {
            const StatusIcon = getStatusIcon(issue.status);
            return (
              <motion.div
                key={issue.id}
                className="glass-card p-4 rounded-lg border figma-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01, x: 4 }}
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <motion.div 
                    className="mt-1"
                    whileHover={{ scale: 1.2 }}
                  >
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(issue.status)}`} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                          #{issue.id} {issue.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {issue.description}
                        </p>
                      </div>
                      
                      {/* Priority Badge */}
                      <motion.div
                        className={`ml-4 w-3 h-3 ${getPriorityColor(issue.priority)} rounded-full`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.05, type: "spring" }}
                        title={`${issue.priority} priority`}
                      />
                    </div>

                    {/* Labels */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {issue.labels.map((label, labelIndex) => (
                        <motion.span
                          key={label}
                          className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full hover:bg-accent/80 cursor-pointer transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + labelIndex * 0.02 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {label}
                        </motion.span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FolderGit2 className="h-4 w-4" />
                          <span className="font-mono text-primary">{issue.repo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{issue.author}</span>
                        </div>
                        {issue.assignee && (
                          <div className="flex items-center gap-1">
                            <span>assigned to</span>
                            <span className="font-medium">{issue.assignee}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{issue.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{issue.created}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button 
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Issues
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}