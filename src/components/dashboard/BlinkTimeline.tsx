import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import type { AnalysisResult } from "@/lib/mock-data";

interface BlinkTimelineProps {
  result: AnalysisResult;
}

const BlinkTimeline = ({ result }: BlinkTimelineProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="rounded-lg border border-border bg-card p-5"
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-foreground">Blink Pattern (EAR)</h2>
      <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-secondary">Bio Signal</span>
    </div>
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={result.blinkData}>
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={false}
          />
          <YAxis
            domain={[0.15, 0.45]}
            tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <ReferenceLine
            y={0.25}
            stroke="hsl(var(--warning))"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
            label={{ value: "Blink Threshold", fontSize: 8, fill: "hsl(var(--muted-foreground))" }}
          />
          <Line
            type="monotone"
            dataKey="ear"
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="text-[10px] font-mono text-muted-foreground mt-2">
      Eye Aspect Ratio over time — irregular patterns suggest synthetic generation
    </p>
  </motion.div>
);

export default BlinkTimeline;
