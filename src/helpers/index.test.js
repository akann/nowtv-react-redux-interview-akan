import { formatMembersMessagesData } from './';

const mockMessages = [
  {
    id: 'b03569ae-ccbf-4975-8040-4daba638b407',
    userId: '16373df5-da0a-4074-8295-f916b94269f4',
    message: 'Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.',
    timestamp: '2016-11-09T05:04:58Z',
  },
  {
    id: '3a59859e-33f1-4c2b-a636-1f119c484dc8',
    userId: '976c4919-a8b4-4807-bebb-84ca8448be32',
    message: 'Suspendisse potenti.',
    timestamp: '2016-06-03T20:24:29Z',
  },
  {
    id: 'c7252640-af98-442a-9dcd-ddc5e789238a',
    userId: 'd18b107b-6874-49bd-94c0-4d830fc7eaed',
    message: 'Nunc purus.',
    timestamp: '2016-04-07T10:20:42Z',
  },
];

const mockMembers = [
  {
    id: '976c4919-a8b4-4807-bebb-84ca8448be32',
    firstName: 'Peter',
    lastName: 'Howard',
    email: 'phoward12@chronoengine.com',
    avatar: 'http://dummyimage.com/100x100.jpg/5fa2dd/ffffff',
    ip: '119.0.16.195',
  },
  {
    id: '16373df5-da0a-4074-8295-f916b94269f4',
    firstName: 'Larry',
    lastName: 'Owens',
    email: 'lowensm@earthlink.net',
    avatar: 'http://dummyimage.com/100x100.bmp/5fa2dd/ffffff',
    ip: '168.43.167.194',
  },
  {
    id: 'd18b107b-6874-49bd-94c0-4d830fc7eaed',
    firstName: 'Marilyn',
    lastName: 'Andrews',
    email: 'mandrews4@google.it',
    avatar: 'http://dummyimage.com/100x100.png/ff4444/ffffff',
    ip: '102.50.7.81',
  },
];

let data;

describe('formatMembersMessages()', () => {
  beforeEach(() => {
    data = formatMembersMessagesData(mockMessages, mockMembers);
  });
  it('should order data by date time', () => {
    expect(data.map((item) => item.timestamp)).toStrictEqual([
      '2016-11-09T05:04:58Z',
      '2016-06-03T20:24:29Z',
      '2016-04-07T10:20:42Z',
    ]);
  });

  it('should format the timestamp to be in a human readable format', () => {
    expect(data.map((item) => item.formattedDateTime)).toStrictEqual([
      '9th Nov 2016 05:04',
      '3rd Jun 2016 21:24',
      '7th Apr 2016 11:20',
    ]);
  });
});
