import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

describe('App', () => {
  it('renders headline', async () => {

    render(<App serverBaseUrl='http://localhost:8080' />);

    await screen.findByText('Empty list')

    await userEvent.type(screen.getByRole('textbox'), 'the film title');

    fireEvent.click(screen.getByRole('button'))

    await screen.findByText('the film title')

    // check if App components renders headline
  });
});
