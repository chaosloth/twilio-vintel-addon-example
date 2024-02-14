export interface TranscriptAnalysisResult {
  recording_sid: string;
  date_updated: Date;
  price_unit: null;
  language_locale: string;
  model_sid: null;
  confidence: string;
  call_to: string;
  data_logging: boolean;
  lup_outputs: LupOutput[];
  environment: string;
  participants: Participant[];
  sid: string;
  lup_applied_models: LupAppliedModel[];
  price: null;
  status: string;
  call_start_time: Date;
  has_sensitive_view: boolean;
  start_time: Date;
  service_sid: string;
  call_from: string;
  call_direction: string;
  transcript_status: string;
  account_sid: string;
  url: string;
  call_sid: string;
  date_created: Date;
  call_duration: string;
  links: Links;
}

export interface Links {
  sentences: string;
}

export interface LupAppliedModel {
  description: string;
  extra: Extra;
  model_scope: string;
  model_sid: string;
  model_step: string;
  model_type: string;
  primitive_sid: string;
}

export interface Extra {
  default_class_name?: null;
  clf_labels?: string[];
  match_class?: string;
  no_match_class?: string;
  ext_labels?: string[];
  channel?: string;
  class_names?: string[];
}

export interface LupOutput {
  extraction_result: any[];
  pii_extract_transcript_output: ExtractTranscriptOutput | null;
  classify_extract_normalize_transcript_output: null;
  classification_result: ClassificationResult[];
  text_formatter_result: null;
  model_sid: string;
  model_type: string;
  classify_extract_transcript_output: ExtractTranscriptOutput | null;
  text_generation_results: null;
  primitive_sid: string;
}

export interface ClassificationResult {
  score: number;
  clazz: string;
}

export interface ExtractTranscriptOutput {
  clf_match_prob: number;
  sentence_outputs: SentenceOutput[];
  matched_sentences: number[];
  match: boolean;
}

export interface SentenceOutput {
  sentence_index: number;
  classification_result: ClassificationResult[];
  extraction_result: ExtractionResult[];
}

export interface ExtractionResult {
  chunk: string;
  label: string;
}

export interface Participant {
  email: null;
  role: string;
  full_name: null;
  image_url: null;
  type: string;
  id: string;
  channel: number;
}
