export interface AnalysisOpenAI {
  predicted_csat_score: number;
  sentiment: string;
  business_outcome: string;
  intervention_required: boolean;
  summary: string;
  predicted_nps_score: number;
}
