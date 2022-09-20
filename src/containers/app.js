import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchData } from '../actions';
import { formatMembersMessagesData } from '../helpers';
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
    formartedMessagesRef.current = formatMembersMessagesData(messages, members);
  }

  const handleNameClick = (e, userId) => {
    setSelectedUserId(userId);
    e.preventDefault();
  };

  const formartedMessages = selectedUserId
    ? formartedMessagesRef.current.filter((current) => current.userId === selectedUserId)
    : formartedMessagesRef.current;

  return (
    <main className="main" data-testid="main-page">
      <header>
        <h1>Welcome to the Akan&apos;s NOW TV test!</h1>
      </header>
      <section>
        <ul>
          {formartedMessages.map((message) => (
            <Message key={message.id} message={message} handleNameClick={(e) => handleNameClick(e, message.userId)} />
          ))}
        </ul>
      </section>
      <footer className="footer">
        {selectedUserId && (
          <a className="backButton" href="/" onClick={(e) => handleNameClick(e)} tabIndex={0} data-testid="reset">
            Back
          </a>
        )}
      </footer>
    </main>
  );
};

export default App;
