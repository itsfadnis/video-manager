import * as Videos from './videos';
import * as Categories from './categories';
import * as Authors from './authors';

describe('getData()', () => {
  it('returns video, category & author data,', async () => {
    const catSpy = jest
      .spyOn(Categories, 'getCategories')
      .mockResolvedValue([
        {
          id: 1,
          name: 'category 1',
        }, {
          id: 2,
          name: 'category 2',
        },
      ]);

    const authorSpy = jest
      .spyOn(Authors, 'getAuthors')
      .mockResolvedValue([
        {
          id: 1,
          name: 'author 1',
          videos: [
            {
              id: 1,
              name: 'video 1',
              catIds: [1],
            },
            {
              id: 2,
              name: 'video 2',
              catIds: [1, 2],
            },
          ],
        },
      ]);

    await expect(Videos.getData()).resolves.toEqual({
      videos: {
        1: {
          id: 1,
          name: 'video 1',
          catIds: [1],
          authorId: 1,
        },
        2: {
          id: 2,
          name: 'video 2',
          catIds: [1, 2],
          authorId: 1,
        },
      },
      categories: {
        1: {
          id: 1,
          name: 'category 1',
        },
        2: {
          id: 2,
          name: 'category 2',
        },
      },
      authors: {
        1: {
          id: 1,
          name: 'author 1',
        },
      },
    });

    expect(catSpy).toHaveBeenCalled();
    expect(authorSpy).toHaveBeenCalled();

    catSpy.mockRestore();
    authorSpy.mockRestore();
  });
});
