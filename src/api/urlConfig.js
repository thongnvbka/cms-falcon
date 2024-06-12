export const BASE_URL_V2 = 'https://apiv2.vdiarybook.vn/cms/v2';
// export const BASE_URL_V2 = 'https://apiv2.demomxh.work/cms/v2';

export const BASE_URL_LUCKY = 'https://lucky.vdiarybook.vn/v1';
export const BASE_URL_FILE_MANAGER = 'https://file.vdiarybook.vn';

//upload file
export const UPLOAD_IMAGE = `${BASE_URL_FILE_MANAGER}/file/upload/image`;

//GET FILE
export const GET_FILE = BASE_URL_FILE_MANAGER+'/uploads';

export const GET_FILE_IMAGE = BASE_URL_FILE_MANAGER+`/file/image`;


export const BASE_URL_CLIENT_V2 = 'https://apiv2.vdiarybook.vn/api/v2';
// export const BASE_URL_CLIENT_V2 = 'https://apiv2.demomxh.work/api/v2';


//Login
export const LOGIN_URL = `${BASE_URL_V2}/auth`;

//Users
export const USERS = `${BASE_URL_V2}/users`;

//Sticker
export const STICKER = `${BASE_URL_V2}/sticker`;

//Badge
export const BADGE = `${BASE_URL_V2}/badge`;

//background post
export const BACKGROUND_POST = `${BASE_URL_V2}/back-ground-post`;

//reaction activity
export const REACTION_ACTIVITY = `${BASE_URL_V2}/reaction-activity`;

//media system
export const MEDIA_SYSTEM = `${BASE_URL_V2}/media-system`;

//Identifier 
export const GET_IDENTIFIER_USERS = `${BASE_URL_V2}/identity`;
export const HANDLE_IDENTIFIER_USERS = `${BASE_URL_V2}/identity/handle`;


//Baiviet
export const GET_BAIVIET = `${BASE_URL_V2}/posts/getall`;

//Games
export const GAMES = `${BASE_URL_LUCKY}/game`;

//Nhom
export const GET_NHOM = `${BASE_URL_V2}/groups`;

//User
export const GET_USER = `${BASE_URL_V2}/users/getall`;

//Kiemduyet
export const GET_KIEMDUYET = `${BASE_URL_V2}/users/reporter`;
export const PUT_KIEMDUYET = `${BASE_URL_V2}/users/censor`;

//Nhà đồng hành 

export const GET_COMPANION = `${BASE_URL_V2}/companion`;
export const GET_COMPANION_CLIENT = `${BASE_URL_CLIENT_V2}/companion`;
export const CREATE_COMPANION = `${BASE_URL_V2}/companion/create`;
export const UPDATE_COMPANION = `${BASE_URL_V2}/companion/update`;
export const DELETE_COMPANION = `${BASE_URL_V2}/companion`;

//Groups 
export const GET_GROUPS_LIST = `${BASE_URL_V2}/groups`;
export const GROUPS_HANDLE = `${BASE_URL_V2}/groups/status`;


//Post 
export const GET_POST_LIST = `${BASE_URL_V2}/posts/getall`;
export const GET_POST_LIST_REPORT = `${BASE_URL_CLIENT_V2}/profile/getreport`;
export const POST_HANDLE_REPORT = `${BASE_URL_V2}/posts/handle-report`;

// export const GROUPS_HANDLE = `${BASE_URL_V2}/groups/status`;

//postCategory

// export const GET_POST_LIST = `${BASE_URL_V2}/posts/getall`;
export const GET_POST_CAT_LIST = `${BASE_URL_CLIENT_V2}/post/categories`;


// policy 

export const GET_POLICY = `${BASE_URL_V2}/policy`;
export const GET_POLICY_BYID = `${BASE_URL_V2}/policy`;
export const CREATE_POLICY = `${BASE_URL_V2}/policy/create`;
export const UPDATE_POLICY = `${BASE_URL_V2}/policy/update`;
export const CHANGE_POLICY_STATUS = `${BASE_URL_V2}/policy/status`;

//notification
export const GET_NOTIFICATION= `${BASE_URL_CLIENT_V2}/profile/list-censor-notifi`;
export const SEND_NOTIFICATION = `${BASE_URL_CLIENT_V2}/profile/send-notification`;
export const GET_PROVINCE_LIST = `${BASE_URL_CLIENT_V2}/province`;
export const GET_DISTRICT = `${BASE_URL_CLIENT_V2}/district`;
export const GET_WARD = `${BASE_URL_CLIENT_V2}/ward`;

export const GET_PROVINCE = `${BASE_URL_V2}/location/province`;






