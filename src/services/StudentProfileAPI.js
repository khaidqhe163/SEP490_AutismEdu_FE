import API_CODE from "~/utils/api_code";
import { get, post, put } from "./BaseService";

const createStudentProfile = async (params, success, error) => {
    await post(API_CODE.API_CREATE_STUDENT_PROFILE, params, success, error);
};
export const StudentProfileAPI = {
    createStudentProfile
}