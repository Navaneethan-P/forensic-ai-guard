import { motion } from "framer-motion";
import type { AnalysisResult } from "@/lib/mock-data";

interface HeatmapViewerProps {
  result: AnalysisResult;
}

const HeatmapViewer = ({ result }: HeatmapViewerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="rounded-lg border border-border bg-card p-5"
  >
    <h2 className="text-sm font-semibold text-foreground mb-4">
      Grad-CAM Heatmap
    </h2>
    <div className="relative aspect-[4/3] rounded-md bg-background overflow-hidden border border-border">
      {/* Simulated face silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 opacity-20">
          <ellipse cx="50" cy="42" rx="28" ry="35" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          <ellipse cx="38" cy="35" rx="5" ry="3" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          <ellipse cx="62" cy="35" rx="5" ry="3" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          <ellipse cx="50" cy="50" rx="4" ry="5" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          <path d="M 40 60 Q 50 68 60 60" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Heatmap blobs */}
      {result.heatmapRegions.map((region, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: region.intensity * 0.7, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
          className="absolute rounded-full"
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            width: `${20 + region.intensity * 20}%`,
            height: `${20 + region.intensity * 20}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, hsl(0 72% 55% / ${region.intensity * 0.6}), hsl(38 92% 50% / ${region.intensity * 0.3}), transparent)`,
            filter: "blur(8px)",
          }}
        />
      ))}

      <div className="absolute inset-0 scan-line pointer-events-none" />

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
        <div className="h-2 w-16 rounded-full" style={{
          background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--warning)), hsl(var(--destructive)))"
        }} />
        <span className="text-[9px] font-mono text-muted-foreground">Anomaly</span>
      </div>
    </div>
    {result.heatmapRegions.length === 0 && (
      <p className="text-xs text-primary font-mono mt-2 text-center">No anomalous regions detected</p>
    )}
  </motion.div>
);

export default HeatmapViewer;
