import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import VideoForm from './video-form';
import { EditVideoProps } from './edit-video.interface';

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(3),
    },
  };
});

const EditVideo: React.FC<EditVideoProps> = ({
  video,
  categories,
  authors,
  onCancel,
  onSubmit,
}) => {
  const classes = useStyles();
  const initialValues = {
    name: video.name,
    catIds: video.catIds,
    authorId: video.authorId,
  };
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h4">
        {`Edit video: ${video.name}`}
      </Typography>
      <VideoForm
        initialValues={initialValues}
        categories={categories}
        authors={authors}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Paper>
  );
};

export default EditVideo;
