import {UserType} from './user.interface';


/**
 * Define properties that an entity should provide to perform login request(to API).
 */
export interface ILogin {
  /**
   * Email address or NIC of the user that should be logged in
   */
  email: string;
  nic?:string;
  /**
   * Password of the user
   */
  password: string;
}


/**
 * Defines properties that someone or thing that has access to the app has.
 */
export interface IConnectable  {
  /**
   * Email address
   */
  email: string;
  /**
   * Picture path (relative to api server)
   */
  avatar?:File,
  /**
   * Password of the user. Of cause, it must be null.
   */
  password: string;
  /**
   * Flag that determines if the owner is active or not. It has something to do with the access to the platform.
   */
  isActivated: boolean;
  /**
   * Last date the owner signed in on the app.
   */
  lastConnection?: Date;

  country:string;

  city:string;

  phoneNumber: string;

}

/**
 * Defines person personal infos properties.
 */
export interface IPersonPersonalInfos {
  /**
   * National Identity Card number
   */
  nic: number;
  /**
   * Last name
   */
  lastName: string;
  /**
   * First name
   */
  firstName: string;

  sexe:string;

  isCompany : boolean  

}


/**
 * Definition of a person. Assuming that a person is a kind of Entity and has access to the app.
 */
export interface IPerson extends  IConnectable, IPersonPersonalInfos { }

/**
 * Definition of a company.
 */
export interface ICompany extends  IConnectable, ICompanyPersonalInfos { }

/**
 * Defines company personal infos properties
 */
export interface ICompanyPersonalInfos {
  /**
   * Company name
   */
  company_name: string;
  /**
   * Company activity domain
   */
  trade_id: string;
  /**
   * Company head-quater town location
   */
  social_reason: string;
}


/**
 * Characteristics of an expert.
 */
export interface IExpert extends IExpertPerson, ICompany, IPerson {
  domain_activity: [string];
  website?:string;
  type: UserType;
 }

export interface IExpertPerson extends IPerson{

  international_order?:string;

  national_order?:string;

  working_place?:string;

  niu:string;

  experience: number;
 }

export interface ISubscriber  extends IPerson, ICompany{
  
}