/* ********************* API CONSTANTS **********************/
/**
 * App tag. Used to customise app messages.
 * Used only for debug process.
 */
export const EXPERT_TAG = 'EXPERT_TAG';

/* ********************* API CONSTANTS **********************/
/**
 * link to the api root.
 */
// export const API_BASE_URL = 'https://e-experts-consultant-user.herokuapp.com/api/';
export const API_BASE_URL = 'http://localhost:5000/api/';

export const ROUTE_PATH_TYPES = Object.freeze({ 0: 'user', 2: 'company', 4: 'expert' });

/* *************** AUTHENTICATIONS CONSTANTS ****************/
export const USER_KEY = 'e-expert-user';
export const TOKEN_KEY = 'e-expert-auth-token';


export const APP_LANG_KEY = 'e-expert-active-lang';
/**
 * [January-December] month array resource names.
 */
export const MONTHS_RESOURCES_NAMES = [ 'months.january',  'months.february',  'months.march',  'months.april',  'months.may',  'months.june',  'months.july',  'months.august',  'months.september',  'months.october',  'months.november',  'months.december' ];
/**
 * Year the app is build.
 *
 * For every purpose that needs to ensure a provided date is in the app available ...
 */
export const APP_STARTING_YEAR = 2021;

export const SECRET_KEY="$jkhQE89&%P05QV"
