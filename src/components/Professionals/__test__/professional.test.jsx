import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../redux/store.js';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import Professionals from '../index.jsx';

describe('Professionals tests', () => {
  test('It should have the main H1', () => {
    render(
      <Provider store={store}>
        <Router>
          <Professionals></Professionals>
        </Router>
      </Provider>,
    );
    const title = screen.getByText('Professionals List');
    expect(title).toBeDefined();
  });
  test('It should check that the table is shown on the display', () => {
    render(
      <Provider store={store}>
        <Router>
          <Professionals></Professionals>
        </Router>
      </Provider>,
    );
    const table = screen.getByRole('table');
    expect(table).toBeDefined();
  });
  test('It should check that the button create professional is shown on the display', () => {
    render(
      <Provider store={store}>
        <Router>
          <Professionals></Professionals>
        </Router>
      </Provider>,
    );
    const button = screen.getByText('Create Professional');
    expect(button).toHaveProperty('type', 'button');
  });
  test('It should have a number of rows greater than zero', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Professionals></Professionals>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      const rows = screen.getAllByLabelText('edit', { selector: 'button' });
      expect(rows.length).toBeGreaterThan(0);
    });
  });
  test('It should open the form modal when you click the create professional button', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Professionals></Professionals>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      const modalButton = screen.getByText('Create Professional');
      fireEvent.click(modalButton);

      const title = screen.getByText('Add Professional');
      expect(title).toBeDefined();
    });
  });
  test('It should open the form modal with the correct data when you click the edit button of the first row', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Professionals></Professionals>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      // Find all rows and select the first one
      const allRows = screen.getAllByRole('row');
      const firstRow = allRows[1];

      // Find the cells of the fields
      const nameCell = within(firstRow).getByTestId('first_name');
      const lastNameCell = within(firstRow).getByTestId('last_name');
      const emailCell = within(firstRow).getByTestId('email');
      const roleCell = within(firstRow).getByTestId('role');
      const moduleCell = within(firstRow).getByTestId('module');

      // Get the text content of the fields
      const name = nameCell.textContent;
      const lastName = lastNameCell.textContent;
      const email = emailCell.textContent;
      const role = roleCell.textContent;
      const module = moduleCell.textContent;

      // Find the "Edit" button within the first row
      const editButton = within(firstRow).getByLabelText('edit', { selector: 'button' });

      // Click the "Edit" button to open the modal
      fireEvent.click(editButton);

      // Find the inputs on the modal
      const nameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const roleInput = screen.getByLabelText('Role');
      const moduleInput = screen.getByLabelText('Module');

      // Perform assertions on the input values
      expect(nameInput.value).toBe(name);
      expect(lastNameInput.value).toBe(lastName);
      expect(emailInput.value).toBe(email);
      expect(roleInput.textContent).toBe(role);
      expect(moduleInput.textContent).toBe(module);
    });
  });
});
