import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "@/lib/mock-data";

interface VerdictPanelProps {
  result: AnalysisResult;
}

const VerdictPanel = ({ result }: VerdictPanelProps) => {
  const isFake = result.verdict === "FAKE";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-lg border p-6 text-center ${
        isFake
          ? "border-destructive/50 bg-destructive/5"
          : "border-primary/50 bg-primary/5"
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mx-auto mb-3"
      >
        {isFake ? (
          <div className="h-16 w-16 mx-auto rounded-full bg-destructive/10 border-2 border-destructive flex items-center justify-center glow-danger">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
        ) : (
          <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center glow-primary">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        )}
      </motion.div>

      <h3 className={`text-2xl font-bold font-mono tracking-wider ${
        isFake ? "text-destructive" : "text-primary"
      }`}>
        {result.verdict}
      </h3>

      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="text-3xl font-bold text-foreground font-mono">
          {result.confidence.toFixed(1)}%
        </span>
        <span className="text-xs text-muted-foreground">confidence</span>
      </div>

      <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono ${
        result.riskLevel === "High"
          ? "bg-destructive/10 text-destructive"
          : result.riskLevel === "Medium"
          ? "bg-warning/10 text-warning"
          : "bg-primary/10 text-primary"
      }`}>
        <AlertTriangle className="h-3 w-3" />
        {result.riskLevel} Risk
      </div>

      <p className="mt-3 text-[10px] font-mono text-muted-foreground">
        {result.fileName} • {new Date(result.timestamp).toLocaleTimeString()}
      </p>
    </motion.div>
  );
};

export default VerdictPanel;
