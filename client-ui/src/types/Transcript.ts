export interface TranscriptResponse {
  transcripts: Transcript[];
  meta: Meta;
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

export interface Transcript {
  recording_sid: string;
  date_updated: Date;
  price_unit: null;
  language_locale: string;
  model_sid: null;
  confidence: string;
  call_to: string;
  data_logging: boolean;
  lup_outputs: any[];
  environment: string;
  participants: Participant[];
  sid: string;
  lup_applied_models: any[];
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

export interface Participant {
  email: null;
  role: string;
  full_name: null;
  image_url: null;
  type: string;
  id: string;
  channel: number;
}
