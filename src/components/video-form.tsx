import React, { useState } from 'react';
import { TextField, makeStyles, Theme, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { VideoFormProps } from './video-form.interface';
import { toArray } from './helper';

const useStyles = makeStyles((theme: Theme) => {
  return {
    formField: {
      display: 'block',
      marginBottom: theme.spacing(2),
    },
    submit: {
      margin: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(2)}px 0`,
    },
  };
});

const VideoForm: React.FC<VideoFormProps> = ({
  initialValues,
  categories,
  authors,
  onCancel,
  onSubmit,
}) => {
  const classes = useStyles();

  const [values, setValues] = useState(initialValues);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setValues({
      ...values,
      [e.target.name as string]: e.target.value as number | number[],
    })
  };

  return (
    <form data-testid="video-form" onSubmit={handleSubmit}>
      <TextField
        required
        className={classes.formField}
        fullWidth
        label="Video name"
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <FormControl required className={classes.formField}>
        <InputLabel htmlFor="author">Video author</InputLabel>
        <Select
          inputProps={{
            'data-testid': 'author-id',
          }}
          required
          fullWidth
          id="author"
          name="authorId"
          value={values.authorId || ''}
          onChange={handleSelect}
        >
          {toArray(authors).map((author) => (
            <MenuItem
              key={author.id}
              value={author.id}
            >
              {author.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={classes.formField}>
        <InputLabel htmlFor="categories">Video category</InputLabel>
        <Select
          inputProps={{
            'data-testid': 'cat-ids',
          }}
          required
          multiple
          fullWidth
          label="Video category"
          id="categories"
          name="catIds"
          value={values.catIds}
          onChange={handleSelect}
        >
          {toArray(categories).map((category) => (
            <MenuItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        data-testid="submit"
        className={classes.submit}
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <Button
        className={classes.submit}
        variant="contained"
        color="default"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </form>
  );
};

export default VideoForm;
