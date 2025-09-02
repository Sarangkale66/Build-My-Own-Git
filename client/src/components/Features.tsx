import { 
  Zap, 
  Brain, 
  Shield, 
  Users, 
  GitBranch,
  Rocket
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "10x faster operations with next-gen infrastructure."
  },
  {
    icon: Brain,
    title: "AI Code Review",
    description: "Advanced AI analyzes code for bugs and optimization."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption."
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Seamless team collaboration with live editing."
  },
  {
    icon: GitBranch,
    title: "Smart Branching",
    description: "Intelligent merge conflict resolution and automation."
  },
  {
    icon: Rocket,
    title: "Instant Deployment",
    description: "Deploy to production in seconds globally."
  }
];

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

const headerVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
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

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1],
      delay: 0.2
    }
  }
};

export function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance leading-[1.1] tracking-tight">
            Powerful Features
            <br />
            <span className="text-muted-foreground">for Modern Development</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Everything you need to build, collaborate, and deploy amazing software with your team.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-card rounded-2xl p-6 figma-hover group"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-accent/80 transition-all duration-150"
                variants={iconVariants}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <feature.icon className="h-5 w-5 text-foreground" />
              </motion.div>
              <motion.h3 
                className="text-base font-semibold mb-2 tracking-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}