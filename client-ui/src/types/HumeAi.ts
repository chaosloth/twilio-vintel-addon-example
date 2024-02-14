export interface HumeAIResult {
  source: Source;
  results: Results;
}

export interface Results {
  predictions: ResultsPrediction[];
  errors: any[];
}

export interface ResultsPrediction {
  file: string;
  file_type: Type;
  models: Models;
}

export enum Type {
  Text = "text",
}

export interface Models {
  language: Language;
}

export interface Language {
  metadata: null;
  grouped_predictions: GroupedPrediction[];
}

export interface GroupedPrediction {
  id: ID;
  predictions: GroupedPredictionPrediction[];
}

export enum ID {
  Unknown = "unknown",
}

export interface GroupedPredictionPrediction {
  text: string;
  position: Position;
  time: null;
  confidence: null;
  speaker_confidence: null;
  emotions: Emotion[];
  sentiment: null;
  toxicity: null;
}

export interface Emotion {
  name: string;
  score: number;
}

export interface Position {
  begin: number;
  end: number;
}

export interface Source {
  type: Type;
}
