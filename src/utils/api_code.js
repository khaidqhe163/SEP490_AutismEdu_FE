const API_CODE = {
  // Auth
  API_001: '/v1/Auth/login',
  API_002: '/v1/Auth/register',
  API_003: '/v1/Auth/reset-password',
  API_004: '/v1/Auth/forgot-password',
  API_005: '/v1/Auth/resend-confirm-email',
  API_006: '/v1/Auth/confirm-email',
  API_007: '/v1/Auth/register',
  API_008: '/v1/Auth/get-token-external',
  API_009: '/v1/test/authorized-access',

  //User management
  API_GET_USERS: '/v1/User',
  API_LOCK_USERS: '/v1/User/lock/',
  API_UNLOCK_USERS: '/v1/User/unlock/',
  API_GET_USER_CLAIMS: '/v1/User/claim/',
  API_ASSIGN_CLAIMS: '/v1/User/claim/',
  API_REMOVE_USER_CLAIM: '/v1/User/claim/',
  API_ASSIGN_ROLES: '/v1/User/role/',
  API_GET_USER_ROLES: '/v1/User/role/',
  API_REMOVE_USER_ROLES: '/v1/User/role/',
  API_CREATE_USER: '/v1/User',
  API_GET_USER_ID: '/v1/User/',
  API_UPDATE_USER: '/v1/User/',
  API_GET_USER_EMAIL: '/v1/User/email/',
  //Claim management
  API_GET_CLAIM: '/v1/Claim',
  API_ADD_CLAIM: '/v1/Claim',

  //role management
  API_GET_ROLE: '/v1/Role',

  //Tutor management
  API_TUTOR_REGISTER: '/v1/TutorRegistrationRequest',
  API_TUTOR_LIST: '/v1/TutorRegistrationRequest',
  API_TUTOR_STATUS: '/v1/TutorRegistrationRequest/changeStatus/',
  API_GET_TUTORS: '/v1/Tutor',
  API_GET_TUTOR: '/v1/Tutor/',
  API_GET_TUTOR_PROFILE: '/v1/Tutor/profile',
  API_UPDATE_TUTOR_PROFILE: '/v1/Tutor/',

  //Curriculum management
  API_CREATE_CURRICULUM: '/v1/Curriculum',
  API_GET_CURRICULUMS: '/v1/Curriculum',
  API_GET_UPDATE_REQUEST: '/v1/Curriculum/updateRequest',
  API_CHANGE_STATUS_CURRICULUM: '/v1/Curriculum/changeStatus/',

  //Certificate management
  API_CERTIFICATE_STATUS: '/v1/Certificate/changeStatus/',
  API_GET_CERTIFICATE: '/v1/Certificate',
  API_GET_CERTIFICATE_ID: '/v1/Certificate/',
  API_CREATE_CERTIFICATE: '/v1/Certificate',
  API_DELETE_CERTIFICATE: '/v1/Certificate/',

  //Available time management
  API_CREATE_AVAILABLE_TIME: '/v1/AvailableTime',
  API_GET_AVAILABLE_TIME: '/v1/AvailableTime',
  API_REMOVE_AVAILABLE_TIME: '/v1/AvailableTime/',

  //Children management
  API_CHILDREN_LIST: '/v1/ChildInformation/',
  API_CREATE_CHILD: '/v1/ChildInformation',
  API_UPDATE_CHILD: '/v1/ChildInformation',

  //Tutor Request management
  API_GET_TUTOR_REQUEST: '/v1/TutorRequest',
  API_POST_TUTOR_REQUEST: '/v1/TutorRequest',
  API_PUT_TUTOR_REQUEST: '/v1/TutorRequest/changeStatus/',
  //Assessment management
  API_GET_ASSESSMENT: '/v1/Assessment',
  API_CREATE_ASSESSMENT: '/v1/Assessment',

  //Work experiences management
  API_WORK_EXPERIENCE_STATUS: '/v1/WorkExperience/changeStatus/',

  //Student profile management
  API_CREATE_STUDENT_PROFILE: '/v1/StudentProfile',
  API_GET_STUDENT_PROFILE: '/v1/StudentProfile',
  API_GET_TUTOR_SCHEDULE: '/v1/StudentProfile/GetAllScheduleTimeSlot',
  API_GET_STUDENT_ID: '/v1/StudentProfile/'
};

export default API_CODE;
