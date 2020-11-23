import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import VideosTable from './videos-table';
import { VideosProps } from './videos.interface';

const Videos: React.FC<VideosProps> = ({
  videos,
  onNew,
  onEdit,
  onDelete,
}) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterVideos = () => {
    if (!search) { return videos; }
    const target = search.toLowerCase();
    return videos.filter((video) => {
      return video.name.toLowerCase().indexOf(target) > -1
        || video.author.toLowerCase().indexOf(target) > -1
        || video.categories.some((category) =>
          category.toLowerCase().indexOf(target) > -1);
    });
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <TextField
          type="search"
          id="search"
          label="Search"
          value={search}
          onChange={handleSearch}
        />
        <Button
          data-testid="add-video"
          color="primary"
          size="large"
          variant="contained"
          onClick={onNew}
        >
          Add video
        </Button>
      </Box>
      <VideosTable
        videos={filterVideos()}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default Videos;
