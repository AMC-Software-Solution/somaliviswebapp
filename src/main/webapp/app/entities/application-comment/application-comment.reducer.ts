import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApplicationComment, defaultValue } from 'app/shared/model/application-comment.model';

export const ACTION_TYPES = {
  FETCH_APPLICATIONCOMMENT_LIST: 'applicationComment/FETCH_APPLICATIONCOMMENT_LIST',
  FETCH_APPLICATIONCOMMENT: 'applicationComment/FETCH_APPLICATIONCOMMENT',
  CREATE_APPLICATIONCOMMENT: 'applicationComment/CREATE_APPLICATIONCOMMENT',
  UPDATE_APPLICATIONCOMMENT: 'applicationComment/UPDATE_APPLICATIONCOMMENT',
  DELETE_APPLICATIONCOMMENT: 'applicationComment/DELETE_APPLICATIONCOMMENT',
  RESET: 'applicationComment/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApplicationComment>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ApplicationCommentState = Readonly<typeof initialState>;

// Reducer

export default (state: ApplicationCommentState = initialState, action): ApplicationCommentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APPLICATIONCOMMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPLICATIONCOMMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APPLICATIONCOMMENT):
    case REQUEST(ACTION_TYPES.UPDATE_APPLICATIONCOMMENT):
    case REQUEST(ACTION_TYPES.DELETE_APPLICATIONCOMMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APPLICATIONCOMMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APPLICATIONCOMMENT):
    case FAILURE(ACTION_TYPES.CREATE_APPLICATIONCOMMENT):
    case FAILURE(ACTION_TYPES.UPDATE_APPLICATIONCOMMENT):
    case FAILURE(ACTION_TYPES.DELETE_APPLICATIONCOMMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATIONCOMMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATIONCOMMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPLICATIONCOMMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_APPLICATIONCOMMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPLICATIONCOMMENT):
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

const apiUrl = 'api/application-comments';

// Actions

export const getEntities: ICrudGetAllAction<IApplicationComment> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICATIONCOMMENT_LIST,
    payload: axios.get<IApplicationComment>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IApplicationComment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICATIONCOMMENT,
    payload: axios.get<IApplicationComment>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IApplicationComment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPLICATIONCOMMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApplicationComment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPLICATIONCOMMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApplicationComment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPLICATIONCOMMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
