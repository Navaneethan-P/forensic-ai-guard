import { Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => (
  <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="relative">
          <Shield className="h-8 w-8 text-primary" />
          <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary animate-pulse-glow" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            DEEP<span className="text-primary">GUARD</span>
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
            Forensic DeepFake Detection
          </p>
        </div>
      </motion.div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary border border-border">
          <Activity className="h-3 w-3 text-primary" />
          <span className="text-xs font-mono text-muted-foreground">System Online</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">v2</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
