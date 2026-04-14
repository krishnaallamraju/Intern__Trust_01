import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface AnalysisFormProps {
  onAnalyze: (text: string) => Promise<void>;
  isLoading: boolean;
}

export default function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Search className="h-5 w-5 text-blue-600" />
          Analyze Offer
        </CardTitle>
        <CardDescription>
          Paste the internship offer email or message content below to check for red flags.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Paste the offer details here... (e.g., 'Congratulations! You are selected for an internship at Google. Please pay $50 for equipment...')"
            className="min-h-[200px] resize-none focus-visible:ring-blue-500 border-slate-200"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold transition-all hover:scale-[1.01] bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Security...
              </>
            ) : (
              "Run Fraud Check"
            )}
          </Button>
          {!text.trim() && !isLoading && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
              <AlertCircle className="h-3 w-3" />
              Enter text to start analysis
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
