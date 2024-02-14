export interface TranscriptSentencesResponse {
  meta: Meta;
  sentences: Sentence[];
}

export interface Meta {
  page: number;
  page_size: number;
  first_page_url: string;
  previous_page_url: null;
  url: string;
  next_page_url: null;
  key: string;
}

export interface Sentence {
  sentence_index: number;
  confidence: string;
  transcript_sid: string;
  date_updated: Date;
  start_time: string;
  lup_outputs: LupOutput[];
  raw_transcript: null;
  end_time: string;
  words: Word[];
  sid: string;
  date_created: Date;
  service_sid: string;
  transcript: string;
  channel: number;
}

export interface LupOutput {
  extraction_result: ExtractionResult[];
  pii_extract_transcript_output: null;
  classify_extract_normalize_transcript_output: null;
  classification_result: any[];
  text_formatter_result: null;
  model_sid: string;
  model_type: string;
  classify_extract_transcript_output: null;
  text_generation_results: null;
  primitive_sid: string;
}

export interface ExtractionResult {
  chunk: string;
  label: Label;
}

export enum Label {
  Address = "Address",
  Empty = "",
  Name = "Name",
  PhoneNumber = "PhoneNumber",
}

export interface Word {
  to: number;
  confidence: number;
  from: number;
  word_alternatives: WordAlternative[];
  word: string;
}

export interface WordAlternative {
  confidence: number;
  word: string;
}
