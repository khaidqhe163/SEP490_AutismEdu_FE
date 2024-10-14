import API_CODE from "~/utils/api_code";
import { get, post, put } from "./BaseService";

const registerAsTutor = async (params, success, error) => {
    await post(API_CODE.API_TUTOR_REGISTER, params, success, error);
};
const listTutor = async (success, error, params) => {
    await get(API_CODE.API_TUTOR_LIST, success, error, params);
};

const handleRegistrationForm = async (endpoint, params, success, error) => {
    await put(API_CODE.API_TUTOR_STATUS + endpoint, params, success, error)
};

const handleGetTutors = async (success, error, params) => {
    await get(API_CODE.API_GET_TUTORS, success, error, params);
};
const handleGetTutor = async (endpoint, success, error) => {
    await get(API_CODE.API_GET_TUTOR + endpoint, success, error);
};

export const TutorManagementAPI = {
    registerAsTutor,
    listTutor,
    handleRegistrationForm,
    handleGetTutors,
    handleGetTutor,
}