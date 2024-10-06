import API_CODE from "~/utils/api_code";
import { get, post } from "./BaseService";

const registerAsTutor = async (params, success, error) => {
    await post(API_CODE.API_TUTOR_REGISTER, params, success, error);
};
const listTutor = async (success, error, params) => {
    await get(API_CODE.API_TUTOR_LIST, success, error, params);
};

export const TutorManagementAPI = {
    registerAsTutor,
    listTutor
}