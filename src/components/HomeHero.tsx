import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.png";

const floatingAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const HomeHero = () => (
  <motion.section
    className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-10 py-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/40 via-accent/20 to-primary/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
      <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[hsl(221,44%,41%/0.3)] via-[hsl(330,70%,50%/0.2)] to-[hsl(30,90%,55%/0.3)] blur-md" />
      <div className="relative metallic-card rounded-full overflow-hidden border-2 border-border/40 shadow-[0_0_40px_hsl(220,8%,55%/0.15)]">
        <img
          src={heroBanner}
          alt="Habibur.bgd"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover"
        />
      </div>
    </motion.div>

    <motion.div
      className="text-center space-y-5 max-w-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h2 className="font-brand text-5xl md:text-6xl text-gradient-social">
        Habibur.bgd
      </h2>
      <motion.div
        className="mx-auto h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--metallic-shine))] to-transparent"
        initial={{ width: 0 }}
        animate={{ width: 180 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
        আসসালামু আলাইকুম! আমার চ্যানেলে স্বাগতম। এখানে আপনি ভ্রমণ, ভ্লগ এবং আরও অনেক কিছু উপভোগ করতে পারবেন।
      </p>
    </motion.div>
  </motion.section>
);

export default HomeHero;
