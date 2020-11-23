import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  makeStyles,
} from '@material-ui/core';
import { VideosTableProps } from './videos-table.interface';

const useStyles = makeStyles((theme) => ({
  editButton: {
    marginRight: theme.spacing(1),
  },
}));

const VideosTable: React.FC<VideosTableProps> = ({
  videos,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">No videos</TableCell>
            </TableRow>
          ) : (
            videos.map((video) => (
              <TableRow key={video.id} data-testid={`video-${video.id}`}>
                <TableCell component="th" scope="row">
                  {video.name}
                </TableCell>
                <TableCell>
                  {video.author}
                </TableCell>
                <TableCell>
                  {video.categories.join(', ')}
                </TableCell>
                <TableCell>
                  <Button
                    data-testid={`edit-${video.id}`}
                    className={classes.editButton}
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={onEdit.bind(undefined, video.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    data-testid={`delete-${video.id}`}
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={onDelete.bind(undefined, video.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VideosTable;
