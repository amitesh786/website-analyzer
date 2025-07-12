import React from 'react';
import { IURLData } from '../types';

export type { IURLData };

export interface IURLActionsProps {
  onSearch: (val: string) => void;
  onDelete: () => void;
  onReRun: () => void;
  hasSelection: boolean;
}

export interface IURLTableProps {
  data: IURLData[];
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (keys: React.Key[]) => void;
  navigate: (path: string) => void;
  reload: () => void;
}
