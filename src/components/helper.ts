import { Category } from '../services/category.interface';
import { Video } from '../services/video.interface';
import { AuthorInfo } from '../services/author.interface';
import { TableVideo } from './videos-table.interface';

export type DataMemo<T> = {
  [key: string]: T;
};

export const buildMemo = <T extends { id: number }>(array: T[]): DataMemo<T> => {
  return array.reduce((memo: DataMemo<T>, item) => {
    memo[item.id] = item;
    return memo;
  }, {});
};

export const toArray = <T>(memo: DataMemo<T>): T[] => {
  return Object.keys(memo).map(key => memo[key]);
};

export const getTableVideos = (
  videos: DataMemo<Video>,
  categories: DataMemo<Category>,
  authors: DataMemo<AuthorInfo>,
): TableVideo[] => {
  return toArray(videos).map((video) => {
    return {
      id: video.id,
      name: video.name,
      author: authors[video.authorId].name,
      categories: video
        .catIds
        .map((catId) => categories[catId].name),
    };
  });
};
