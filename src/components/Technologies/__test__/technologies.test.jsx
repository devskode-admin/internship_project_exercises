import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../redux/store.js';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Technologies from '../index.jsx';

describe('Technologies tests', () => {
  test('It should have the main H1', () => {
    render(
      <Provider store={store}>
        <Router>
          <Technologies></Technologies>
        </Router>
      </Provider>,
    );
    const title = screen.getByText('Technologies List');
    expect(title).toBeDefined();
  });
  test('It should have a number of rows greater than zero', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Technologies></Technologies>
        </Router>
      </Provider>,
    );
    await waitFor(() => {
      const rows = screen.getAllByLabelText('edit', { selector: 'button' });
      expect(rows.length).toBeGreaterThan(0);
    });
  });
});
