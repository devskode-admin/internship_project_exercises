import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../redux/store.js';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Technologies from '../index.jsx';
import FormModal from '../formTech/form.jsx';

describe('Technologies tests', () => {
  test('It should have the main H1', () => {
    render(
      <Provider store={store}>
        <Router>
          <Technologies></Technologies>
        </Router>
      </Provider>,
    );
    const title = screen.getByRole('heading', { name: 'Technologies List' });
    expect(title).toBeDefined();
  });
  test('It should have the main table and a number of rows greater than zero', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Technologies></Technologies>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeDefined();

      const rows = screen.getAllByLabelText('edit', { selector: 'button' });
      expect(rows.length).toBeGreaterThan(0);
    });
  });
  test('It should have the create button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Technologies></Technologies>
        </Router>
      </Provider>,
    );
    const createButton = screen.getByRole('button', { name: 'add' });
    expect(createButton).toBeDefined();
  });
  test('It should render the form modal when click the create button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Technologies>
            <FormModal isOpen={false}></FormModal>
          </Technologies>
        </Router>
      </Provider>,
    );
    const createButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(createButton);

    const formTitle = screen.getByText('Add Technology');
    const formButton = screen.getByText('Create');

    expect(formTitle).toBeDefined();
    expect(formButton).toBeDefined();
  });
  test('The form should have all the data from the row', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Technologies>
            <FormModal isOpen={false}></FormModal>
          </Technologies>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      const rows = screen.getAllByLabelText('edit', { selector: 'button' });
      fireEvent.click(rows[0]);

      const nameField = screen.getByLabelText('Name');
      const devSideField = screen.getByLabelText('Development Side');

      expect(nameField.value).toBe('Node.js');
      expect(devSideField.textContent).toBe('Backend');
    });
  });
});
