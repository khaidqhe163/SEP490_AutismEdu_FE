import { del, post, get } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const createTutorRequest = async (params, success, error) => {
    await post(API_CODE.API_POST_TUTOR_REQUEST, params, success, error);
};


export const TutorRequestAPI = {
    createTutorRequest,
}