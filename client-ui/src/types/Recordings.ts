export interface RecordingsResponse {
  first_page_uri: string;
  end: number;
  previous_page_uri: null;
  uri: string;
  page_size: number;
  start: number;
  recordings: Recording[];
  next_page_uri: null;
  page: number;
}

export interface Recording {
  account_sid: string;
  api_version: Date;
  call_sid: string;
  conference_sid: null;
  date_created: string;
  date_updated: string;
  start_time: string;
  duration: string;
  sid: string;
  price: string;
  price_unit: string;
  status: string;
  channels: number;
  source: string;
  error_code: null;
  uri: string;
  encryption_details: null;
  subresource_uris: SubresourceUris;
  media_url: string;
}

export interface SubresourceUris {
  add_on_results: string;
  transcriptions: string;
}
