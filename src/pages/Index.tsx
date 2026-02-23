import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/dashboard/Header";
import UploadZone from "@/components/dashboard/UploadZone";
import VerdictPanel from "@/components/dashboard/VerdictPanel";
import EngineScores from "@/components/dashboard/EngineScores";
import FusionGauge from "@/components/dashboard/FusionGauge";
import HeatmapViewer from "@/components/dashboard/HeatmapViewer";
import FrequencyChart from "@/components/dashboard/FrequencyChart";
import BlinkTimeline from "@/components/dashboard/BlinkTimeline";
import AnalysisLog from "@/components/dashboard/AnalysisLog";
import { mockAnalysis, type AnalysisResult } from "@/lib/mock-data";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (_file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    // Simulate API call to Python backend
    setTimeout(() => {
      setResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Upload + Status row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left sidebar: Upload */}
          <div className="lg:col-span-3 space-y-5">
            <UploadZone onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

            {/* Analyzing animation */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg border border-primary/30 bg-primary/5 p-4 overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8">
                      <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                      <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-primary">Processing...</p>
                      <p className="text-[10px] font-mono text-muted-foreground">Running 3 engines</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {["Spatial CNN", "FFT Analysis", "Bio Signal"].map((eng, i) => (
                      <motion.div
                        key={eng}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, delay: i * 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-[10px] font-mono text-muted-foreground w-20 shrink-0">{eng}</span>
                        <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, delay: 0.5 + i * 0.4 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Verdict */}
            <AnimatePresence>
              {result && <VerdictPanel result={result} />}
            </AnimatePresence>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-9">
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  {/* Top row: Engine + Fusion + Heatmap */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <EngineScores result={result} />
                    <FusionGauge result={result} />
                    <HeatmapViewer result={result} />
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FrequencyChart result={result} />
                    <BlinkTimeline result={result} />
                  </div>

                  {/* Log */}
                  <AnalysisLog />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center min-h-[60vh]"
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto h-20 w-20 rounded-full bg-secondary/50 border border-border flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v6m0 0H3m6 0h12M3 9v10a2 2 0 002 2h4m-6-12V9m18 0v10a2 2 0 01-2 2h-4m6-12V9M9 21h6m-6 0V9m6 12V9" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Upload Media to Begin</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Drop an image or video frame to run multi-engine forensic analysis
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-6 pt-2">
                      {["Spatial CNN", "FFT Analysis", "Bio Signal", "Grad-CAM"].map((e) => (
                        <span key={e} className="text-[10px] font-mono text-muted-foreground px-2 py-1 rounded bg-secondary border border-border">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
