import { VideoFormProps } from './video-form.interface';
import { Video } from '../services/video.interface';

export interface EditVideoProps extends Omit<VideoFormProps, "initialValues"> {
  video: Video;
}
