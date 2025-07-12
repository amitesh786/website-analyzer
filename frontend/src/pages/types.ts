interface IHeadingCount {
  [key: string]: number;
}

interface IInaccessibleLink {
  url: string;
  status: number;
}

export interface IURLDetailsData {
  url: string;
  html_version: string;
  page_title: string;
  has_login_form: boolean;
  headings_count: IHeadingCount;
  internal_links: number;
  external_links: number;
  inaccessible_links: IInaccessibleLink[];
}

export interface IURLData {
  url: string;
  page_title?: string;
  html_version?: string;
  internal_links: number;
  external_links: number;
  has_login_form: boolean;
  status: 'queued' | 'running' | 'done' | 'error' | string;
}
