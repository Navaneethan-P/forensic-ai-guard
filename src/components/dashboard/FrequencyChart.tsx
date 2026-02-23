import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import type { AnalysisResult } from "@/lib/mock-data";

interface FrequencyChartProps {
  result: AnalysisResult;
}

const FrequencyChart = ({ result }: FrequencyChartProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="rounded-lg border border-border bg-card p-5"
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-foreground">Frequency Spectrum</h2>
      <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-secondary">FFT Analysis</span>
    </div>
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={result.frequencySpectrum}>
          <defs>
            <linearGradient id="freqGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="freq"
            tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <ReferenceLine
            x={40}
            stroke="hsl(var(--destructive))"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
          />
          <Area
            type="monotone"
            dataKey="magnitude"
            stroke="hsl(var(--accent))"
            fill="url(#freqGrad)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <p className="text-[10px] font-mono text-muted-foreground mt-2">
      Anomalous frequency peaks indicate GAN artifacts in mid-high range
    </p>
  </motion.div>
);

export default FrequencyChart;
