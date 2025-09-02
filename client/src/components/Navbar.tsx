import { Code2, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "motion/react";

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
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
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

export function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glassmorphism"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <motion.div className="flex items-center space-x-2" variants={itemVariants}>
            <motion.div 
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
              variants={logoVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </motion.div>
            <span className="text-base font-semibold tracking-tight">CodeSync</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div className="hidden md:flex items-center space-x-1" variants={itemVariants}>
            <motion.a 
              href="#docs" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-150"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Docs
            </motion.a>
            <motion.a 
              href="#about" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-150"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.a>
            <motion.a 
              href="#features" 
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-150"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="hidden md:flex items-center space-x-3" variants={itemVariants}>
            <ThemeToggle />
            <motion.button 
              className="btn-ghost btn-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button 
              className="btn-primary btn-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div className="md:hidden flex items-center space-x-2" variants={itemVariants}>
            <ThemeToggle />
            <motion.button 
              className="btn-ghost btn-icon btn-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}