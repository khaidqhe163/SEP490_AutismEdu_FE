import API_CODE from "~/utils/api_code";
import { get, post, put } from "./BaseService";

const createStudentProfile = async (params, success, error) => {
    await post(API_CODE.API_CREATE_STUDENT_PROFILE, params, success, error);
};

const getListStudent = async (success, error, params) => {
    await get(API_CODE.API_GET_STUDENT_PROFILE, success, error, params)
}

const getTutorSchedule = async (success, error) => {
    await get(API_CODE.API_GET_TUTOR_SCHEDULE, success, error)
}

const getStudentProfileById = async (endpoint, success, error) => {
    await get(API_CODE.API_GET_STUDENT_ID + endpoint, success, error)
}
export const StudentProfileAPI = {
    createStudentProfile,
    getListStudent,
    getTutorSchedule,
    getStudentProfileById
}