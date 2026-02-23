import { Brain, Waves, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "@/lib/mock-data";

interface EngineScoresProps {
  result: AnalysisResult;
}

const engines = [
  { key: "spatial" as const, icon: Brain, label: "Spatial Engine", desc: "CNN Feature Analysis" },
  { key: "frequency" as const, icon: Waves, label: "Frequency Engine", desc: "FFT Domain Analysis" },
  { key: "biological" as const, icon: Eye, label: "Bio Engine", desc: "Blink Consistency" },
];

const EngineScores = ({ result }: EngineScoresProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="rounded-lg border border-border bg-card p-5"
  >
    <h2 className="text-sm font-semibold text-foreground mb-4">Engine Breakdown</h2>
    <div className="space-y-4">
      {engines.map(({ key, icon: Icon, label, desc }, i) => {
        const score = result.engines[key].score;
        const isSuspicious = score > 0.5;
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${isSuspicious ? "text-destructive" : "text-primary"}`} />
                <div>
                  <span className="text-xs font-medium text-foreground">{label}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{desc}</span>
                </div>
              </div>
              <span className={`text-sm font-mono font-bold ${isSuspicious ? "text-destructive" : "text-primary"}`}>
                {(score * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                className={`h-full rounded-full ${isSuspicious ? "bg-destructive" : "bg-primary"}`}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono text-muted-foreground">
                {result.engines[key].label}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                W: {(result.fusionWeights[key] * 100).toFixed(0)}%
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default EngineScores;
