import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.21, 1, 0.81, 1],
      delay: 0.8
    }
  }
};

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div 
        className="max-w-4xl mx-auto text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-[1.1] tracking-tight">
            The Next Generation
            <br />
            <span className="text-muted-foreground">of Code Collaboration</span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p 
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed"
          variants={itemVariants}
        >
          Experience lightning-fast performance, AI-powered code reviews, and seamless team collaboration 
          in the most advanced development platform ever built.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <motion.button 
            className="btn-primary btn-lg"
            onClick={onGetStarted}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Building
            <ArrowRight className="h-5 w-5" />
          </motion.button>
          <motion.button 
            className="btn-outline btn-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div className="pt-20" variants={statsVariants}>
          <motion.div 
            className="glassmorphism rounded-2xl p-8 max-w-2xl mx-auto figma-hover"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="grid grid-cols-3 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={statItemVariants}>
                <div className="text-2xl sm:text-3xl font-bold">10M+</div>
                <div className="text-muted-foreground text-sm font-medium">Repositories</div>
              </motion.div>
              <motion.div variants={statItemVariants}>
                <div className="text-2xl sm:text-3xl font-bold">500K+</div>
                <div className="text-muted-foreground text-sm font-medium">Developers</div>
              </motion.div>
              <motion.div variants={statItemVariants}>
                <div className="text-2xl sm:text-3xl font-bold">99.9%</div>
                <div className="text-muted-foreground text-sm font-medium">Uptime</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}