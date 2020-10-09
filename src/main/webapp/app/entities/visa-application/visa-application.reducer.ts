import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVisaApplication, defaultValue } from 'app/shared/model/visa-application.model';

export const ACTION_TYPES = {
  FETCH_VISAAPPLICATION_LIST: 'visaApplication/FETCH_VISAAPPLICATION_LIST',
  FETCH_VISAAPPLICATION: 'visaApplication/FETCH_VISAAPPLICATION',
  CREATE_VISAAPPLICATION: 'visaApplication/CREATE_VISAAPPLICATION',
  UPDATE_VISAAPPLICATION: 'visaApplication/UPDATE_VISAAPPLICATION',
  DELETE_VISAAPPLICATION: 'visaApplication/DELETE_VISAAPPLICATION',
  RESET: 'visaApplication/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVisaApplication>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type VisaApplicationState = Readonly<typeof initialState>;

// Reducer

export default (state: VisaApplicationState = initialState, action): VisaApplicationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VISAAPPLICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VISAAPPLICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VISAAPPLICATION):
    case REQUEST(ACTION_TYPES.UPDATE_VISAAPPLICATION):
    case REQUEST(ACTION_TYPES.DELETE_VISAAPPLICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VISAAPPLICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VISAAPPLICATION):
    case FAILURE(ACTION_TYPES.CREATE_VISAAPPLICATION):
    case FAILURE(ACTION_TYPES.UPDATE_VISAAPPLICATION):
    case FAILURE(ACTION_TYPES.DELETE_VISAAPPLICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISAAPPLICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISAAPPLICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VISAAPPLICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_VISAAPPLICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VISAAPPLICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/visa-applications';

// Actions

export const getEntities: ICrudGetAllAction<IVisaApplication> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VISAAPPLICATION_LIST,
    payload: axios.get<IVisaApplication>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IVisaApplication> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VISAAPPLICATION,
    payload: axios.get<IVisaApplication>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVisaApplication> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VISAAPPLICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVisaApplication> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VISAAPPLICATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVisaApplication> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VISAAPPLICATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
