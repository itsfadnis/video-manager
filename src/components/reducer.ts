import { DataMemo } from './helper';
import { Category } from '../services/category.interface';
import { AuthorInfo } from '../services/author.interface';
import { Video } from '../services/video.interface';
import { VideoFormFields } from './video-form.interface';

type Page = 'index' | 'edit' | 'new';

export enum Types {
  SetPage = 'page/set',
  SetEdited = 'video/edit',
  SetData = 'videos/data',
  DeleteVideo = 'videos/delete',
  UpdateVideo = 'videos/update',
  CreateVideo = 'videos/create',
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] }
};

type Payload = {
  [Types.SetPage]: Page;
  [Types.SetEdited]: number;
  [Types.SetData]: {
    videos: DataMemo<Video>;
    categories: DataMemo<Category>;
    authors: DataMemo<AuthorInfo>;
  };
  [Types.CreateVideo]: VideoFormFields & { id: number };
  [Types.UpdateVideo]: VideoFormFields;
  [Types.DeleteVideo]: number;
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

type State = {
  page: Page;
  edited: number;
  videos: DataMemo<Video>;
  categories: DataMemo<Category>;
  authors: DataMemo<AuthorInfo>;
};

export const initialState: State = {
  page: 'index',
  edited: -1,
  videos: {},
  categories: {},
  authors: {},
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case Types.SetPage:
      return {
        ...state,
        page: action.payload,
      };
    case Types.SetEdited:
      return {
        ...state,
        edited: action.payload,
      };
    case Types.SetData:
      return {
        ...state,
        videos: action.payload.videos,
        categories: action.payload.categories,
        authors: action.payload.authors,
      };
    case Types.CreateVideo:
      return {
        ...state,
        videos: {
          ...state.videos,
          [action.payload.id]: {
            ...action.payload,
          },
        },
      };
    case Types.UpdateVideo:
      return {
        ...state,
        videos: {
          ...state.videos,
          [state.edited]: {
            ...state.videos[state.edited],
            ...action.payload,
          },
        },
      };
    case Types.DeleteVideo:
      const { [action.payload]: value, ...remaining } = state.videos;
      return {
        ...state,
        videos: remaining,
      };
    default:
      return state;
  }
};
