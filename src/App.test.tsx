import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import App from './App';

describe('Video mananger', () => {
  let scope: nock.Scope;

  beforeEach(() => {
    scope = nock(process.env.REACT_APP_API as string)
      .defaultReplyHeaders({
        'Access-Control-Allow-Origin': '*',
      });

    scope
      .get('/categories')
      .reply(200, [
        { id: 1, name: 'category 1' },
        { id: 2, name: 'category 2' },
      ]);

    scope
      .get('/authors')
      .reply(200, [{
        id: 1,
        name: 'author 1',
        videos: [{
          id: 1,
          name: 'video 1',
          catIds: [1],
        }, {
          id: 2,
          name: 'video 2',
          catIds: [1, 2],
        }],
      }]);
  });

  afterEach(() => {
    expect(scope.isDone()).toBeTruthy();
  });

  it('renders the videos table', async () => {
    render(<App />);
    await waitFor(() => screen.getByText('video 1'));

    const table = screen.getByRole('table');

    const header = table.querySelector('thead > tr');
    ['Video Name', 'Author', 'Categories', 'Options'].forEach((heading) => {
      expect(within(header as HTMLElement).getByText(heading)).toBeInTheDocument();
    });

    const rows = table.querySelectorAll('tbody > tr');
    expect(rows).toHaveLength(2);
    ['video 1', 'author 1', 'category 1'].forEach((content) => {
      expect(within(rows[0] as HTMLElement).getByText(content)).toBeInTheDocument();
    });
    ['video 2', 'author 1', 'category 1, category 2'].forEach((content) => {
      expect(within(rows[1] as HTMLElement).getByText(content)).toBeInTheDocument();
    });
  });

  it('allows video deletion', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('video-1'));
    const deleteButton = screen.getByTestId('delete-1');
    userEvent.click(deleteButton);
    expect(screen.queryByTestId('video-1')).not.toBeInTheDocument();
  });

  it('allows video creation', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('video-1'));

    const addButton = screen.getByTestId('add-video');
    userEvent.click(addButton);

    const name = screen.getByLabelText(/Video name/) as HTMLInputElement;
    userEvent.type(name, 'video 3');

    // Material UI <Select /> onChange simulation
    // https://stackoverflow.com/questions/55184037/react-testing-library-on-change-for-material-ui-select-component/61491607#61491607
    const authorId = screen.getByTestId('author-id') as HTMLInputElement;
    userEvent.click(authorId.previousElementSibling as HTMLElement);
    const authors = within(screen.getByRole('presentation')).getByRole('listbox');
    userEvent.click(within(authors).getByText(/author 1/));

    const catIds = screen.getByTestId('cat-ids') as HTMLInputElement;
    userEvent.click(catIds.previousElementSibling as HTMLElement);
    const cats = within(screen.getByRole('presentation')).getByRole('listbox');
    userEvent.click(within(cats).getByText(/category 1/));
    userEvent.click(within(cats).getByText(/category 2/));

    const submitButton = screen.getByTestId('submit');
    userEvent.click(submitButton);

    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    expect(rows).toHaveLength(3);
    ['video 3', 'author 1', 'category 1, category 2'].forEach((content) => {
      expect(within(rows[2] as HTMLElement).getByText(content)).toBeInTheDocument();
    });
  });

  it('allows video updation', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('video-1'));

    const editButton = screen.getByTestId('edit-1');
    userEvent.click(editButton);

    const name = screen.getByLabelText(/Video name/) as HTMLInputElement;
    userEvent.clear(name);
    userEvent.type(name, 'video 100');

    const catIds = screen.getByTestId('cat-ids') as HTMLInputElement;
    userEvent.click(catIds.previousElementSibling as HTMLElement);
    const cats = within(screen.getByRole('presentation')).getByRole('listbox');
    // The first click unselects category 1, the second selects category 2
    userEvent.click(within(cats).getByText(/category 1/));
    userEvent.click(within(cats).getByText(/category 2/));

    const submitButton = screen.getByTestId('submit');
    userEvent.click(submitButton);

    const edited = screen.getByTestId('video-1');
    ['video 100', 'author 1', 'category 2'].forEach((content) => {
      expect(within(edited).getByText(content)).toBeInTheDocument();
    });
  });

  it('allows video searching', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('video-1'));

    const search = screen.getByLabelText('Search');
    userEvent.type(search, 'video 2');

    expect(screen.queryByTestId('video-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('video-2')).toBeInTheDocument();
  });
});
