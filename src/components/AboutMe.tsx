import { motion } from "framer-motion";

const AboutMe = () => (
  <motion.section
    className="py-16 mt-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl font-brand text-gradient-social text-center mb-10">About Me</h2>
    <div className="metallic-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {/* Profile Image Placeholder */}
      <div className="shrink-0">
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-border bg-muted flex items-center justify-center overflow-hidden">
          <span className="text-muted-foreground text-sm">Your Photo</span>
        </div>
      </div>
      {/* Text Content */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <p className="text-foreground leading-relaxed">
          আসসালামু আলাইকুম! I'm <span className="font-semibold text-gradient-social">Habibur</span>, a passionate content creator from Bangladesh. I love sharing my journey, culture, and creativity with the world through videos, photography, and storytelling.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Whether it's exploring new places, capturing everyday moments, or connecting with amazing people — I believe in creating content that inspires and brings joy. Thank you for being part of this journey!
        </p>
      </div>
    </div>
  </motion.section>
);

export default AboutMe;
