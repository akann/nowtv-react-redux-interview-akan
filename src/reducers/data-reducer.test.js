import dataReducer from './data-reducer';
import {
  fetchDataPending,
  fetchDataSuccess,
  fetchDataError
} from '../actions';

const initialState = {
  messages: [],
  members: [],
};

describe('dataReducer', () => {
  it('should return initial state', () => {
    expect(dataReducer(initialState, {})).toEqual(initialState);
  });

  it('should return pending on FETCH_DATA_PENDING', () => {
    expect(dataReducer(initialState, fetchDataPending())).toEqual({
      ...initialState,
      pending: true,
    });
  });

  it('should return data on FETCH_DATA_SUCCESS', () => {
    const members =[
      {
        "id": "e837c9f5-247f-445f-bcc3-7d434348336b",
        "firstName": "Martin",
        "lastName": "Bradley",
        "email": "mbradley0@google.it",
        "avatar": "http://dummyimage.com/100x100.png/5fa2dd/ffffff",
        "ip": "166.124.172.160"
      },
      {
        "id": "cae5d3af-9ac7-471e-9061-e2e9d75f00e4",
        "firstName": "Helen",
        "lastName": "Hawkins",
        "email": "hhawkins1@posterous.com",
        "avatar": "http://dummyimage.com/100x100.jpg/dddddd/000000",
        "ip": "179.239.189.173"
      }
    ];
    const messages = [
      {
        "id": "cd445e6d-e514-424f-ba8f-16ec842002c6",
        "userId": "fe27b760-a915-475c-80bb-7cdf14cc6ef3",
        "message": "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.",
        "timestamp": "2017-02-09T04:27:38Z"
      },
      {
        "id": "b03569ae-ccbf-4975-8040-4daba638b407",
        "userId": "16373df5-da0a-4074-8295-f916b94269f4",
        "message": "Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.",
        "timestamp": "2016-11-09T05:04:58Z"
      }
    ];

    expect(dataReducer(initialState, fetchDataSuccess({members, messages}))).toEqual({
      members,
      messages,
      pending: false,
    });
  });

  it('should return error on FETCH_DATA_ERROR', () => {
    expect(dataReducer(initialState, fetchDataError('Error'))).toEqual({
      ...initialState,
      errorMessage: 'Error',
      pending: false,
    });
  });

});
