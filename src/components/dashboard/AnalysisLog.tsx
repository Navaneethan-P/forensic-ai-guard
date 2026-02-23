import { motion } from "framer-motion";
import { Terminal, CheckCircle2 } from "lucide-react";

const logEntries = [
  { time: "00:00.12", msg: "Face detected — MTCNN extraction complete", status: "ok" },
  { time: "00:00.34", msg: "Spatial Engine (EfficientNet-B4) loaded", status: "ok" },
  { time: "00:01.18", msg: "CNN inference complete — P(fake) = 0.92", status: "warn" },
  { time: "00:01.45", msg: "FFT transform applied — spectrum extracted", status: "ok" },
  { time: "00:02.01", msg: "Frequency anomaly detected in 40-70Hz band", status: "warn" },
  { time: "00:02.38", msg: "Biological analysis — EAR pattern irregular", status: "warn" },
  { time: "00:03.02", msg: "Fusion scoring complete — FAKE (94.7%)", status: "error" },
  { time: "00:03.15", msg: "Grad-CAM heatmap generated", status: "ok" },
];

const AnalysisLog = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="rounded-lg border border-border bg-card p-5"
  >
    <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
      <Terminal className="h-4 w-4 text-primary" />
      Analysis Log
    </h2>
    <div className="space-y-1.5 max-h-48 overflow-y-auto">
      {logEntries.map((entry, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 + i * 0.08 }}
          className="flex items-start gap-2 text-[11px] font-mono"
        >
          <span className="text-muted-foreground shrink-0">[{entry.time}]</span>
          <CheckCircle2 className={`h-3 w-3 mt-0.5 shrink-0 ${
            entry.status === "error" ? "text-destructive" :
            entry.status === "warn" ? "text-warning" : "text-primary"
          }`} />
          <span className={`${
            entry.status === "error" ? "text-destructive" :
            entry.status === "warn" ? "text-warning" : "text-muted-foreground"
          }`}>
            {entry.msg}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default AnalysisLog;
