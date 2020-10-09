import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVisaApplicationStay, defaultValue } from 'app/shared/model/visa-application-stay.model';

export const ACTION_TYPES = {
  FETCH_VISAAPPLICATIONSTAY_LIST: 'visaApplicationStay/FETCH_VISAAPPLICATIONSTAY_LIST',
  FETCH_VISAAPPLICATIONSTAY: 'visaApplicationStay/FETCH_VISAAPPLICATIONSTAY',
  CREATE_VISAAPPLICATIONSTAY: 'visaApplicationStay/CREATE_VISAAPPLICATIONSTAY',
  UPDATE_VISAAPPLICATIONSTAY: 'visaApplicationStay/UPDATE_VISAAPPLICATIONSTAY',
  DELETE_VISAAPPLICATIONSTAY: 'visaApplicationStay/DELETE_VISAAPPLICATIONSTAY',
  RESET: 'visaApplicationStay/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVisaApplicationStay>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type VisaApplicationStayState = Readonly<typeof initialState>;

// Reducer

export default (state: VisaApplicationStayState = initialState, action): VisaApplicationStayState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VISAAPPLICATIONSTAY):
    case REQUEST(ACTION_TYPES.UPDATE_VISAAPPLICATIONSTAY):
    case REQUEST(ACTION_TYPES.DELETE_VISAAPPLICATIONSTAY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY):
    case FAILURE(ACTION_TYPES.CREATE_VISAAPPLICATIONSTAY):
    case FAILURE(ACTION_TYPES.UPDATE_VISAAPPLICATIONSTAY):
    case FAILURE(ACTION_TYPES.DELETE_VISAAPPLICATIONSTAY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VISAAPPLICATIONSTAY):
    case SUCCESS(ACTION_TYPES.UPDATE_VISAAPPLICATIONSTAY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VISAAPPLICATIONSTAY):
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

const apiUrl = 'api/visa-application-stays';

// Actions

export const getEntities: ICrudGetAllAction<IVisaApplicationStay> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY_LIST,
    payload: axios.get<IVisaApplicationStay>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IVisaApplicationStay> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VISAAPPLICATIONSTAY,
    payload: axios.get<IVisaApplicationStay>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVisaApplicationStay> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VISAAPPLICATIONSTAY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVisaApplicationStay> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VISAAPPLICATIONSTAY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVisaApplicationStay> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VISAAPPLICATIONSTAY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
