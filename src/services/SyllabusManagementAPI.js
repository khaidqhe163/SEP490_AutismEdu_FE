import { del, post, get, put } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const createSyllabus = async (params, success, error) => {
    await post(API_CODE.API_CREATE_SYLLABUS, params, success, error);
};

export const SyllabusManagementAPI = {
    createSyllabus,
}