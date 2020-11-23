import { VideoFormProps } from './video-form.interface';

export interface NewVideoProps extends Omit<VideoFormProps, "initialValues"> {}
