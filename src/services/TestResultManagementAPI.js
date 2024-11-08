import { del, post, get, put } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const createSubmitTest = async (params, success, error) => {
    await post(API_CODE.API_CREATE_TEST_RESULT, params, success, error);
};

const getListTestQuestionByTestId = async (endpoint, success, error) => {
    await get(API_CODE.API_GET_LIST_TEST_QUESTION_BY_TEST_ID + endpoint, success, error);
};


export const TestResultManagementAPI = {
    createSubmitTest,
    // getListTestQuestionByTestId,
}