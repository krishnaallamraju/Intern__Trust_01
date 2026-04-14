export type Verdict = 'Safe' | 'Suspicious' | 'High Risk';

export interface AnalysisResult {
  risk_score: number;
  red_flags: string[];
  verdict: Verdict;
  explanation: string;
  is_valid: boolean;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  text: string;
  result: AnalysisResult;
}
