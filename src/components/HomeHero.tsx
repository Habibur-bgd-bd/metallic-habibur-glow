import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner-wide.png";
import myPhoto from "@/assets/myphoto.png";

const HomeHero = () => (
  <motion.section
    className="min-h-[calc(100vh-80px)] flex flex-col items-center gap-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    {/* Hero Banner */}
    <motion.div
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Glowing edge effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-social-fb/30 via-social-ig/20 to-social-yt/30 blur-xl opacity-60" />
      <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-[0_0_60px_hsl(220,8%,20%/0.5)]">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 z-10" />
        <img
          src={heroBanner}
          alt="Habibur.bgd Banner"
          className="w-full h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px] object-cover"
        />
      </div>
    </motion.div>

    {/* Profile Image - floating */}
    <motion.div
      className="relative group -mt-24 z-20"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
    >
      <div>
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-social-fb/40 via-social-ig/30 to-social-yt/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-social-fb/30 via-social-ig/20 to-social-yt/30 blur-md" />
        <div className="relative metallic-card rounded-full overflow-hidden border-2 border-border/40 shadow-[0_0_40px_hsl(220,8%,55%/0.15)]">
          <img
            src={myPhoto}
            alt="Habibur.bgd"
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover"
          />
        </div>
      </div>
    </motion.div>

    {/* Text */}
    <motion.div
      className="text-center space-y-5 max-w-2xl hero-text-float"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
    >
      <motion.h2 
        className="font-brand text-5xl md:text-6xl text-gradient-social-glow hero-text-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        Habibur.bgd
      </motion.h2>
      <motion.div
        className="mx-auto h-[1px] bg-gradient-to-r from-transparent via-metallic-shine to-transparent"
        initial={{ width: 0 }}
        animate={{ width: 180 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.p 
        className="text-muted-foreground text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        আসসালামু আলাইকুম! আমার চ্যানেলে স্বাগতম। এখানে আপনি ভ্রমণ, ব্লগ এবং আরও অনেক কিছু উপভোগ করতে পারবেন।
      </motion.p>
    </motion.div>
  </motion.section>
);

export default HomeHero;
