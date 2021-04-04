import { ISubscriber, IExpert } from './models.interface';

export interface User extends ISubscriber, IExpert {
  type: UserType;
}

export enum UserType {
  SUBSCRIBER = 0,
  COMPANY_SUBSCRIBER = 2,
  COMPANY_EXPERT    = 4,
  EXPERT     = 6,
 // ADMINISTRATOR = 4
}

