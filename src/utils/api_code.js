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
  API_GET_TUTOR_REQUEST_HISTORY: '/v1/TutorRequest/history',
  API_POST_TUTOR_REQUEST: '/v1/TutorRequest',
  API_PUT_TUTOR_REQUEST: '/v1/TutorRequest/changeStatus/',
  API_GET_NO_PROFILE: '/v1/TutorRequest/NoStudentProfile',
  //Assessment management
  API_GET_ASSESSMENT: '/v1/Assessment',
  API_CREATE_ASSESSMENT: '/v1/Assessment',

  //Work experiences management
  API_WORK_EXPERIENCE_STATUS: '/v1/WorkExperience/changeStatus/',

  //Student profile management
  API_CREATE_STUDENT_PROFILE: '/v1/StudentProfile',
  API_GET_STUDENT_PROFILE: '/v1/StudentProfile',
  API_GET_MY_TUTOR: '/v1/StudentProfile/GetAllChildStudentProfile',
  API_GET_TUTOR_SCHEDULE: '/v1/StudentProfile/GetAllScheduleTimeSlot',
  API_GET_STUDENT_ID: '/v1/StudentProfile/',
  API_CHANGE_STUDENT_PROFILE_STATUS: '/v1/StudentProfile/changeStatus',
  API_CLOSE_TUTORING: '/v1/StudentProfile/CloseTutoring',

  //Progress report 
  API_CREATE_PROGRESS_REPORT: '/v1/ProgressReport',
  API_GET_LIST_PROGRESS_REPORT: '/v1/ProgressReport',
  API_UPDATE_PROGRESS_REPORT: '/v1/ProgressReport',
  //Exercuse management
  API_GET_ALL_EXERCISE_TYPE: '/v1/ExerciseType/getAllNoPaging',
  API_GET_EXERCISE_BY_TYPE: '/v1/Exercise/',
  API_GET_LIST_EXERCISE_TYPE: '/v1/ExerciseType',
  API_GET_EXERCISE_BY_TYPE_ID: '/v1/ExerciseType/exercise/',
  API_CREATE_EXERCISE: '/v1/Exercise',
  API_DELETE_EXERCISE: '/v1/Exercise/',

  //Syllabus management
  API_CREATE_SYLLABUS: '/v1/Syllabus',
  API_GET_LIST_SYLLABUS: '/v1/Syllabus',
  API_ASSIGN_SYLLABUS: '/v1/Syllabus/',
  API_DELETE_SYLLABUS: '/v1/Syllabus/',

  //Review management
  API_GET_REVIEW: '/v1/Review',
  API_GET_REVIEW_STATS: '/v1/Review/GetTutorReviewStats/',
  API_CREATE_REVIEW: '/v1/Review',
  API_UPDATE_REVIEW: '/v1/Review/',
  API_DELETE_REVIEW: '/v1/Review/',


  //Schedule
  API_GET_SCHEDULE: '/v1/Schedule',
  API_GET_SCHEDULE_BY_ID: '/v1/Schedule/',
  API_UPDATE_ASSIGN_EXERCISES: '/v1/Schedule/AssignExercises/',
  API_UPDATE_SCHEDULE_CHANGE_STATUS: '/v1/Schedule/changeStatus/',

  //time slot
  API_GET_STUDENT_TIME_SLOT: '/v1/StudentProfile/GetStudentProfileScheduleTimeSlot/',
  API_CREATE_SCHEDULE: '/v1/ScheduleTimeSlot/',
  API_DELETE_SCHEDULE: '/v1/ScheduleTimeSlot/',
  API_UPDATE_SCHEDULE: '/v1/Schedule/ChangeScheduleDateTime',

  //Score range
  API_CREATE_SCORE_RANGE: '/v1/AssessmentScoreRange',
  API_EDIT_SCORE_RANGE: '/v1/AssessmentScoreRange',
  API_DELETE_SCORE_RANGE: '/v1/AssessmentScoreRange/',
  API_GET_SCORE_RANGE: '/v1/AssessmentScoreRange',

  //payment package
  API_GET_PAYMENT_PACKAGE: '/PackagePayment',
  API_POST_PAYMENT_PACKAGE: '/PackagePayment',
  API_PUT_PAYMENT_PACKAGE: '/PackagePayment/changeStatus/',
  API_DELETE_PAYMENT_PACKAGE: '/PackagePayment/',

  //Notification package
  API_GET_NOTIFICATION: '/Notification',
  API_READ_ALL_NOTIFICATION: '/Notification/ReadAll',
  API_READ_A_NOTIFICATION: '/Notification/read/'
};

export default API_CODE;
