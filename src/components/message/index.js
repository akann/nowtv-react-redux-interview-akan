import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';
import bg from './bg.png';

export const Message = ({ message, handleNameClick }) => {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <li className="message">
      <img alt={message.member.fullName} src={message.member.avatar || bg} className="avatar" />
      <div className="content">
        <div
          className="message-title"
          onMouseEnter={() => setShowEmail(true)}
          onMouseLeave={() => setShowEmail(false)}
          data-testid="message-title"
        >
          {message.message}
          <span className={`email${showEmail ? ' show' : ''}`}>{message.member.email}</span>
        </div>
        <div>
          <a href="/" onClick={handleNameClick} className="full-name">
            {message.member.fullName}
          </a>
          <span className="date-time">
            {' — '} {message.formattedDateTime}
          </span>
        </div>
      </div>
    </li>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    member: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      email: PropTypes.string,
    }),
    message: PropTypes.string.isRequired,
    formattedDateTime: PropTypes.string.isRequired,
  }),
  handleNameClick: PropTypes.func,
};
