import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApplicantContactInfo, defaultValue } from 'app/shared/model/applicant-contact-info.model';

export const ACTION_TYPES = {
  FETCH_APPLICANTCONTACTINFO_LIST: 'applicantContactInfo/FETCH_APPLICANTCONTACTINFO_LIST',
  FETCH_APPLICANTCONTACTINFO: 'applicantContactInfo/FETCH_APPLICANTCONTACTINFO',
  CREATE_APPLICANTCONTACTINFO: 'applicantContactInfo/CREATE_APPLICANTCONTACTINFO',
  UPDATE_APPLICANTCONTACTINFO: 'applicantContactInfo/UPDATE_APPLICANTCONTACTINFO',
  DELETE_APPLICANTCONTACTINFO: 'applicantContactInfo/DELETE_APPLICANTCONTACTINFO',
  RESET: 'applicantContactInfo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IApplicantContactInfo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ApplicantContactInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: ApplicantContactInfoState = initialState, action): ApplicantContactInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APPLICANTCONTACTINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPLICANTCONTACTINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APPLICANTCONTACTINFO):
    case REQUEST(ACTION_TYPES.UPDATE_APPLICANTCONTACTINFO):
    case REQUEST(ACTION_TYPES.DELETE_APPLICANTCONTACTINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APPLICANTCONTACTINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APPLICANTCONTACTINFO):
    case FAILURE(ACTION_TYPES.CREATE_APPLICANTCONTACTINFO):
    case FAILURE(ACTION_TYPES.UPDATE_APPLICANTCONTACTINFO):
    case FAILURE(ACTION_TYPES.DELETE_APPLICANTCONTACTINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICANTCONTACTINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICANTCONTACTINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPLICANTCONTACTINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_APPLICANTCONTACTINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPLICANTCONTACTINFO):
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

const apiUrl = 'api/applicant-contact-infos';

// Actions

export const getEntities: ICrudGetAllAction<IApplicantContactInfo> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICANTCONTACTINFO_LIST,
    payload: axios.get<IApplicantContactInfo>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IApplicantContactInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICANTCONTACTINFO,
    payload: axios.get<IApplicantContactInfo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IApplicantContactInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPLICANTCONTACTINFO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IApplicantContactInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPLICANTCONTACTINFO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApplicantContactInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPLICANTCONTACTINFO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
