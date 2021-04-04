import {UserType} from '../user.interface';

export default interface UserLoginVM {
  email ?: string;
  password: string;
  nic ?: string;
  trade_register?:string
  type: UserType;
}
