import { motion } from "framer-motion";
import myPhoto from "@/assets/myphoto.png";

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
          <img src={myPhoto} alt="Habibur.bgd" className="w-full h-full object-cover" />
        </div>
      </div>
      {/* Text Content */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-foreground leading-relaxed">
          "হে মুমিনগণ ! তোমরা ধৈর্য ধারণ করো, ধৈর্যের প্রতিযোগিতা করো এবং সর্বদা প্রস্তুত থাকো; আর আল্লাহকে ভয় করো—যাতে তোমরা সফলকাম হতে পারো।" — <span className="font-semibold text-gradient-social">আল-কুরআন (সূরা আল-ইমরান: ২০০)</span>
        </blockquote>
        <p className="text-foreground leading-relaxed">
          আমি একজন ভিডিও কন্টেন্ট ক্রিয়েটর। আমি বিশ্বাস করি, জীবনের প্রতিটি ক্ষেত্রে ধৈর্য এবং সততার সাথে কাজ করলে আল্লাহ সফলতা দান করেন। আমার এই প্ল্যাটফর্মের মাধ্যমে আমি ইতিবাচক এবং তথ্যবহুল ভিডিও শেয়ার করার চেষ্টা করি, যা মানুষকে সঠিক পথে চলতে বা নতুন কিছু শিখতে অনুপ্রেরণা জোগায়।
        </p>
        <p className="text-muted-foreground leading-relaxed">
          আপনারা আমার এই যাত্রায় সাথে আছেন, এজন্য আপনাদের প্রতি আমি কৃতজ্ঞ। আমার কাজের মূল লক্ষ্য হলো মানুষের উপকারে আসা এবং নিজেকে একজন সৎ মুসলিম হিসেবে গড়ে তোলা।
        </p>
      </div>
    </div>
  </motion.section>
);

export default AboutMe;
