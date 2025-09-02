import { Download, Heart, Settings, Plus, ArrowRight, Github } from "lucide-react";
import { motion } from "motion/react";

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

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.21, 1, 0.81, 1]
    }
  }
};

const buttonSections = [
  {
    title: "Primary Buttons",
    buttons: [
      { className: "btn-primary btn-sm", icon: Plus, text: "Small" },
      { className: "btn-primary", icon: Download, text: "Default" },
      { className: "btn-primary btn-lg", icon: ArrowRight, text: "Large" }
    ]
  },
  {
    title: "Secondary Buttons",
    buttons: [
      { className: "btn-secondary btn-sm", text: "Settings" },
      { className: "btn-secondary", icon: Heart, text: "Like Project" },
      { className: "btn-secondary btn-lg", icon: Github, text: "View on GitHub" }
    ]
  },
  {
    title: "Outline Buttons",
    buttons: [
      { className: "btn-outline btn-sm", text: "Cancel" },
      { className: "btn-outline", text: "Learn More" },
      { className: "btn-outline btn-lg", icon: ArrowRight, text: "Get Started" }
    ]
  },
  {
    title: "Ghost Buttons",
    buttons: [
      { className: "btn-ghost btn-sm", text: "Skip" },
      { className: "btn-ghost", icon: Settings, text: "Settings" },
      { className: "btn-ghost btn-lg", text: "Contact Support" }
    ]
  }
];

const iconButtons = [
  { className: "btn-primary btn-icon btn-sm", icon: Plus },
  { className: "btn-secondary btn-icon", icon: Heart },
  { className: "btn-ghost btn-icon", icon: Settings },
  { className: "btn-outline btn-icon", icon: Download }
];

const buttonGroups = [
  [
    { className: "btn-ghost", text: "Cancel" },
    { className: "btn-primary", icon: ArrowRight, text: "Continue" }
  ],
  [
    { className: "btn-outline btn-sm", text: "Edit" },
    { className: "btn-secondary btn-sm", text: "Duplicate" },
    { className: "btn-ghost btn-sm text-destructive hover:bg-destructive/10", text: "Delete" }
  ]
];

export function ButtonShowcase() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance leading-[1.1] tracking-tight">
            Custom Button System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Our beautiful button components built with the custom color palette, featuring seamless light and dark mode support.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Dynamic Button Sections */}
          {buttonSections.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <motion.div 
                className="flex flex-wrap items-center gap-4"
                variants={buttonContainerVariants}
              >
                {section.buttons.map((button, buttonIndex) => (
                  <motion.button 
                    key={buttonIndex}
                    className={button.className}
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {button.icon && <button.icon className="h-4 w-4 sm:h-5 sm:w-5" />}
                    {button.text}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ))}

          {/* Icon Buttons */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold">Icon Buttons</h3>
            <motion.div 
              className="flex flex-wrap items-center gap-4"
              variants={buttonContainerVariants}
            >
              {iconButtons.map((button, index) => (
                <motion.button 
                  key={index}
                  className={button.className}
                  variants={buttonVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button.icon className="h-4 w-4" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Button Groups */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold">Button Groups</h3>
            <div className="space-y-4">
              {buttonGroups.map((group, groupIndex) => (
                <motion.div 
                  key={groupIndex}
                  className="flex items-center gap-2"
                  variants={buttonContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {group.map((button, buttonIndex) => (
                    <motion.button 
                      key={buttonIndex}
                      className={button.className}
                      variants={buttonVariants}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {button.icon && <button.icon className="h-4 w-4" />}
                      {button.text}
                    </motion.button>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}