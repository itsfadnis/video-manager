export type TableVideo = {
  id: number;
  name: string;
  author: string;
  categories: string[];
};

export interface VideosTableProps {
  videos: TableVideo[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
