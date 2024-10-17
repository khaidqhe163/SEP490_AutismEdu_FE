import { del, post, get } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const createCurriculum = async (params, success, error) => {
    await post(API_CODE.API_CREATE_CURRICULUM, params, success, error);
};
const getCurriculums = async (success, error, params) => {
    await get(API_CODE.API_GET_CURRICULUMS, success, error, params);
};
const changeStatusCurriculum = async (endpoint, params, success, error) => {
    await put(API_CODE.API_CHANGE_STATUS_CURRICULUM + endpoint, params, success, error)
}
export const CurriculumManagementAPI = {
    createCurriculum,
    getCurriculums,
    changeStatusCurriculum
}