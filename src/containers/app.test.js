import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../helpers/test-helper';

import App from './app';

describe('<App />', () => {
  it('should render without crashing', () => {
    renderWithProviders(<App />);
  });

  it('should render <Loading/> by default', () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should render page with data to match snapshot', async () => {
    const { asFragment } = renderWithProviders(<App />);
    await waitFor(() => screen.getByTestId('main-page'));

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render only single user's messages when user's name is clicked", async () => {
    const { container } = renderWithProviders(<App />);

    await waitFor(() => screen.getByTestId('main-page'));

    const fullNameNode = container.querySelector('.message .full-name');
    const fullName = fullNameNode.textContent;

    fireEvent.click(fullNameNode);

    const allFullNameNodes = container.querySelectorAll('.message .full-name');

    expect.assertions(allFullNameNodes.length);
    [...allFullNameNodes].forEach(node => {
      expect(node.textContent).toBe(fullName);
    });
  });

  it("should return to default list when RESET is clicked", async () => {
    const { container } = renderWithProviders(<App />);
    await waitFor(() => screen.getByTestId('main-page'));

    expect(container.querySelectorAll('.message').length).toEqual(100);

    fireEvent.click(container.querySelector('.message .full-name'));
    expect(container.querySelectorAll('.message').length).toEqual(3);

    expect(screen.getByTestId('reset')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('reset'));
    expect(container.querySelectorAll('.message').length).toEqual(100);

  });
});
