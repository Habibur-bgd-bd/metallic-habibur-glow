import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

const SubscribeSection = () => (
  <motion.section
    className="py-16 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto leading-relaxed">
      আমার নতুন সব ভিডিও সবার আগে পেতে আমার চ্যানেলটি সাবস্ক্রাইব করুন।
    </p>
    <a
      href="https://www.youtube.com/@Habibur_bgd?sub_confirmation=1"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-social-yt text-foreground font-semibold text-lg hover:text-foreground hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-105"
    >
      <Youtube size={24} />
      Subscribe
    </a>
  </motion.section>
);

export default SubscribeSection;
