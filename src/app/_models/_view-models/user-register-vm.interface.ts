import {UserType} from '../user.interface';

export interface UserRegisterVm {
  nic ?: string;
  email: string;
  type: UserType;
  lastname: string;
  password: string;
  firstname ?: string;
  phoneNumber: string;
  company_name?: string;
  confirm_password: string;
  experience: number;
  domain_activity: [string];
  trade_id: string;
  accept_conditions: boolean;
  social_reason?:string;
  country:string;
  national_order?: string;
  niu?:string;
  city:string;
  avatar?:File,
  international_order?: string;
  territorial_competence?:string;
  sexe:string;
  working_place:string;
}

export const UserRegisterableTypes = Object.freeze([
  { key: UserType.SUBSCRIBER, value: 'user_types.subscriber' },
  { key: UserType.COMPANY_EXPERT, value: 'user_types.company_subscriber' },
  { key: UserType.COMPANY_EXPERT, value: 'user_types.company_expert' },
  { key: UserType.EXPERT, value: 'user_types.expert' }
]);

