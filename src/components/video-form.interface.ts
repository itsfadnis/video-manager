import { Category } from '../services/category.interface';
import { AuthorInfo } from '../services/author.interface';
import { DataMemo } from './helper';

export type VideoFormFields = {
  name: string;
  catIds: number[];
  authorId?: number;
};

export interface VideoFormProps {
  initialValues: VideoFormFields;
  categories: DataMemo<Category>;
  authors: DataMemo<AuthorInfo>;
  onCancel: () => void;
  onSubmit: (values: VideoFormFields) => void;
}
