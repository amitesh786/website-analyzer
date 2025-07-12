export type Status = 'idle' | 'processing' | 'done';

export interface URLItem {
  url: string;
  status: Status;
}

export interface IURLInputProps {
  url: string;
  submitting: boolean;
  setUrl: (val: string) => void;
  onSubmit: () => void;
}

export interface IURLListProps {
  items: URLItem[];
  processingMap: Record<string, boolean>;
  onStart: (url: string) => void;
  onStop: (url: string) => void;
}
