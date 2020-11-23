import React, { useEffect, useReducer } from 'react';
import { AppBar, Container, Toolbar, Typography, makeStyles, createStyles } from '@material-ui/core';
import { getData } from './services/videos';
import { VideoFormFields } from './components/video-form.interface';
import { reducer, initialState, Types } from './components/reducer';
import Videos from './components/videos';
import EditVideo from './components/edit-video';
import NewVideo from './components/new-video';
import { getTableVideos } from './components/helper';

const useStyles = makeStyles((theme) => {
  return createStyles({
    navbar: {
      marginBottom: theme.spacing(4),
    },
  });
});

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData().then((data) => {
      dispatch({ type: Types.SetData, payload: data });
    });
  }, []);

  const handleEdit = (id: number) => {
    dispatch({ type: Types.SetEdited, payload: id });
    dispatch({ type: Types.SetPage, payload: 'edit' });
  };

  const handleCancel = () => {
    dispatch({ type: Types.SetPage, payload: 'index' });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: Types.DeleteVideo, payload: id });
  };

  const handleUpdate = (values: VideoFormFields) => {
    dispatch({ type: Types.UpdateVideo, payload: values });
    dispatch({ type: Types.SetPage, payload: 'index' });
  };

  const handleCreate = (values: VideoFormFields) => {
    const id = new Date().getTime();
    dispatch({ type: Types.CreateVideo, payload: { id, ...values } });
    dispatch({ type: Types.SetPage, payload: 'index' });
  };

  const handleNew = () => {
    dispatch({ type: Types.SetPage, payload: 'new' });
  };

  const classes = useStyles();
  const { page, videos, categories, authors, edited } = state;

  return (
    <>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6">Video Manager</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {page === 'index' && (
          <Videos
            videos={getTableVideos(videos, categories, authors)}
            onNew={handleNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {page === 'edit' && (
          <EditVideo
            video={videos[edited]}
            categories={categories}
            authors={authors}
            onSubmit={handleUpdate}
            onCancel={handleCancel}
          />
        )}
        {page === 'new' && (
          <NewVideo
            categories={categories}
            authors={authors}
            onSubmit={handleCreate}
            onCancel={handleCancel}
          />
        )}
      </Container>
    </>
  );
};

export default App;
