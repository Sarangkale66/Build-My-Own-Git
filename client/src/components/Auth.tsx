import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Github, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1],
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

const formVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.21, 1, 0.81, 1]
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

interface AuthProps {
  onBack?: () => void;
}

export function Auth({ onBack }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header 
        className="glassmorphism border-b"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 1, 0.81, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              {onBack && (
                <motion.button 
                  onClick={onBack}
                  className="btn-ghost btn-icon btn-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.button>
              )}
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code2 className="h-4 w-4 text-primary-foreground" />
                </motion.div>
                <span className="text-base font-semibold tracking-tight">CodeSync</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Auth Card */}
          <motion.div 
            className="glassmorphism p-8 rounded-2xl"
            variants={itemVariants}
          >
            {/* Tab Switcher */}
            <motion.div 
              className="flex bg-muted rounded-lg p-1 mb-8"
              variants={itemVariants}
            >
              <motion.button
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                  isLogin 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsLogin(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
              <motion.button
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                  !isLogin 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsLogin(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </motion.div>

            {/* Form Header */}
            <motion.div className="text-center mb-6" variants={itemVariants}>
              <h1 className="text-2xl font-semibold mb-2">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? 'Sign in to your CodeSync account' 
                  : 'Join thousands of developers on CodeSync'
                }
              </p>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div className="space-y-3 mb-6" variants={itemVariants}>
              <motion.button 
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="h-5 w-5" />
                <span>Continue with GitHub</span>
              </motion.button>
              
              <motion.button 
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div 
              className="relative flex items-center justify-center mb-6"
              variants={itemVariants}
            >
              <div className="border-t border-border w-full"></div>
              <span className="bg-card px-4 text-sm text-muted-foreground">or</span>
            </motion.div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form 
                key={isLogin ? 'login' : 'signup'}
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {!isLogin && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder={isLogin ? "Enter your password" : "Create a password"}
                    />
                  </div>
                </motion.div>

                {!isLogin && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="password"
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </motion.div>
                )}

                {isLogin && (
                  <motion.div 
                    className="flex items-center justify-between"
                    variants={itemVariants}
                  >
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary border-border rounded focus:ring-ring focus:ring-2 mr-2" 
                      />
                      <span className="text-sm text-muted-foreground">Remember me</span>
                    </label>
                    <motion.a 
                      href="#" 
                      className="text-sm text-primary hover:underline"
                      whileHover={{ scale: 1.05 }}
                    >
                      Forgot password?
                    </motion.a>
                  </motion.div>
                )}

                {!isLogin && (
                  <motion.div variants={itemVariants}>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary border-border rounded focus:ring-ring focus:ring-2 mt-1" 
                      />
                      <span className="text-sm text-muted-foreground">
                        I agree to the{' '}
                        <motion.a 
                          href="#" 
                          className="text-primary hover:underline"
                          whileHover={{ scale: 1.05 }}
                        >
                          Terms of Service
                        </motion.a>
                        {' '}and{' '}
                        <motion.a 
                          href="#" 
                          className="text-primary hover:underline"
                          whileHover={{ scale: 1.05 }}
                        >
                          Privacy Policy
                        </motion.a>
                      </span>
                    </label>
                  </motion.div>
                )}

                <motion.button 
                  type="submit"
                  className="w-full btn-primary btn-lg mt-6"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </motion.button>
              </motion.form>
            </AnimatePresence>

            {/* Footer Text */}
            <motion.div 
              className="mt-6 text-center text-sm text-muted-foreground"
              variants={itemVariants}
            >
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <motion.button 
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign up
                  </motion.button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <motion.button 
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign in
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            className="mt-8 text-center text-xs text-muted-foreground"
            variants={itemVariants}
          >
            <p>
              Secure authentication powered by industry-standard encryption.
              <br />
              Your data is protected and never shared with third parties.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}