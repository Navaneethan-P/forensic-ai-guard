import { useState, useCallback } from "react";
import { Upload, Image, Video, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

const UploadZone = ({ onAnalyze, isAnalyzing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Upload className="h-4 w-4 text-primary" />
        Media Upload
      </h2>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5 glow-primary"
            : "border-border hover:border-muted-foreground"
        } ${preview ? "p-3" : "p-8"}`}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="relative rounded-md overflow-hidden bg-background aspect-video flex items-center justify-center">
                <img src={preview} alt="Preview" className="max-h-48 object-contain" />
                <div className="absolute inset-0 scan-line pointer-events-none" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedFile?.type.startsWith("video") ? (
                    <Video className="h-3 w-3 text-accent" />
                  ) : (
                    <Image className="h-3 w-3 text-accent" />
                  )}
                  <span className="text-xs font-mono text-muted-foreground truncate max-w-[180px]">
                    {selectedFile?.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {selectedFile && (selectedFile.size / 1024).toFixed(1)}KB
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-3"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-foreground">Drop media here</p>
                <p className="text-xs text-muted-foreground mt-1">Images or video frames</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleInputChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <Button
        onClick={() => selectedFile && onAnalyze(selectedFile)}
        disabled={!selectedFile || isAnalyzing}
        className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs tracking-wider"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            ANALYZING...
          </>
        ) : (
          "RUN FORENSIC ANALYSIS"
        )}
      </Button>
    </motion.div>
  );
};

export default UploadZone;
