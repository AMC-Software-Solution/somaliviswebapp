import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAppSetting, defaultValue } from 'app/shared/model/app-setting.model';

export const ACTION_TYPES = {
  FETCH_APPSETTING_LIST: 'appSetting/FETCH_APPSETTING_LIST',
  FETCH_APPSETTING: 'appSetting/FETCH_APPSETTING',
  CREATE_APPSETTING: 'appSetting/CREATE_APPSETTING',
  UPDATE_APPSETTING: 'appSetting/UPDATE_APPSETTING',
  DELETE_APPSETTING: 'appSetting/DELETE_APPSETTING',
  RESET: 'appSetting/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAppSetting>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type AppSettingState = Readonly<typeof initialState>;

// Reducer

export default (state: AppSettingState = initialState, action): AppSettingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APPSETTING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPSETTING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APPSETTING):
    case REQUEST(ACTION_TYPES.UPDATE_APPSETTING):
    case REQUEST(ACTION_TYPES.DELETE_APPSETTING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APPSETTING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APPSETTING):
    case FAILURE(ACTION_TYPES.CREATE_APPSETTING):
    case FAILURE(ACTION_TYPES.UPDATE_APPSETTING):
    case FAILURE(ACTION_TYPES.DELETE_APPSETTING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPSETTING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPSETTING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPSETTING):
    case SUCCESS(ACTION_TYPES.UPDATE_APPSETTING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPSETTING):
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

const apiUrl = 'api/app-settings';

// Actions

export const getEntities: ICrudGetAllAction<IAppSetting> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_APPSETTING_LIST,
    payload: axios.get<IAppSetting>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IAppSetting> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPSETTING,
    payload: axios.get<IAppSetting>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAppSetting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPSETTING,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAppSetting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPSETTING,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAppSetting> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPSETTING,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
