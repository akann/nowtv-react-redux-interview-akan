import React from 'react';
import PropTypes from 'prop-types';

import './index.css';
import bg from './bg.png';

export const Message = ({ message, handleNameClick }) => (
  <li className="message">
    <img alt={message.member.fullName} src={message.member.avatar || bg} className="avatar" />
    <div className="content">
      <div className="message-title" data-tooltip={message.member.email}>
        {message.message}
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

Message.propTypes = {
  message: PropTypes.shape({
    member: PropTypes.shape({
      fullName: PropTypes.string,
      avatar: PropTypes.string,
      email: PropTypes.string,
    }),
    message: PropTypes.string,
    formattedDateTime: PropTypes.string,
  }),
  handleNameClick: PropTypes.func,
};
