export interface TranscriptionSearchResponse {
  url: string;
  conversations: Conversation[];
  meta: Meta;
}

export interface Conversation {
  direction: string;
  has_sensitive_view: boolean;
  to_number: string;
  results: Results;
  account_sid: string;
  participants: Participant[];
  from_number: string;
  language_locale: string;
  preview_contents: PreviewContent[];
  sid: string;
  duration: number;
  date_created: Date;
  service_sid: string;
}

export interface Participant {
  id: string;
  role: string;
  full_name: null;
  type: string;
  email: null;
  channel: number;
}

export interface PreviewContent {
  text_with_highlights: string;
  start_time: number;
  participant_index: number;
}

export interface Results {
  ops_applied: string[];
  clf: string[];
  ops_info: OpsInfo[];
  clf_ext: string[];
  pii_ext: PiiEXT[];
}

export interface OpsInfo {
  name: string;
  sid: string;
}

export interface PiiEXT {
  [key: string]: string;
}

export interface Meta {
  page_size: number;
  page_count: number;
  page: number;
  total_matched: number;
}
