import { AnalysisResult, Verdict } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, ShieldCheck, ShieldX, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

interface AnalysisResultViewProps {
  result: AnalysisResult;
}

const verdictConfig: Record<Verdict, { color: string; icon: any; bg: string; border: string }> = {
  "Safe": { 
    color: "text-blue-600", 
    icon: ShieldCheck, 
    bg: "bg-blue-50", 
    border: "border-blue-200" 
  },
  "Suspicious": { 
    color: "text-amber-600", 
    icon: AlertTriangle, 
    bg: "bg-amber-50", 
    border: "border-amber-200" 
  },
  "High Risk": { 
    color: "text-red-600", 
    icon: ShieldX, 
    bg: "bg-red-50", 
    border: "border-red-200" 
  },
};

export default function AnalysisResultView({ result }: AnalysisResultViewProps) {
  if (!result.is_valid) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Alert variant="destructive" className="bg-white border-red-200 shadow-lg p-6">
          <ShieldAlert className="h-8 w-8 text-red-500 mb-4" />
          <AlertTitle className="text-xl font-bold text-red-900 mb-2">Invalid Input</AlertTitle>
          <AlertDescription className="text-slate-700 text-base">
            {result.explanation || "The text you provided does not appear to be an internship offer or recruitment message. Please provide valid internship details for analysis."}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  const config = verdictConfig[result.verdict];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <Card className={`border-2 ${config.border} ${config.bg} shadow-md`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-white ${config.color} border ${config.border} shadow-sm`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className={`text-2xl font-bold ${config.color}`}>
                  {result.verdict}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Risk Score: {result.risk_score}/100
                </CardDescription>
              </div>
            </div>
            <Badge variant={result.verdict === "Safe" ? "default" : "destructive"} className={`px-3 py-1 ${result.verdict === "Safe" ? "bg-blue-600" : ""}`}>
              {result.verdict.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4 p-4 rounded-lg bg-white border border-blue-100 shadow-sm">
            <h4 className="font-semibold flex items-center gap-2 mb-2 text-blue-900">
              <Info className="h-4 w-4 text-blue-500" />
              Analysis Summary
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">
              {result.explanation}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold px-1 text-blue-950">Detected Red Flags</h3>
        {result.red_flags.length > 0 ? (
          result.red_flags.map((flag, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Alert variant="destructive" className="bg-white border-red-100 shadow-sm">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-sm font-semibold text-red-900">Flag #{index + 1}</AlertTitle>
                <AlertDescription className="text-sm text-red-700">
                  {flag}
                </AlertDescription>
              </Alert>
            </motion.div>
          ))
        ) : (
          <Alert className="bg-white border-blue-100 text-blue-800 shadow-sm">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <AlertTitle className="font-semibold">No Red Flags Detected</AlertTitle>
            <AlertDescription className="text-blue-700">
              The offer text doesn't contain common fraud patterns identified by our system.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <Separator className="my-8" />
      
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          Disclaimer
        </p>
        <p className="text-[10px] text-muted-foreground max-w-md mx-auto leading-tight">
          This analysis is powered by AI and should be used as a guide only. Always verify internship offers directly with the company's official HR department through their verified corporate website.
        </p>
      </div>
    </motion.div>
  );
}
