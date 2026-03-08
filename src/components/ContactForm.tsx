import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
    });
    setLoading(false);

    if (error) {
      toast({ title: "Failed to send message", description: "Please try again later.", variant: "destructive" });
    } else {
      toast({ title: "Message sent!", description: "Thank you for reaching out." });
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <section className="py-16">
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-brand text-3xl text-gradient-social text-center mb-2">Contact Me</h2>
        <p className="text-muted-foreground text-center mb-8">Have a question or want to work together? Drop me a message!</p>

        <form onSubmit={handleSubmit} className="metallic-card rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Name <span className="text-destructive">*</span></label>
            <Input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              maxLength={100}
              required
              className="bg-secondary/50 border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              maxLength={255}
              required
              className="bg-secondary/50 border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              maxLength={20}
              className="bg-secondary/50 border-border/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Message <span className="text-destructive">*</span></label>
            <Textarea
              placeholder="Write your message here..."
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              maxLength={1000}
              required
              rows={5}
              className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:text-foreground hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-[1.02]"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
