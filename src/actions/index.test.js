import { getMembers, getMessages } from '../data';
import {
  FETCH_DATA_PENDING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  fetchData,
  fetchDataPending,
  fetchDataSuccess,
  fetchDataError,
} from '../actions';

jest.mock('../data/index.js', () => ({
  getMembers: jest.fn(() =>
    Promise.resolve([
      {
        id: 'test-id1',
      },
    ])
  ),
  getMessages: jest.fn(() =>
    Promise.resolve([
      {
        id: 'test-id1',
      },
    ])
  ),
}));

describe('actions', () => {
  it('should return valid FETCH_DATA_PENDING', () => {
    expect(fetchDataPending()).toEqual({
      type: FETCH_DATA_PENDING,
    });
  });

  it('should return valid FETCH_DATA_SUCCESS', () => {
    const mockData = {
      members: {
        id: 'test-id1',
      },
      messages: {
        id: 'test-id1',
      },
    };
    expect(fetchDataSuccess(mockData)).toEqual({
      type: FETCH_DATA_SUCCESS,
      payload: mockData,
    });
  });

  it('should return valid FETCH_DATA_ERROR', () => {
    const error = 'Error';
    expect(fetchDataError(error)).toEqual({
      type: FETCH_DATA_ERROR,
      payload: error,
    });
  });

  describe('fetchData', () => {
    it('should return valid data on endpoints success', async () => {
      const mockDespatch = jest.fn();
      await fetchData()(mockDespatch);

      expect(mockDespatch).toHaveBeenCalledTimes(2);

      expect(mockDespatch).toHaveBeenNthCalledWith(1, {
        type: 'FETCH_DATA_PENDING'
      });

      expect(mockDespatch).toHaveBeenNthCalledWith(2, {
        payload: {
          members: [{ id: 'test-id1' }],
          messages: [{ id: 'test-id1' }]
        },
        type: 'FETCH_DATA_SUCCESS'
      });
    });

    it('should return error on endpoint failure', async () => {
      const mockDespatch = jest.fn();
      getMessages.mockImplementation(() => Promise.reject('Error'));
      await fetchData()(mockDespatch);

      expect(mockDespatch).toHaveBeenCalledTimes(2);

      expect(mockDespatch).toHaveBeenNthCalledWith(1, {
        type: 'FETCH_DATA_PENDING'
      });

      expect(mockDespatch).toHaveBeenNthCalledWith(2, {"payload": "Error", "type": "FETCH_DATA_ERROR"});
    });
  });
});
