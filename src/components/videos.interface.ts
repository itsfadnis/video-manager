import { TableVideo } from './videos-table.interface';

export interface VideosProps {
  videos: TableVideo[];
  onNew: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
