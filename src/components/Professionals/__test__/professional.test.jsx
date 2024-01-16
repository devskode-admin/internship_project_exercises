import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../redux/store.js';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Professional from '../index.jsx';
import FormModal from '../formProfessional/form.jsx';

describe('Professional tests', () => {
  test('It should have the main H1', () => {
    render(
      <Provider store={store}>
        <Router>
          <Professional></Professional>
        </Router>
      </Provider>,
    );
    const title = screen.getByRole('heading', { name: 'Professionals List' });
    expect(title).toBeDefined();
  });
  test('It should have the main table', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Professional></Professional>
        </Router>
      </Provider>,
    );
    const table = screen.getByRole('table');
    expect(table).toBeDefined();
  });
  test('It should have the create button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Professional></Professional>
        </Router>
      </Provider>,
    );
    const createButton = screen.getByRole('button', { name: 'add' });
    expect(createButton).toBeDefined();
  });
  test('It should have a number of rows greater than zero', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Professional></Professional>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      const rows = screen.getAllByLabelText('edit', { selector: 'button' });
      expect(rows.length).toBeGreaterThan(0);
    });
  });
  test('It should render the form modal when click the create button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Professional>
            <FormModal isOpen={false}></FormModal>
          </Professional>
        </Router>
      </Provider>,
    );
    const createButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(createButton);

    const formTitle = screen.getByText('Add Professional');
    const formButton = screen.getByText('Create');

    expect(formTitle).toBeDefined();
    expect(formButton).toBeDefined();
  });
  test('The form should have all the data from the row', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Professional>
            <FormModal isOpen={false}></FormModal>
          </Professional>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      const rows = screen.getAllByLabelText('edit', { selector: 'button' });
      fireEvent.click(rows[0]);

      const firstNameField = screen.getByLabelText('First Name');
      const lastNameField = screen.getByLabelText('Last Name');
      const emailField = screen.getByLabelText('Email');
      const roleField = screen.getByLabelText('Role');
      const moduleField = screen.getByLabelText('Module');

      expect(firstNameField.value).toBe('Galo');
      expect(lastNameField.value).toBe('Durante');
      expect(emailField.value).toBe('galo@devskode.com');
      expect(roleField.textContent).toBe('Director');
      expect(moduleField.textContent).toBe('Internship');
    });
  });
});
