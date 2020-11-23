import { Video } from './video.interface';
import { Author, AuthorInfo } from './author.interface';
import { DataMemo, buildMemo } from '../components/helper';
import { Category } from './category.interface';
import { getCategories } from './categories';
import { getAuthors } from './authors';

const getVideos = (authors: Author[]): DataMemo<Video> => {
  return authors.reduce((memo: DataMemo<Video>, author) => {
    author.videos.forEach((video) => {
      memo[video.id] = {
        ...video,
        authorId: author.id,
      };
    });
    return memo;
  }, {});
};

export const getData = async (): Promise<{
  videos: DataMemo<Video>;
  categories: DataMemo<Category>;
  authors: DataMemo<AuthorInfo>;
}> => {
  const response = await Promise.all<Category[], Author[]>([
    getCategories(),
    getAuthors(),
  ]);
  const videos = getVideos(response[1]);
  const categories = buildMemo(response[0]);
  const authors = buildMemo(response[1].map((author) => ({
    id: author.id,
    name: author.name,
  }) as AuthorInfo));
  return {
    videos,
    categories,
    authors,
  };
};
