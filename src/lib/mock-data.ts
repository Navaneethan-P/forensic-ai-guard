export interface AnalysisResult {
  fileName: string;
  fileType: "image" | "video";
  verdict: "REAL" | "FAKE";
  confidence: number;
  riskLevel: "Low" | "Medium" | "High";
  engines: {
    spatial: { score: number; label: string };
    frequency: { score: number; label: string };
    biological: { score: number; label: string };
  };
  fusionWeights: { spatial: number; frequency: number; biological: number };
  heatmapRegions: { x: number; y: number; intensity: number }[];
  blinkData: { timestamp: number; ear: number }[];
  frequencySpectrum: { freq: number; magnitude: number }[];
  timestamp: string;
}

export const mockAnalysis: AnalysisResult = {
  fileName: "suspect_video_frame_0042.png",
  fileType: "image",
  verdict: "FAKE",
  confidence: 94.7,
  riskLevel: "High",
  engines: {
    spatial: { score: 0.92, label: "EfficientNet-B4" },
    frequency: { score: 0.96, label: "FFT Classifier" },
    biological: { score: 0.88, label: "Blink Analyzer" },
  },
  fusionWeights: { spatial: 0.4, frequency: 0.35, biological: 0.25 },
  heatmapRegions: [
    { x: 35, y: 25, intensity: 0.95 },
    { x: 55, y: 30, intensity: 0.82 },
    { x: 45, y: 60, intensity: 0.7 },
    { x: 60, y: 45, intensity: 0.6 },
    { x: 30, y: 50, intensity: 0.5 },
  ],
  blinkData: Array.from({ length: 60 }, (_, i) => ({
    timestamp: i,
    ear: 0.3 + Math.sin(i * 0.5) * 0.08 + (Math.random() - 0.5) * 0.04,
  })),
  frequencySpectrum: Array.from({ length: 50 }, (_, i) => ({
    freq: i * 2,
    magnitude: Math.exp(-i * 0.05) * 100 + (i > 20 && i < 35 ? 40 + Math.random() * 20 : Math.random() * 5),
  })),
  timestamp: new Date().toISOString(),
};

export const mockRealAnalysis: AnalysisResult = {
  fileName: "verified_portrait_001.jpg",
  fileType: "image",
  verdict: "REAL",
  confidence: 97.2,
  riskLevel: "Low",
  engines: {
    spatial: { score: 0.04, label: "EfficientNet-B4" },
    frequency: { score: 0.02, label: "FFT Classifier" },
    biological: { score: 0.06, label: "Blink Analyzer" },
  },
  fusionWeights: { spatial: 0.4, frequency: 0.35, biological: 0.25 },
  heatmapRegions: [],
  blinkData: Array.from({ length: 60 }, (_, i) => ({
    timestamp: i,
    ear: 0.3 + Math.sin(i * 0.3) * 0.05 + (Math.random() - 0.5) * 0.02,
  })),
  frequencySpectrum: Array.from({ length: 50 }, (_, i) => ({
    freq: i * 2,
    magnitude: Math.exp(-i * 0.06) * 100 + Math.random() * 3,
  })),
  timestamp: new Date().toISOString(),
};
