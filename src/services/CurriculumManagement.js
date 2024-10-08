import { del, post, get } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const createCurriculum = async (params, success, error) => {
    await post(API_CODE.API_CREATE_CURRICULUM, params, success, error);
};

export const CurriculumManagementAPI = {
    createCurriculum,
}