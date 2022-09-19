import moment from 'moment';

export const formatMembersMessagesData = (messages, members) => messages.map(message => ({
  ...message,
  member: members.map(m => ({...m, fullName: `${m.firstName} ${m.lastName}`})).find(m => m.id === message.userId),
  formattedDateTime: moment(message.timestamp).format('Do MMM YYYY HH:mm'),
}))
.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

