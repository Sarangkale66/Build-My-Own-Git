import { motion } from "motion/react";
import { 
  FolderGit2, 
  Star, 
  GitBranch, 
  Eye, 
  Lock, 
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
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

const repositories = [
  {
    name: "react-dashboard",
    description: "A modern, responsive dashboard built with React and TypeScript featuring real-time analytics",
    language: "TypeScript",
    stars: 247,
    forks: 45,
    watchers: 18,
    updated: "2 hours ago",
    isPrivate: false,
    topics: ["react", "typescript", "dashboard"]
  },
  {
    name: "api-gateway",
    description: "High-performance microservices API gateway with authentication and rate limiting",
    language: "Node.js",
    stars: 189,
    forks: 32,
    watchers: 12,
    updated: "4 hours ago",
    isPrivate: true,
    topics: ["nodejs", "api", "microservices"]
  },
  {
    name: "ui-components",
    description: "Reusable UI component library with Tailwind CSS and Storybook documentation",
    language: "JavaScript",
    stars: 156,
    forks: 28,
    watchers: 9,
    updated: "1 day ago",
    isPrivate: false,
    topics: ["ui", "tailwind", "components"]
  },
  {
    name: "ml-analytics",
    description: "Machine learning analytics platform with real-time insights and data visualization",
    language: "Python",
    stars: 324,
    forks: 67,
    watchers: 25,
    updated: "3 days ago",
    isPrivate: false,
    topics: ["machine-learning", "analytics", "python"]
  },
  {
    name: "mobile-app",
    description: "Cross-platform mobile application built with React Native and Expo",
    language: "JavaScript",
    stars: 98,
    forks: 15,
    watchers: 6,
    updated: "5 days ago",
    isPrivate: true,
    topics: ["react-native", "mobile", "expo"]
  },
  {
    name: "blockchain-wallet",
    description: "Secure cryptocurrency wallet with multi-chain support and DeFi integration",
    language: "Rust",
    stars: 412,
    forks: 89,
    watchers: 34,
    updated: "1 week ago",
    isPrivate: false,
    topics: ["blockchain", "cryptocurrency", "rust"]
  }
];

const languageColors: Record<string, string> = {
  'TypeScript': 'bg-blue-500',
  'JavaScript': 'bg-yellow-500', 
  'Node.js': 'bg-green-500',
  'Python': 'bg-blue-600',
  'Rust': 'bg-orange-600'
};

export function Repositories() {
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
          <h1 className="text-3xl font-bold mb-2">Repositories</h1>
          <p className="text-muted-foreground">Manage and explore your code repositories</p>
        </div>
        <motion.button 
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Repository
        </motion.button>
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
            placeholder="Search repositories..."
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
            Filter
          </motion.button>
          <motion.button 
            className="btn-outline btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Sort
          </motion.button>
        </div>
      </motion.div>

      {/* Repository Grid */}
      <motion.div 
        className="grid gap-6"
        variants={itemVariants}
      >
        {repositories.map((repo, index) => (
          <motion.div
            key={repo.name}
            className="glassmorphism p-6 rounded-xl figma-hover"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.01, y: -4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <FolderGit2 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">
                    {repo.name}
                  </h3>
                  {repo.isPrivate && (
                    <motion.div
                      className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    >
                      <Lock className="h-3 w-3" />
                      Private
                    </motion.div>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">{repo.description}</p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map((topic, topicIndex) => (
                    <motion.span
                      key={topic}
                      className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full hover:bg-accent/80 cursor-pointer transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + topicIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {topic}
                    </motion.span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 ${languageColors[repo.language]} rounded-full`}></div>
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-4 w-4" />
                    <span>{repo.forks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{repo.watchers}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:items-end gap-2">
                <span className="text-xs text-muted-foreground">Updated {repo.updated}</span>
                <div className="flex gap-2">
                  <motion.button
                    className="btn-outline btn-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Star className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="btn-primary btn-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Summary */}
      <motion.div 
        className="glassmorphism p-6 rounded-xl"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold mb-4">Repository Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Repositories", value: "24", icon: FolderGit2 },
            { label: "Total Stars", value: "1,426", icon: Star },
            { label: "Total Forks", value: "276", icon: GitBranch },
            { label: "Languages", value: "8", icon: TrendingUp }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}