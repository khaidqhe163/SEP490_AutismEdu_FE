import DashBoard from '~/pages/Admin/DashBoard'
import RoleClaimManagement from '~/pages/Admin/RoleClaimManagement'
import UserManagement from '~/pages/Admin/UserManagement'
import ConfirmRegister from '~/pages/Auth/ConfirmRegister'
import ForgotPassword from '~/pages/Auth/ForgotPassword'
import Login from '~/pages/Auth/Login'
import Register from '~/pages/Auth/Register'
import ResetPassword from '~/pages/Auth/ResetPassword'
import CenterProfile from '~/pages/Center/CenterProfile'
import SearchCenter from '~/pages/Center/SearchCenter'
import Home from '~/pages/Home'
import PAGES from '~/utils/pages'
import SearchTutor from '~/pages/Tutor/SearchTutor'
import TutorProfile from '~/pages/Tutor/TutorProfile'
import TutorProfileUpdate from '~/pages/Tutor/TutorProfileUpdate'
import TutorRegistrationManagement from '~/pages/Admin/TutorRegistrationManagement'
import TutorRegistration from '~/pages/Tutor/TutorRegistration'
import MyStudent from '~/pages/Tutor/MyStudent'
import StudentDetail from '~/pages/Tutor/MyStudent/StudentDetail.jsx'
import TutorSetting from '~/pages/Tutor/TutorSetting'
import LoginOption from '~/pages/Auth/Login/LoginOption'
import TutorLogin from '~/pages/Auth/Login/LoginForm/TutorLogin'
import TutorRequest from '~/pages/Tutor/TutorRequest'
import RegisterOptions from '~/pages/Auth/Register/RegisterOptions'
import MyChildren from '~/pages/MyChildren'
import Calendar from '~/pages/Tutor/Calendar'
import ParentProfile from '~/pages/Parent/ParentProfile'
import ChangePassword from '~/pages/Parent/ChangePassword'
import AssessmentManagement from '~/pages/Admin/AssessmentManagement'
import AssessmentCreation from '~/pages/Admin/AssessmentManagement/AssessmentCreation'
import CertificateDetail from '~/pages/Tutor/TutorSetting/CertificateManagement/CertificateDetail'
import StudentCreation from '~/pages/StudentProfile/StudentCreation'
import ExerciseManagement from '~/pages/Tutor/ExerciseManagement'
import MyTutor from '~/pages/Tutor/MyTutor'
import MyTutorDetail from '~/pages/Tutor/MyTutor/MyTutorDetail'
import StudentProfileApprove from '~/pages/StudentProfile/StudentProfileApprove'
import TutorRequestHistory from '~/pages/Parent/TutorRequestHistory/TutorRequestHistory'
import LoginAdmin from '~/pages/Admin/LoginAdmin'
import TestManage from '~/pages/Parent/TestManage'
import TestManagement from '~/pages/Admin/TestManagement'
import PaymentPackage from '~/pages/Admin/PaymentManagement/PaymentPackage'
import AssessmentScoreRange from '~/pages/Admin/AssessmentManagement/AssessmentScoreRange'
import BlogManagement from '~/pages/Admin/BlogManagement'
import BlogCreation from '~/pages/Admin/BlogManagement/BlogCreation'
import Blog from '~/pages/Blog'
import BlogDetail from '~/pages/Blog/BlogDetail'
import DoTest from '~/pages/Parent/TestManage/DoTest'
import TestHistory from '~/pages/Parent/TestManage/TestHistory'
import TestResultDetail from '~/pages/Parent/TestManage/TestResultDetail'
import RechargeModal from '~/components/PaymentModal/RechargeModal'
import PaymentPackageManagement from '~/pages/Tutor/PaymentPackageManagement/PaymentPackageManagement'
import BlogUpdate from '~/pages/Admin/BlogManagement/BlogUpdate'
import ReportTutorManagement from '~/pages/Admin/ReportManagement/ReportTutorManagement'
import ReportDetail from '~/pages/Admin/ReportManagement/ReportTutorManagement/ReportDetail'

const UnLayoutRoutes = [
    {
        path: PAGES.TUTOR_LOGIN,
        element: TutorLogin
    },
    {
        path: PAGES.TUTORREGISTRATION,
        element: TutorRegistration
    },
    {
        path: PAGES.LOGIN_ADMIN,
        element: LoginAdmin
    }
]

