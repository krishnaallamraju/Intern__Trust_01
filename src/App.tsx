import { useState, useEffect } from "react";
import Header from "./components/Header";
import AnalysisForm from "./components/AnalysisForm";
import AnalysisResultView from "./components/AnalysisResultView";
import TrustedPortals from "./components/TrustedPortals";
import AnalysisHistory from "./components/AnalysisHistory";
import { analyzeInternshipOffer } from "./services/geminiService";
import { AnalysisResult, HistoryItem } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("intern_trust_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("intern_trust_history", JSON.stringify(history));
  }, [history]);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeInternshipOffer(text);
      setResult(data);
      
      // Add to history if valid
      if (data.is_valid) {
        const newItem: HistoryItem = {
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          text: text.slice(0, 100) + (text.length > 100 ? "..." : ""),
          result: data,
        };
        setHistory(prev => [newItem, ...prev].slice(0, 20)); // Keep last 20
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during analysis. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
    }
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const selectHistoryItem = (item: HistoryItem) => {
    setResult(item.result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 container py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-950"
            >
              Stay Safe from <span className="text-blue-600">Internship Scams</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              Our AI-powered engine analyzes offer letters and messages to identify 
              common recruitment fraud patterns, protecting your career and finances.
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={reset}
                    className="gap-2"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Analyze Another Offer
                  </Button>
                </div>
                <AnalysisResultView result={result} />
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert variant="destructive" className="max-w-2xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <AnalysisHistory 
                history={history} 
                onSelect={selectHistoryItem} 
                onClear={clearHistory}
                onDeleteItem={deleteHistoryItem}
              />
              <TrustedPortals />
            </motion.div>
          )}
        </div>
      </main>

      <footer className="border-t py-6 bg-slate-50">
        <div className="container px-4 md:px-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} InternTrust. Protecting the next generation of talent.</p>
        </div>
      </footer>
    </div>
  );
}
