import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../actions';
import { formatMembersMessages } from '../helpers';
import { Message } from '../components/message';

const App = () => {
  const dispatch = useDispatch();
  const formartedMessagesRef = useRef([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const pending = useSelector((state) => state.data.pending);
  const members = useSelector((state) => state.data.members);
  const messages = useSelector((state) => state.data.messages);

  if (pending === undefined) {
    dispatch(fetchData());
  }

  if (pending !== false) {
    return <div>Loading...</div>;
  }

  if (!formartedMessagesRef.current.length) {
    formartedMessagesRef.current = formatMembersMessages(messages, members);
  }

  const handleNameClick = (e, userId) => {
    setSelectedUserId(userId);
    e.preventDefault();
  };

  const formartedMessages = selectedUserId
    ? formartedMessagesRef.current.filter((current) => current.userId === selectedUserId)
    : formartedMessagesRef.current;

  return (
    <main data-testid="main-page">
      <header>
        <h1>Welcome to the Akan&apos;s NOW TV test!</h1>
      </header>
      <nav>
        <a href="/" onClick={(e) => handleNameClick(e)} tabIndex={0} data-testid="home">
          Home
        </a>
      </nav>
      <section>
        <ul>
          {formartedMessages.map((message) => (
            <Message key={message.id} message={message} handleNameClick={(e) => handleNameClick(e, message.userId)} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default App;
