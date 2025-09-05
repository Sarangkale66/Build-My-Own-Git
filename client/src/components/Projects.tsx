import { motion } from "motion/react";
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Star,
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

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Modern e-commerce solution with React, Node.js, and PostgreSQL",
    status: "active",
    progress: 75,
    members: 8,
    tasks: { total: 45, completed: 34, inProgress: 8, pending: 3 },
    deadline: "March 15, 2025",
    repository: "ecommerce-platform",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
    priority: "high",
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    status: "active", 
    progress: 92,
    members: 12,
    tasks: { total: 67, completed: 62, inProgress: 3, pending: 2 },
    deadline: "February 28, 2025",
    repository: "mobile-banking",
    technologies: ["React Native", "TypeScript", "Firebase"],
    priority: "critical",
    lastActivity: "30 minutes ago"
  },
  {
    id: 3,
    name: "AI Analytics Dashboard",
    description: "Machine learning analytics platform with real-time insights",
    status: "planning",
    progress: 15,
    members: 5,
    tasks: { total: 32, completed: 5, inProgress: 4, pending: 23 },
    deadline: "June 30, 2025",
    repository: "ai-analytics",
    technologies: ["Python", "TensorFlow", "React", "FastAPI"],
    priority: "medium",
    lastActivity: "1 day ago"
  },
  {
    id: 4,
    name: "DevOps Automation Suite",
    description: "Complete CI/CD pipeline automation with monitoring and deployment",
    status: "active",
    progress: 60,
    members: 6,
    tasks: { total: 28, completed: 17, inProgress: 7, pending: 4 },
    deadline: "April 20, 2025",
    repository: "devops-suite",
    technologies: ["Docker", "Kubernetes", "Jenkins", "Terraform"],
    priority: "high",
    lastActivity: "4 hours ago"
  },
  {
    id: 5,
    name: "Content Management System",
    description: "Headless CMS with GraphQL API and modern admin interface",
    status: "completed",
    progress: 100,
    members: 4,
    tasks: { total: 52, completed: 52, inProgress: 0, pending: 0 },
    deadline: "Completed",
    repository: "headless-cms",
    technologies: ["GraphQL", "Node.js", "React", "MongoDB"],
    priority: "medium",
    lastActivity: "2 weeks ago"
  },
  {
    id: 6,
    name: "Blockchain Wallet",
    description: "Multi-chain cryptocurrency wallet with DeFi integration",
    status: "on_hold",
    progress: 25,
    members: 3,
    tasks: { total: 38, completed: 9, inProgress: 1, pending: 28 },
    deadline: "TBD",
    repository: "crypto-wallet",
    technologies: ["Rust", "Web3", "React", "Solidity"],
    priority: "low",
    lastActivity: "1 week ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'planning': return 'bg-blue-500';
    case 'completed': return 'bg-gray-500';
    case 'on_hold': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export function Projects() {
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.total, 0);

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
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage and track progress across all your projects</p>
        </div>
        <motion.button 
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        {[
          { label: "Active Projects", value: activeProjects, icon: FolderKanban, color: "bg-green-500" },
          { label: "Completed", value: completedProjects, icon: CheckCircle, color: "bg-blue-500" },
          { label: "Total Tasks", value: totalTasks, icon: BarChart3, color: "bg-purple-500" },
          { label: "Team Members", value: "38", icon: Users, color: "bg-orange-500" }
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
            placeholder="Search projects..."
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
            <Calendar className="h-4 w-4 mr-2" />
            Deadline
          </motion.button>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="glassmorphism p-6 rounded-xl figma-hover"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <motion.div
                    className={`w-3 h-3 ${getStatusColor(project.status)} rounded-full`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05, type: "spring" }}
                  />
                  <motion.div
                    className={`w-2 h-2 ${getPriorityColor(project.priority)} rounded-full`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.05, type: "spring" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{project.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div 
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: [0.21, 1, 0.81, 1] }}
                />
              </div>
            </div>

            {/* Tasks Summary */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Total", value: project.tasks.total, color: "text-foreground" },
                { label: "Done", value: project.tasks.completed, color: "text-green-600" },
                { label: "Active", value: project.tasks.inProgress, color: "text-yellow-600" },
                { label: "Todo", value: project.tasks.pending, color: "text-muted-foreground" }
              ].map((task, taskIndex) => (
                <motion.div
                  key={task.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + taskIndex * 0.05 }}
                >
                  <div className={`font-semibold ${task.color}`}>{task.value}</div>
                  <div className="text-xs text-muted-foreground">{task.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full hover:bg-accent/80 cursor-pointer transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + techIndex * 0.02 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.members} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{project.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{project.lastActivity}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <motion.button
                className="btn-primary btn-sm flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </motion.button>
              <motion.button
                className="btn-outline btn-sm flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Analytics
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}