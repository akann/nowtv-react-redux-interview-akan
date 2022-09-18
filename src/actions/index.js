import { getMembers, getMessages } from '../data';

export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataPending());

    try {
      const values = await Promise.all([getMembers(), getMessages()]);
      dispatch(
        fetchDataSuccess({
          members: values[0],
          messages: values[1],
        })
      );
    } catch (error) {
      dispatch(fetchDataError(error));
    }
  };
};

export const fetchDataPending = () => ({
  type: FETCH_DATA_PENDING,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataError = (error) => ({
  type: FETCH_DATA_ERROR,
  payload: error,
});
