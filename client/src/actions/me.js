import { FETCH_ME, FETCH_ME_SUCCESS, FETCH_ME_ERROR } from "../actions/types";

export const fetchMe = () => {
  return {
    type: FETCH_ME
  };
};

export const fetchMeSuccess = data => {
  return {
    type: FETCH_ME_SUCCESS,
    data
  };
};

export const error = error => {
  return { type: FETCH_ME_ERROR, error };
};
