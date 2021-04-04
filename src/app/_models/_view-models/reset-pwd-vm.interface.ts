import {UserType} from '../user.interface';

export default interface ResetPwdVm {
  email: string;
  type: UserType;
}
