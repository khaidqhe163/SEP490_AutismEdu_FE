import { del, post, get, put } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';


const getAllExerciseType = async (success, error, params) => {
    await get(API_CODE.API_GET_ALL_EXERCISE_TYPE, success, error, params);
};
const getExerciseByType = async (endpoint, success, error, params) => {
    await get(API_CODE.API_GET_EXERCISE_BY_TYPE + endpoint, success, error, params);
};
const getListExerciseType = async (success, error, params) => {
    await get(API_CODE.API_GET_LIST_EXERCISE_TYPE, success, error, params);
};

const getExerciseByTypeId = async (endpoint, success, error, params) => {
    await get(API_CODE.API_GET_EXERCISE_BY_TYPE_ID + endpoint, success, error, params);
};

const createExercise = async (params, success, error) => {
    await post(API_CODE.API_CREATE_EXERCISE, params, success, error);
};

const deleteExercise = async (endpoint, data, success, error) => {
    await del(API_CODE.API_DELETE_EXERCISE + endpoint, data, success, error);
};


export const ExerciseManagementAPI = {
    getAllExerciseType,
    getExerciseByType,
    getListExerciseType,
    getExerciseByTypeId,
    createExercise,
    deleteExercise,
}