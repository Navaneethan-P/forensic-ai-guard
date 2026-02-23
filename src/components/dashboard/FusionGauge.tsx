import { motion } from "framer-motion";
import type { AnalysisResult } from "@/lib/mock-data";

interface FusionGaugeProps {
  result: AnalysisResult;
}

const FusionGauge = ({ result }: FusionGaugeProps) => {
  const fusionScore =
    result.engines.spatial.score * result.fusionWeights.spatial +
    result.engines.frequency.score * result.fusionWeights.frequency +
    result.engines.biological.score * result.fusionWeights.biological;

  const angle = fusionScore * 180;
  const isFake = fusionScore > 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-lg border border-border bg-card p-5"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4">Fusion Score</h2>
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Score arc */}
          <motion.path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={isFake ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (angle / 180) * 251.2 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
          {/* Needle */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: angle - 90 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            style={{ transformOrigin: "100px 100px" }}
          />
          <circle cx="100" cy="100" r="4" fill="hsl(var(--foreground))" />
          <text x="20" y="118" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">0</text>
          <text x="170" y="118" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="monospace">1.0</text>
        </svg>
        <div className="text-center mt-2">
          <span className={`text-2xl font-mono font-bold ${isFake ? "text-destructive" : "text-primary"}`}>
            {(fusionScore * 100).toFixed(1)}%
          </span>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
            Weighted Fusion Result
          </p>
        </div>
        <div className="mt-3 text-[10px] font-mono text-muted-foreground text-center">
          <span>F = ({(result.fusionWeights.spatial).toFixed(2)}×S) + ({(result.fusionWeights.frequency).toFixed(2)}×F) + ({(result.fusionWeights.biological).toFixed(2)}×B)</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FusionGauge;
