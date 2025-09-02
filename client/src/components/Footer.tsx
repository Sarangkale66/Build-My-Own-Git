import { motion } from "motion/react";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1],
      staggerChildren: 0.2
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

export function Footer() {
  return (
    <motion.footer 
      className="border-t border-border py-6 px-6"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.p 
            className="text-muted-foreground text-sm font-medium"
            variants={itemVariants}
          >
            © 2025
          </motion.p>
          <motion.div 
            className="flex items-center space-x-6"
            variants={itemVariants}
          >
            <motion.a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Security
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}