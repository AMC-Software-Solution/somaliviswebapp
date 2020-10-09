import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApplicantTravelDocument, defaultValue } from 'app/shared/model/applicant-travel-document.model';

export const ACTION_TYPES = {
  FETCH_APPLICANTTRAVELDOCUMENT_LIST: 'applicantTravelDocument/FETCH_APPLICANTTRAVELDOCUMENT_LIST',
  FETCH_APPLICANTTRAVELDOCUMENT: 'applicantTravelDocument/FETCH_APPLICANTTRAVELDOCUMENT',
  CREATE_APPLICANTTRAVELDOCUMENT: 'applicantTravelDocument/CREATE_APPLICANTTRAVELDOCUMENT',
  UPDATE_APPLICANTTRAVELDOCUMENT: 'applicantTravelDocument/UPDATE_APPLICANTTRAVELDOCUMENT',
  DELETE_APPLICANTTRAVELDOCUMENT: 'applicantTravelDocument/DELETE_APPLICANTTRAVELDOCUMENT',
  SET_BLOB: 'applicantTravelDocument/SET_BLOB',
  RESET: 'applicantTravelDocument/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApplicantTravelDocument>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ApplicantTravelDocumentState = Readonly<typeof initialState>;

// Reducer

export default (state: ApplicantTravelDocumentState = initialState, action): ApplicantTravelDocumentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APPLICANTTRAVELDOCUMENT):
    case REQUEST(ACTION_TYPES.UPDATE_APPLICANTTRAVELDOCUMENT):
    case REQUEST(ACTION_TYPES.DELETE_APPLICANTTRAVELDOCUMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT):
    case FAILURE(ACTION_TYPES.CREATE_APPLICANTTRAVELDOCUMENT):
    case FAILURE(ACTION_TYPES.UPDATE_APPLICANTTRAVELDOCUMENT):
    case FAILURE(ACTION_TYPES.DELETE_APPLICANTTRAVELDOCUMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPLICANTTRAVELDOCUMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_APPLICANTTRAVELDOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPLICANTTRAVELDOCUMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/applicant-travel-documents';

// Actions

export const getEntities: ICrudGetAllAction<IApplicantTravelDocument> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT_LIST,
    payload: axios.get<IApplicantTravelDocument>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IApplicantTravelDocument> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICANTTRAVELDOCUMENT,
    payload: axios.get<IApplicantTravelDocument>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IApplicantTravelDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPLICANTTRAVELDOCUMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApplicantTravelDocument> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPLICANTTRAVELDOCUMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApplicantTravelDocument> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPLICANTTRAVELDOCUMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