const publicRoutes = [
    {
        path: PAGES.ROOT + PAGES.HOME,
        element: Home
    },
    {
        path: PAGES.ROOT + PAGES.LOGIN,
        element: Login
    },
    {
        path: PAGES.ROOT + PAGES.FORGOTPASSWORD,
        element: ForgotPassword
    },
    {
        path: PAGES.ROOT + PAGES.REGISTER,
        element: Register
    },
    {
        path: PAGES.ROOT + PAGES.RESETPASSWORD,
        element: ResetPassword
    },
    {
        path: PAGES.ROOT + PAGES.CONFIRMREGISTER,
        element: ConfirmRegister
    },
    {
        path: PAGES.ROOT + PAGES.LISTCENTER,
        element: SearchCenter
    },
    {
        path: PAGES.ROOT + PAGES.CENTERPROFILE,
        element: CenterProfile
    },
    {
        path: PAGES.ROOT + PAGES.LISTTUTOR,
        element: SearchTutor
    },
    {
        path: PAGES.ROOT + PAGES.TUTORPROFILE,
        element: TutorProfile
    },
    {
        path: PAGES.ROOT + PAGES.TUTORPROFILEUPDATE,
        element: TutorProfileUpdate
    },
    {
        path: PAGES.ROOT + PAGES.LOGIN_OPTION,
        element: LoginOption
    },
    {
        path: PAGES.ROOT + PAGES.REGISTER_OPTION,
        element: RegisterOptions
    },
    {
        path: PAGES.ROOT + PAGES.MY_CHILDREN,
        element: MyChildren
    },
    {
        path: PAGES.ROOT + PAGES.PARENT_PROFILE,
        element: ParentProfile
    },
    {
        path: PAGES.ROOT + PAGES.CHANGE_PASSWORD,
        element: ChangePassword
    },
    {
        path: PAGES.ROOT + PAGES.APPROVE_STUDENT_PROFILE,
        element: StudentProfileApprove
    },
    {
        path: PAGES.ROOT + PAGES.MY_TUTOR,
        element: MyTutor
    },
    {
        path: PAGES.ROOT + PAGES.MY_TUTOR_DETAIL,
        element: MyTutorDetail
    },
    {
        path: PAGES.ROOT + PAGES.TUTOR_REQUEST_HISTORY,
        element: TutorRequestHistory
    },
    {
        path: PAGES.ROOT + PAGES.BLOG_LIST,
        element: Blog
    },
    {
        path: PAGES.ROOT + PAGES.BLOG_DETAIL,
        element: BlogDetail
    },
    {
        path: PAGES.ROOT + PAGES.TEST,
        element: TestManage
    },
    {
        path: PAGES.ROOT + PAGES.DO_TEST,
        element: DoTest
    },
    {
        path: PAGES.ROOT + PAGES.TEST_HISTORY,
        element: TestHistory
    },
    {
        path: PAGES.ROOT + PAGES.TEST_DETAIL_HISTORY,
        element: TestResultDetail
    }
]


const tutorRoutes = [
    {
        path: PAGES.MY_STUDENT,
        element: MyStudent
    }, {
        path: PAGES.STUDENT_DETAIL,
        element: StudentDetail
    }, {
        path: PAGES.TUTOR_SETTING,
        element: TutorSetting
    },
    {
        path: PAGES.TUTOR_REQUEST,
        element: TutorRequest
    }, {
        path: PAGES.CALENDAR,
        element: Calendar
    }, {
        path: PAGES.CERTIFICATE_DETAIL,
        element: CertificateDetail
    }, {
        path: PAGES.STUDENT_CREATION,
        element: StudentCreation
    }, {
        path: PAGES.EXERCISE_MANAGEMENT,
        element: ExerciseManagement
    }, {
        path: PAGES.PAYMENT_PACKAGE,
        element: RechargeModal
    }
]
const adminRoutes = [
    {
        path: PAGES.DASHBOARD,
        element: DashBoard
    },
    {
        path: PAGES.USERMANAGEMENT,
        element: UserManagement
    },
    {
        path: PAGES.ROLECLAIMMANAGEMENT,
        element: RoleClaimManagement
    },
    {
        path: PAGES.TUTORREGISTRATIONMANAGEMENT,
        element: TutorRegistrationManagement
    },
    {
        path: PAGES.ASSESSMENT_MANAGEMENT,
        element: AssessmentManagement
    },
    {
        path: PAGES.ASSESSMENT_CREATION,
        element: AssessmentCreation
    },
    {
        path: PAGES.TEST_MANAGEMENT,
        element: TestManagement
    },
    {
        path: PAGES.PAYMENT_PACKAGE_MANAGEMENT,
        element: PaymentPackage
    },
    {
        path: PAGES.SCORE_RANGE,
        element: AssessmentScoreRange
    },
    {
        path: PAGES.BLOG_MANAGEMENT,
        element: BlogManagement
    },
    {
        path: PAGES.BLOG_CREATION,
        element: BlogCreation
    },
    {
        path: PAGES.BLOG_EDIT,
        element: BlogUpdate
    },
    {
        path: PAGES.REPORT_TUTOR_MANAGEMENT,
        element: ReportTutorManagement
    },
    {
        path: PAGES.REPORT_TUTOR_DETAIL,
        element: ReportDetail
    },

]
export {
    adminRoutes, publicRoutes, tutorRoutes, UnLayoutRoutes
}
