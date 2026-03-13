import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.png";

const HomeHero = () => (
  <motion.section
    className="py-20 flex flex-col items-center gap-8"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <div className="relative group">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-accent/30 to-primary/50 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative metallic-card rounded-2xl overflow-hidden border border-border/50">
        <img
          src={heroBanner}
          alt="Habibur.bgd"
          className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover"
        />
      </div>
    </div>
    <div className="text-center space-y-4 max-w-2xl">
      <h2 className="font-brand text-4xl md:text-5xl text-gradient-social">
        Habibur.bgd
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        আসসালামু আলাইকুম! আমার চ্যানেলে স্বাগতম। এখানে আপনি ভ্রমণ, ভ্লগ এবং আরও অনেক কিছু উপভোগ করতে পারবেন।
      </p>
    </div>
  </motion.section>
);

export default HomeHero;
