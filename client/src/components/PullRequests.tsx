import { motion } from "motion/react";
import { 
  GitPullRequest, 
  GitBranch, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  User,
  Calendar,
  Filter,
  Plus,
  Search,
  FolderGit2,
  GitCommit,
  Eye
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

const pullRequests = [
  {
    id: 1,
    title: "Add user authentication with JWT tokens",
    description: "Implements secure JWT-based authentication system with refresh tokens and role-based access control.",
    status: "open",
    author: "frontend_dev",
    repo: "react-dashboard",
    sourceBranch: "feature/auth",
    targetBranch: "main",
    created: "2 hours ago",
    updated: "30 minutes ago",
    commits: 8,
    additions: 245,
    deletions: 32,
    comments: 5,
    reviews: { approved: 1, requested: 2, pending: 1 },
    labels: ["feature", "security", "high-priority"],
    draft: false
  },
  {
    id: 2,
    title: "Fix mobile responsiveness on dashboard",
    description: "Resolves layout issues on mobile devices and improves touch interactions for better UX.",
    status: "review",
    author: "mobile_dev",
    repo: "ui-components",
    sourceBranch: "fix/mobile-responsive",
    targetBranch: "development",
    created: "6 hours ago",
    updated: "2 hours ago",
    commits: 3,
    additions: 89,
    deletions: 24,
    comments: 12,
    reviews: { approved: 2, requested: 0, pending: 1 },
    labels: ["bug", "mobile", "ui"],
    draft: false
  },
  {
    id: 3,
    title: "Implement real-time notifications",
    description: "Adds WebSocket-based real-time notifications with browser push notification support.",
    status: "draft",
    author: "You",
    repo: "api-gateway",
    sourceBranch: "feature/notifications",
    targetBranch: "main",
    created: "1 day ago",
    updated: "4 hours ago",
    commits: 12,
    additions: 456,
    deletions: 78,
    comments: 3,
    reviews: { approved: 0, requested: 0, pending: 0 },
    labels: ["feature", "websocket", "notifications"],
    draft: true
  },
  {
    id: 4,
    title: "Update dependencies and fix security vulnerabilities",
    description: "Updates all package dependencies to latest versions and patches known security issues.",
    status: "merged",
    author: "security_team",
    repo: "ml-analytics",
    sourceBranch: "chore/security-updates",
    targetBranch: "main",
    created: "3 days ago",
    updated: "2 days ago",
    commits: 1,
    additions: 23,
    deletions: 45,
    comments: 8,
    reviews: { approved: 3, requested: 0, pending: 0 },
    labels: ["security", "dependencies", "maintenance"],
    draft: false
  },
  {
    id: 5,
    title: "Add dark mode support to component library",
    description: "Implements comprehensive dark mode theme with CSS variables and improved accessibility.",
    status: "closed",
    author: "ui_designer",
    repo: "ui-components",
    sourceBranch: "feature/dark-mode",
    targetBranch: "main",
    created: "1 week ago",
    updated: "5 days ago",
    commits: 15,
    additions: 189,
    deletions: 67,
    comments: 24,
    reviews: { approved: 2, requested: 1, pending: 0 },
    labels: ["feature", "ui", "accessibility"],
    draft: false
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'text-green-600 dark:text-green-400';
    case 'review': return 'text-yellow-600 dark:text-yellow-400';
    case 'draft': return 'text-gray-600 dark:text-gray-400';
    case 'merged': return 'text-purple-600 dark:text-purple-400';
    case 'closed': return 'text-red-600 dark:text-red-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open': return GitPullRequest;
    case 'review': return Eye;
    case 'draft': return Clock;
    case 'merged': return CheckCircle;
    case 'closed': return AlertCircle;
    default: return GitPullRequest;
  }
};

export function PullRequests() {
  const openPRs = pullRequests.filter(pr => pr.status === 'open').length;
  const reviewPRs = pullRequests.filter(pr => pr.status === 'review').length;
  const mergedPRs = pullRequests.filter(pr => pr.status === 'merged').length;

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
          <h1 className="text-3xl font-bold mb-2">Pull Requests</h1>
          <p className="text-muted-foreground">Review and manage code contributions across repositories</p>
        </div>
        <motion.button 
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Pull Request
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        {[
          { label: "Open", value: openPRs, icon: GitPullRequest, color: "bg-green-500" },
          { label: "Under Review", value: reviewPRs, icon: Eye, color: "bg-yellow-500" },
          { label: "Merged", value: mergedPRs, icon: CheckCircle, color: "bg-purple-500" },
          { label: "Draft", value: "2", icon: Clock, color: "bg-gray-500" }
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
            placeholder="Search pull requests..."
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
            <User className="h-4 w-4 mr-2" />
            Author
          </motion.button>
          <motion.button 
            className="btn-outline btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FolderGit2 className="h-4 w-4 mr-2" />
            Repository
          </motion.button>
        </div>
      </motion.div>

      {/* Pull Requests List */}
      <motion.div 
        className="glassmorphism rounded-xl p-6"
        variants={itemVariants}
      >
        <div className="space-y-6">
          {pullRequests.map((pr, index) => {
            const StatusIcon = getStatusIcon(pr.status);
            return (
              <motion.div
                key={pr.id}
                className="glass-card p-6 rounded-lg border figma-hover"
                initial={{ opacity: 0, y: 30 }}
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
                    <StatusIcon className={`h-6 w-6 ${getStatusColor(pr.status)}`} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                            #{pr.id} {pr.title}
                          </h3>
                          {pr.draft && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {pr.description}
                        </p>
                      </div>
                    </div>

                    {/* Branch Info */}
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-2 font-mono text-primary">
                        <GitBranch className="h-4 w-4" />
                        <span>{pr.sourceBranch}</span>
                        <span className="text-muted-foreground">→</span>
                        <span>{pr.targetBranch}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-primary font-mono">{pr.repo}</span>
                      </div>
                    </div>

                    {/* Labels */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pr.labels.map((label, labelIndex) => (
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

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {[
                        { label: "Commits", value: pr.commits, icon: GitCommit },
                        { label: "Files", value: `+${pr.additions} -${pr.deletions}`, icon: null },
                        { label: "Comments", value: pr.comments, icon: MessageSquare },
                        { label: "Reviews", value: `${pr.reviews.approved}/${pr.reviews.approved + pr.reviews.requested + pr.reviews.pending}`, icon: Eye }
                      ].map((stat, statIndex) => (
                        <motion.div
                          key={stat.label}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 + statIndex * 0.05 }}
                        >
                          {stat.icon && <stat.icon className="h-4 w-4" />}
                          <span className="font-medium text-foreground">{stat.value}</span>
                          <span>{stat.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{pr.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Created {pr.created}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Updated {pr.updated}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <motion.button
                        className="btn-primary btn-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                      {pr.status === 'open' && (
                        <motion.button
                          className="btn-outline btn-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Review
                        </motion.button>
                      )}
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
          transition={{ delay: 1.5 }}
        >
          <motion.button 
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Pull Requests
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}