import { Moment } from 'moment';
import { CommenterType } from 'app/shared/model/enumerations/commenter-type.model';

export interface IApplicationComment {
  id?: number;
  title?: string;
  comment?: string;
  commentDate?: string;
  commenterType?: CommenterType;
  visaApplicationApplicationName?: string;
  visaApplicationId?: number;
  commentedByLogin?: string;
  commentedById?: number;
}

export const defaultValue: Readonly<IApplicationComment> = {};
