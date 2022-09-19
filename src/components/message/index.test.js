import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Message } from './';

const mockMessage = {
  id: '3347bc5d-22cb-4fc0-8150-3d71ac5be646',
  userId: '976c4919-a8b4-4807-bebb-84ca8448be32',
  message:
    'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
  timestamp: '2017-02-01T18:52:10Z',
  member: {
    id: '976c4919-a8b4-4807-bebb-84ca8448be32',
    firstName: 'Peter',
    lastName: 'Howard',
    email: 'phoward12@chronoengine.com',
    avatar: 'http://dummyimage.com/100x100.jpg/5fa2dd/ffffff',
    ip: '119.0.16.195',
    fullName: 'Peter Howard',
  },
  formattedDateTime: '1st Feb 2017 18:52',
};

describe('<App />', () => {
  it('should render to successfully', () => {
    const { asFragment } = render(<Message message={mockMessage} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display user's email on hover", () => {
    const { container } = render(<Message message={mockMessage} />);

    expect(container.querySelector('.email.show')).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId('message-title'));

    expect(container.querySelector('.email.show')).toBeInTheDocument();
  });

  it("should hide user's email on hover", () => {
    const { container } = render(<Message message={mockMessage} />);

    fireEvent.mouseEnter(screen.getByTestId('message-title'));
    expect(container.querySelector('.email.show')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByTestId('message-title'));
    expect(container.querySelector('.email.show')).not.toBeInTheDocument();
  });
});
