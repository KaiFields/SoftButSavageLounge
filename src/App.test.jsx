import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders skill arena dashboard content', () => {
  render(<App />);
  expect(screen.getByText(/competitive skill gaming mvp/i)).toBeDefined();
  expect(screen.getByText(/build a compliant mvp for skill challenges/i)).toBeDefined();
  expect(screen.getByText(/admin panel/i)).toBeDefined();
});
