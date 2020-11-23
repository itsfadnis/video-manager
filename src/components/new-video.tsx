import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import VideoForm from './video-form';
import { NewVideoProps } from './new-video.interface';

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

const NewVideo: React.FC<NewVideoProps> = ({
  categories,
  authors,
  onCancel,
  onSubmit,
}) => {
  const classes = useStyles();
  const initialValues = {
    name: '',
    catIds: [],
    authorId: undefined,
  };
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h4">
        Add video
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

export default NewVideo;
