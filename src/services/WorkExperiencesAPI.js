import { get, post, put } from "./BaseService";
import API_CODE from "~/utils/api_code";

const changeWorkExperienceStatus = async (endpoint, success, error, params) => {
    await put(API_CODE.API_WORK_EXPERIENCE_STATUS + endpoint, success, error, params);
};

export const WorkExperiencesAPI = {
    changeWorkExperienceStatus
}