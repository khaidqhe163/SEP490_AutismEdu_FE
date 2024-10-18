import { del, post, get, put } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const createCurriculum = async (params, success, error) => {
    await post(API_CODE.API_CREATE_CURRICULUM, params, success, error);
};

const changeCurriculumStatus = async (endpoint, params, success, error) => {
    await put(API_CODE.API_CURRICULUM_STATUS + endpoint, params, success, error)
}
export const CurriculumManagementAPI = {
    createCurriculum,
    changeCurriculumStatus
}