import { del, post, get, put } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const createTutorRequest = async (params, success, error) => {
    await post(API_CODE.API_POST_TUTOR_REQUEST, params, success, error);
};

const getListTutorRequest = async (success, error, params) => {
    await get(API_CODE.API_GET_TUTOR_REQUEST, success, error, params);
};

const changeStatusTutorRequest = async (endpoint, params, success, error) => {
    await put(API_CODE.API_PUT_TUTOR_REQUEST + endpoint, params, success, error);
}


export const TutorRequestAPI = {
    createTutorRequest,
    getListTutorRequest,
    changeStatusTutorRequest,
}